import { Request, Response } from 'express'
import { findUserByEmail, validateUser } from '../services/user.service'
import { signJwt, verifyJWT } from '../utils/jwt.util'

export async function createSessionHandler(req: Request, res: Response) {
    try {

        const users = await findUserByEmail(req.body.email)

        if(users.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const user = users[0]
        
        const isValid = await validateUser(req.body.password, user.password)
        if(!isValid) {
            return res.status(404).json({
                message: 'Password not valid'
            })
        }

        const accessToken = signJwt({id: user.id})
        
        console.log(verifyJWT(accessToken)) 
        return res.status(201).json({accessToken})
    } catch (e) {
        res.status(400).json({
            e
        })
    }
}