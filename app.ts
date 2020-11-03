import express from "express";
import http from "http";
import logger from "morgan";
import dotenv from "dotenv";
import {ResponseBodyInterface} from "./ResponseBodyInterface"

// set up Express.

const app = express();

app.use(logger('dev'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup port and server.

// initialize configuration
dotenv.config();
const port = process.env.SERVER_PORT;

app.set('port', port);

const server = http.createServer(app);


app.post('/api/v1/parse', (req,res) => {
    const rawData = req.body.data;
    const firstName = rawData.slice(0, 8);
    const lastName = rawData.slice(8,18);
    const clientId = rawData.slice(18,rawData.length);

    const responseData : ResponseBodyInterface =  {
        firstName,
        lastName,
        clientId
    };

    res.status(200).send({
        statusCode: res.statusCode,
        data: responseData
    });
});


app.post('/api/v2/parse', (req,res) => {
    const rawData = req.body.data;
    const regString = rawData.replace(/^0+/, '');
    const firstnameRegex = /0000/i;
    const lastNameRegex = /000/i;
    const clientIdRegex = /999/i;
    const firstName = rawData.slice(0, 8).replace(firstnameRegex, '');
    const lastName = rawData.slice(8,18).replace(lastNameRegex, '');
    const clientId = rawData.slice(18,rawData.length).replace(clientIdRegex,'999-');

    const responseData : ResponseBodyInterface =  {
        firstName,
        lastName,
        clientId
    };

    res.status(200).send({
        statusCode: res.statusCode,
        data: responseData
    });
});


server.listen(port,() => {
   //console.log(`server started at http://localhost:${ port }`);
});

