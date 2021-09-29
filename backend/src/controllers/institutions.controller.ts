import { Request, Response } from 'express'

import { Institution, readEntireFile } from '../data'
import Route from '../route.decorator'

// Fetch all data into memory
const DATA: Institution[] = readEntireFile()

export class Institutions {
  @Route({
    path: '/api/institutions',
    method: 'get'
  })
  getData(req: Request, res: Response) {
    res.json(DATA);
  }
}
