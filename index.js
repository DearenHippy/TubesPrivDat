import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import multer from 'multer';
import * as UserSessionController from './controllers/user-session.js';
import * as LoginRouter from './routers/login.js';
import * as LogoutRouter from './routers/logout.js';
import * as AdminRouter from './routers/admin.js';
import * as CalonRouter from './routers/calon.js';
import * as PemilihRouter from './routers/pemilih.js';

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
app.use('/logout', LogoutRouter.router);
app.use('/admin', AdminRouter.router);
app.use('/calon', CalonRouter.router);
app.use('/pemilih', PemilihRouter.router);

app.use('/', LoginRouter.router);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening to port: ${process.env.SERVER_PORT}`);
});