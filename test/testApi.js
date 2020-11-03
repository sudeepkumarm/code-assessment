const should = require('should');
const assert = require('assert');
const axios = require('axios');
//const app = require('../dist/app.js');

describe('v1 api', () => {
    it('V1 parsing', async () => {

            const response = await axios.post('http://localhost:9000/api/v1/parse', {
                data: "JOHN0000MICHAEL0009994567"
            });
            // console.log(response);
            assert.deepStrictEqual(200, response.status);

    })
});


describe('v2 api', () => {
    it('v2 parsing', async () => {
            const response = await axios.post('http://localhost:9000/api/v2/parse', {
                data: "JOHN0000MICHAEL0009994567"
            });
            // console.log(response.data);
            assert.deepStrictEqual(200, response.status);
    })
});