import * as PemilihModel from '../models/pemilih.js';

const parseCalon = (daftarCalon) => {
    let parsedCalon = []

    for (let i = 0; i < daftarCalon.length; i++) {
        const calon = daftarCalon[i];
        const calon_id = calon.calon_id;
        const nama = calon.nama;
        const path_foto = calon.path_foto;
        let no_urut = calon.no_urut;

        let jenis = Number(no_urut.charAt(1));
        no_urut = Number(no_urut.charAt(0));

        if (jenis === 2) {
            jenis = "Wakil Presiden";
        } else {
            jenis = "Presiden";
        }

        parsedCalon.push(
            {
                "calon_id": calon_id,
                "no_urut": no_urut,
                "jenis": jenis,
                "nama": nama,
                "path_foto": path_foto,
            }
        );
    };

    return parsedCalon;
};

const anonimizeData = (umur, pendidikan) => {
    return [anonimizeUmur(umur), anonimizePendidikan(pendidikan)];
};

const anonimizeUmur = (umur) => {
    if(umur >= 17 && umur <= 30){
        return "17-20";
    } else if (umur > 30 && umur <= 50) {
        return "31-50";
    } else if (umur > 50 && umur <= 70) {
        return "51-70";
    } else {
        return ">70";
    }
};

const anonimizePendidikan = (pendidikan) => {
    if (pendidikan === "SD") {
        return "Pendidikan Dasar";
    } else if (pendidikan === "SMP" || pendidikan === "SMA") {
        return "Pendidikan Menengah";
    } else if (pendidikan === "Diploma" || pendidikan === "Sarjana") {
        return "Undergraduate";
    } else {
        return "Postgraduate";
    }
};

const index = (req, res) => {
    res.redirect('/pemilih/pemilu');
};

const daftarPemilu = async (req, res) => {
    const pemilu = await PemilihModel.getPemiluUser(req.session.role_id);
    
    res.render('pemilih/daftar-pemilu.ejs', {
        pemilu: pemilu
    });
};

const mulaiPemilu = async (req, res) => {
    const pemilu = await PemilihModel.getPemiluUser(req.session.role_id);
    const daftarCalon = await PemilihModel.getCalonTerdaftar(req.params.pemilihan_id);
    const parsedCalon = await parseCalon(daftarCalon);

    req.session.pemilihan_id = req.params.pemilihan_id;

    res.render('pemilih/mulai-pemilu.ejs', {
        namaPemilu: pemilu[0].nama,
        daftarCalon: parsedCalon
    });
};

const pilihPemilu = async (req, res) => {
    const akun_id = req.session.akun_id;
    const pasangan_calon = req.body['pasangan-calon'];
    const pemilihan_id = req.session.pemilihan_id;

    const [info_user] = await PemilihModel.get(akun_id);
    const pemilih_id = info_user['pemilih_id'];
    const umur = info_user['umur'] ;
    const pendidikan = info_user['pendidikan'];
    const desa_id = info_user['desa_id'];

    const [kota_id] = await PemilihModel.getKotaId(desa_id);
    const [provinsi_id] = await PemilihModel.getProvinsiId(kota_id['kota_id']);
    
    const calon_ids = await PemilihModel.getCalonId(pasangan_calon, pemilihan_id);
    
    for(let i = 0; i < calon_ids.length; i++) {
        await PemilihModel.insertSuara(anonimizeData(umur, pendidikan), pemilihan_id, calon_ids[i]['calon_id'], provinsi_id['provinsi_id']);
    };

    await PemilihModel.updateStatusMemilih(pemilih_id, pemilihan_id);

    res.redirect('/pemilih/pemilu');
};

const abstainPemilu = async (req, res) => {
    const akun_id = req.session.akun_id;
    const pasangan_calon = req.body['pasangan-calon'];
    const pemilihan_id = req.session.pemilihan_id;

    const [info_user] = await PemilihModel.get(akun_id);
    const pemilih_id = info_user['pemilih_id'];
    const umur = info_user['umur'] ;
    const pendidikan = info_user['pendidikan'];
    const desa_id = info_user['desa_id'];

    const [kota_id] = await PemilihModel.getKotaId(desa_id);
    const [provinsi_id] = await PemilihModel.getProvinsiId(kota_id['kota_id']);
    
    await PemilihModel.insertSuara(anonimizeData(umur, pendidikan), provinsi_id['provinsi_id']);
    const [suara_id] = await PemilihModel.getLatestSuaraId();

    const calon_ids = await PemilihModel.getCalonId(pasangan_calon, pemilihan_id);

    for(let i = 0; i < calon_ids.length; i++) {
        await PemilihModel.updateMemilih(pemilih_id, calon_ids[i]['calon_id'], suara_id['suara_id']);
    };

    res.redirect('/pemilih/pemilu');
};

export {
    index,
    daftarPemilu,
    mulaiPemilu,
    pilihPemilu,
    abstainPemilu
};