import mysql from 'mysql';

const db = mysql.createPool({
    host: 'localhost',
    database: 'pemilu_elektronik',
    user: 'root',
    password: ''
});

const getConnection = () => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, conn) => {
            if (err) {
                reject(err);
            } else {
                resolve(conn);
            }
        });
    });
};



export {
    getConnection
};