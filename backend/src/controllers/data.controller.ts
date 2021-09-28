import { Request, Response } from 'express'

import Route from '../route.decorator'

export class Data {
  @Route({
    path: '/api/data',
    method: 'get'
  })
  getUsers(req: Request, res: Response) {
    res.json({test: 'decorated'});
  }
}
