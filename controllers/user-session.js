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

const authenticate = (req, res, next) => {
    if (req.session.role === undefined) {
        return res.redirect('/login');
    }

    next();
};

const authorize = (req, res, next, role) => {
    if (role !== req.session.role) {
        return res.json({
            err_code: 403,
            message: 'Unauthorized'
        });
    }

    next();
};

const redirectBasedOnRole = (req, res, next, role) => {
    if (role !== undefined) {
        res.redirect('/'+req.session.role);
    }
};

export {
    init,
    authenticate,
    authorize,
    redirectBasedOnRole
};