import express from 'express';
import path, { parse, resolve } from 'path';
import mySQL from "mysql";
import session from 'express-session';
import MemoryStore from 'memorystore';
import multer from 'multer';

const app = express();
const publicPath = path.resolve('public');
const css = path.resolve(publicPath+'/css');
const SessionStore = MemoryStore(session);
app.set("view engine","ejs");
app.use(express.static(publicPath));
app.use(express.static(css));
app.use(express.urlencoded({ extended: true }));


app.listen('8080', () => {
    console.log("Ready");
});

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

const login = async (conn, uname, pass) => {
    const crypto = await import('node:crypto');
    const hashed_pass = crypto.createHash('sha256').update(pass).digest('base64');
    return new Promise((resolve, reject) => {
        const stringSql = "SELECT * FROM akun WHERE username = ? AND password = ?"
        conn.query(stringSql, [`${uname}`, `${hashed_pass}`], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
    })
}

const getUserInfo = async (conn, id,role) => {
    return new Promise((resolve, reject) => {
        let stringSql = "";
        if(role==='pemilih'){
            stringSql = "SELECT * FROM akun INNER JOIN akun_pemilih ON akun.id = akun_pemilih.id WHERE akun.id = ?"
        }
        else{
            stringSql = "SELECT * FROM akun INNER JOIN akun_calon ON akun.id = akun_calon.id WHERE akun.id = ?"
        }
        conn.query(stringSql, [`${id}`], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
    })
}

const getUserPemilu = async (conn,idUser) => {
    return new Promise((resolve, reject) => {
        let stringSql = "SELECT * FROM tabelBaru INNER JOIN pemilihan ON tabelBaru.id_Pemilihan = pemilihan.pemilihan_id WHERE tabelBaru.idPemilih = ?";
        conn.query(stringSql, [`${idUser}`], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
    })
}

app.post('/signin',async(req,res)=>{
    const conn = await dbConnect();
    const signIn = await login(conn,req.query.username,req.query.password);
    if(signIn[0]===undefined){

    }
    else{
        const role = signIn[0].role;
        const id = signIn[0].id;
        req.session.role = role;
        if(role==='admin'){
            //langusng ke page
        }
        else if(role==='pemilih'){
            const infoUser = await getUserInfo(conn,id,role);
            //hal pemilu
            req.session.nama = infoUser[0].nama;
        }
        else{
            const infoUser = await getUserInfo(conn,id,role);
            req.session.nama = infoUser[0].nama;
            //insight
            //session
        }
    }
})

app.get('/', (req, res) => {
    res.render("login.ejs");
})