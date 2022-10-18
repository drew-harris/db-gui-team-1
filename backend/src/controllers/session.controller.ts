import { Request, Response }from 'express'
export async function createSessionHandler(req: Request, res: Response) {
    return res.sendStatus(200)
}