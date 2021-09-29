import { Request, Response } from 'express'

import { Institution, readEntireFile, writeEntireFile } from '../data'
import Route from '../route.decorator'


// Fetch all data into memory
const DATA: Institution[] = readEntireFile()

export class InstitutionsController {

  @Route({
    path: '/api/institutions',
    method: 'get'
  })
  getData(req: Request, res: Response) {
    const filteredData = DATA.filter(x => x.archived !== true)
    res.json(filteredData);
  }

  @Route({
    path: '/api/institution/:id',
    method: 'put'
  })
  putData(req: Request, res: Response) {
    const institution: Institution = req.body
    const index = DATA.findIndex(x => x.id === institution.id)
    DATA[index] = institution
    res.json(req.body)
    writeEntireFile(DATA)
  }

  @Route({
    path: '/api/institution/',
    method: 'post'
  })
  postData(req: Request, res: Response) {
    const institution: Institution = req.body
    institution.id = DATA.length + 1
    DATA.push(institution)
    res.json(req.body)
    writeEntireFile(DATA)
  }

  @Route({
    path: '/api/institution/:id',
    method: 'delete'
  })
  deleteData(req: Request, res: Response) {
    const id = Number(req.params.id)
    const index = DATA.findIndex(x => x.id === id)
    // Soft delete by adding an archived flag 
    DATA[index].archived = true
    res.json({ id })
    writeEntireFile(DATA)
  }
}
