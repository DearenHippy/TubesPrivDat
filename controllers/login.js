import * as LoginModel from '../models/login.js';
import * as CalonModel from '../models/calon.js';
import * as PemilihModel from '../models/pemilih.js';
import * as AdminModel from '../models/admin.js';

const index = async (req, res) => {
    res.render('login.ejs');
};

const login = async (req, res) => {
    const passwordHasher = await import('node:crypto');
    const hashedPassword = passwordHasher.createHash('sha256').update(req.body.password).digest('base64');
    const [credential] = await LoginModel.get(req.body.username, hashedPassword);
    if (credential !== undefined) {
        const akun_id = credential.akun_id;
        const username = credential.username;
        const role = credential.role;

        req.session.akun_id = akun_id;
        req.session.username = username;
        req.session.role = role;

        let infoUser;
        try {
            if (role !== 'admin') {
                let infoUser;
    
                if (role === 'calon') {
                    [infoUser] = await CalonModel.get(akun_id);
                } else {
                    [infoUser] = await PemilihModel.get(akun_id);
                }
    
                console.log(infoUser);

                req.session.nama = [infoUser].nama
            }
            else{
                let infoUser;
                [infoUser] = await AdminModel.get(akun_id);
                req.session.nama = [infoUser].nama
            }
    
            res.redirect('/' + role);
        } catch (error) {
            console.error(error)
        }
    }
};

export {
    index,
    login
};