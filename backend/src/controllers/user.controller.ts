import { Request, Response }from 'express'
import { createUser, getUserById, getUsers } from '../services/user.service'
export async function createUserHandler(req: Request, res: Response) {
    try {
        console.log(req.body)
        
        const user = await createUser(req.body)

        return res.json(user)

    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
}

export async function getUsersHandler(req: Request, res: Response) {
    try {
        
        const user = await getUsers()

        return res.json(user)

    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
}

export async function getUserByIdHandler(req: Request, res: Response) {
    try {
        
        const user = await getUserById(req.params.id)

        return res.json(user)

    } catch (e) {
        console.log(e)
        res.status(400).json({
            message: e.message
        })
    }
}