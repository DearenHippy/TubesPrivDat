import session from 'express-session';
import MemoryStore from 'memorystore';

const sessionStore = MemoryStore(session);

const init = (app) => {
    app.use(
        session({
            name: 'SID',
            secret: 'this is a secret',
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: false,
                sameSite: 'strict'
            },
            store: new sessionStore({
                checkPeriod: 1 * 60 * 60 * 1000
            })
        })
    );
};

const auth = (role) => {
    return (req, res, next) => {
        if (req.session.role === undefined) {
            res.redirect('/login');
        } else {
            if (req.session.role !== role) {
                // res.status(403).send('Unauthorized access')
                res.status(401).render('401.ejs');
            } else {
                next();
            }
        }
    };
}

export {
    init,
    auth
};