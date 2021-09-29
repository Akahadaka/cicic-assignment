import * as express from 'express'
import * as request from 'supertest'

const app = express()

describe("InstitutionsController", () => {

    it("should pass", async () => {
        expect(true).toBe(true);
    });

    describe("#getData", () => {
        it('should return a json object', async () => {
            const { body } = await request(app).get('/api/institutions')
            expect(body).toEqual({})
        })
    })
})
