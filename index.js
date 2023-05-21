import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import * as UserSessionController from './controllers/user-session.js';
import * as LoginRouter from './routers/login.js';
import * as CalonRouter from './routers/calon.js';

const app = express();
dotenv.config({
    path: './.env'
});
UserSessionController.init(app);

app.use(express.static('views'));

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json(), bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');


app.use('/login', LoginRouter.router);
app.use('/calon', CalonRouter.router);

app.use('/', LoginRouter.router);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening to port: ${process.env.SERVER_PORT}`);
});