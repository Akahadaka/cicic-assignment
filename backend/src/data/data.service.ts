/**
 * Helper functions for managing the "database"
 * 
 * TODO Make more generic. Currently only handles institutions
 */
import { readFileSync, writeFile } from 'fs'
import * as path from 'path'

import { Institution } from '../data'

const DATA_FILE = path.join(__dirname, '../data/data.json')

/**
 * readEntireFile
 * Synchronous since the FE is awaiting a response anyway
 * @returns Array of Data
 */
export function readEntireFile(): Institution[] {
    try {
    const rawData = readFileSync(DATA_FILE, 'utf8')
    const result = JSON.parse(rawData)
    return result.data
    } catch(err) {
    console.error(err)
    }
}

/**
* writeEntireFile
* Asynchronous since in can complete in the background
* @param data 
*/
export function writeEntireFile(data: Institution[]) {
    writeFile(DATA_FILE, JSON.stringify({data}, null, 2), (error) => {
        if (error) {
        throw(error)
        }
    })
}