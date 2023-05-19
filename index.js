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
            stringSql = "SELECT * FROM akun INNER JOIN akun_pemilih ON akun.akun_id = akun_pemilih.akun_id WHERE akun.akun_id = ?"
        }
        else{
            stringSql = "SELECT * FROM akun INNER JOIN akun_calon ON akun.akun_id = akun_calon.calon_id WHERE akun.akun_id = ?"
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
        let stringSql = "SELECT * FROM hak_pilih INNER JOIN pemilihan ON hak_pilih.pemilihan_id = pemilihan.pemilihan_id WHERE hak_pilih.pemilih_id = ?";
        conn.query(stringSql, [`${idUser}`], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
    })
}

const getCalonPemilu = async (conn) => {
    return new Promise((resolve, reject) => {
        let stringSql = "SELECT * FROM calon INNER JOIN pemilihan ON calon.pemilihan_id = pemilihan.pemilihan_id";
        conn.query(stringSql, (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
    })
}

const getAdminPemilu = async (conn) => {
    return new Promise((resolve, reject) => {
        let stringSql = "SELECT * FROM pemilihan";
        conn.query(stringSql, (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
    })
}

const getDetailPemiluPemilih = async (conn,idPemilu) => {
    return new Promise((resolve, reject) => {
        let stringSql = "SELECT * FROM pemilihan INNER JOIN calon ON pemilihan.pemilihan_id = calon.pemilihan_id WHERE pemilihan.pemilihan_id = ?";
        conn.query(stringSql, [`${idPemilu}`] ,(error, res) => {
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
    const signIn = await login(conn,req.body.username,req.body.password);
    if(signIn[0]===undefined){
        
    }
    else{
        const role = signIn[0].role;
        const id = signIn[0].akun_id;
        req.session.role = role;
        if(role==='admin'){
            const adminPemilu = await getAdminPemilu(conn);
            res.render("admin-home.ejs",{
                //atribut yg diperluin di home pemilih dari adminPemilu
                table: adminPemilu
            });
        }
        else if(role==='pemilih'){
            const infoUser = await getUserInfo(conn,id,role);
            const userPemilu = await getUserPemilu(conn,id);
            req.session.nama = infoUser[0].nama;
            res.render("pemilih-home.ejs",{
                //atribut yg diperluin di home pemilih dari userPemilu
                table: userPemilu
            });
        }
        else{
            const infoUser = await getUserInfo(conn,id,role);
            const calonPemilu = await getCalonPemilu(conn);
            req.session.nama = infoUser[0].nama;
            res.render("calon-home.ejs",{
                //atribut yg diperluin di home pemilih dari calonPemilu
            });
        }
    }
})

app.post('/model',async(req,res)=>{
    const conn = await dbConnect();
    const dataPemilihan = await getDetailPemiluPemilih(conn,req.body.idPemilihan);
    res.render("pemilih-pilihcalon.ejs",{
        table: dataPemilihan
    })
})

app.post('/addPemilu', async(req,res)=>{
    res.render("admin-buatpemilu.ejs")
})

const initAkun = async (conn) => {
    const crypto = await import('node:crypto');
    let hashed_pass;
    const username = ['Kevin','Bob','Alice','Ben','John']
    return new Promise((resolve, reject) => {
        let stringSql = "INSERT INTO akun (username, password, role) VALUES(?, ?, ?)";
        let username_item;
        let password_item = 'password';
        for(let i = 0; i < 5; i++) {
            username_item = username[i];
            hashed_pass = crypto.createHash('sha256').update(password_item).digest('base64');
            conn.query(stringSql, [`${username_item}`, `${hashed_pass}`, 'calon'], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })    
        }     
    })
}



app.get('/', async (req, res) => {
    const conn = await dbConnect();
    res.render("login.ejs");
})