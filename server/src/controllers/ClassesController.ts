import { Request, Response} from 'express'
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

//TODO: Separar interfaces
//TODO: Separar Repository
interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
    class_id: number;
}

export default class ClassesControllers {

    async index(req: Request, res: Response) {
        const filters = req.query;

        if(!filters.subject || !filters.week_day || !filters.time) {
            return res.status(400).json({ 
                error: 'Missing filters to search classes'
            })
        }

        const subject = filters.subject as string;
        const time = filters.time as string;
        const week_day = filters.week_day as string;
        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
        .whereExists( function () {
            this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
            .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
            .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*']);
        res.status(200).json(classes);
    }

    async create (req: Request, res: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;
        
        const trx = await db.transaction();
    
        try {
            const insertedUsersId = await trx('users').insert({name, 
                avatar, 
                whatsapp, 
                bio,
            })
        
            const user_id = insertedUsersId[0];
        
            const insertedClassesId = await trx('classes').insert({
                subject,
                cost,
                user_id
            })
        
            const class_id = insertedClassesId[0];
            const classSchedule = schedule.map((item: ScheduleItem) => {
                return {
                    week_day: item.week_day,
                    from: convertHourToMinutes(item.from),
                    to: convertHourToMinutes(item.to),
                    class_id
                }
            })
        
        
            await trx('class_schedule').insert(classSchedule);
        
            await trx.commit();
        
            return res.status(201).send();
        } catch (error) {
            await trx.rollback();
            console.log('::classes post:: error:', error)
            return res.status(400).json({
                error: 'Unexpected while creating new class'
            })
        }
    }
}