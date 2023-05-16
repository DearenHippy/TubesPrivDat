import express from 'express';
import path, { parse, resolve } from 'path';
import mySQL from "mysql";
import session from 'express-session';
import MemoryStore from 'memorystore';
import multer from 'multer';

const app = express();
const publicPath = path.resolve('public');
const SessionStore = MemoryStore(session);
app.set("view engine","ejs");
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));

//session
app.use(session({
    cookie: {
        httpOnly: false,
        sameSite: 'strict',
    },
    store: new SessionStore({
        checkPeriod: 1 * 60 * 60 * 1000,
    }),
    name: 'SID',
    secret: 'this is your key',
    resave: false,
    saveUninitialized: false
}));

//create database
const pool = mySQL.createPool({
    user: 'root',
    password: '',
    database: 'pemilu_elektronik',
    host: 'localhost'
})

//database connect
const dbConnect = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                reject(err)
            } else {
                resolve(conn)
            }
        })
    })
}