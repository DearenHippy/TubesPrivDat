import * as Model from '../models/admin.js';

const index = (req, res) => {
    res.redirect('/admin/home');
};

const home = async(req, res) => {
    const allPemilihan = await Model.getAdminPemilu();
    res.render('admin/home.ejs',{
        table: allPemilihan
    });
};

const calon = async(req, res) => {
    const allCalon = await Model.getAdminCalon();
    res.render('admin/calon.ejs',{
        table: allCalon
    });
};

const pemilih = async(req, res) => {
    const allPemilih = await Model.getAdminPemilih();
    res.render('admin/pemilih.ejs',{
        table: allPemilih
    });
};

const detailCalon = async(req, res) => {
    const detail = await Model.getDetailCalon(req.body.idCalon);
    res.render('admin/editCalon.ejs',{
        row: detail
    });
};

const detailPemilih = async(req, res) => {
    const detail = await Model.getDetailPemilih(req.body.idPemilih);
    const desa = await Model.getDesa()
    res.render('admin/editPemilih.ejs',{
        row: detail,
        table: desa
    });
};

const getDaerah = async(req, res) => {
    const detail = await Model.getDaerah(req.body.param1);
    res.json(detail)
};

const editPemilih = async(req,res) => {
    const update = await Model.updatePemilih(
        req.body.nama,
        req.body.umur,
        req.body.jenis_kelamin,
        req.body.alamat,
        req.body.pendidikan,
        req.body.desa,
        req.body.id
    )
    const allPemilih = await Model.getAdminPemilih();
    res.render('admin/pemilih.ejs',{
        table: allPemilih
    })
};

const detailPemilihan = async(req,res) => {
    const pemilihan = await Model.getPemilihan(req.body.pemilihan_id)
    const calon = await Model.getCalonPemilihan(req.body.pemilihan_id)
    res.render('admin/editPemilihan.ejs',{
        pemilihan: pemilihan,
        calon: calon
    })
};

const tambahPemilihan = async(req,res) => {
    const jenisPemilihan = await Model.getJenisPemilihan();
    res.render('admin/tambahPemilihan.ejs',{
        jenis: jenisPemilihan
    })
};

const tambahPemilu = async(req,res) => {
    const namaPemilihan = req.body.namaPemilihan[0];
    const mulai = req.body.namaPemilihan[1].replace(/T/g,' ');
    const selesai = req.body.namaPemilihan[2].replace(/T/g,' ');
    const jenis = req.body.desa;
    await Model.tambahPemilu(namaPemilihan,mulai,selesai,jenis);
    const allPemilihan = await Model.getAdminPemilu();
    res.render('admin/home.ejs',{
        table: allPemilihan
    });
};

const tambahCalon = async(req,res)=>{
    const namaPemilihan = req.body.nama_pemilihan;
    const namaCalon1 = req.body.namaCalon1;
    const namaCalon2 = req.body.namaCalon2;
    const fotoCalon1 = "/images/calon/"+req.files.fotoCalon1[0].originalname;
    const fotoCalon2 = "images/calon/"+req.files.fotoCalon2[0].originalname;
    const lastNoUrut = await Model.getNoUrutLast(namaPemilihan);
    let nomorUrut1;
    let nomorUrut2
    if(lastNoUrut.length===0){
        nomorUrut1 = 11;
        nomorUrut2 = 12;
    }
    else{
        nomorUrut1 = Number(lastNoUrut[0].no_urut)+9;
        nomorUrut2 = Number(lastNoUrut[0].no_urut)+10;
    }
    await Model.tambahCalon(namaCalon1,fotoCalon1,nomorUrut1,namaPemilihan);
    await Model.tambahCalon(namaCalon2,fotoCalon2,nomorUrut2,namaPemilihan);
    await Model.tambahAkunCalon(namaCalon1);
    await Model.tambahAkunCalon(namaCalon2);
    await Model.tambahAkunCalon2(namaCalon1);
    await Model.tambahAkunCalon2(namaCalon2);
};

const tambahCalonPemilihan = async(req,res)=>{
    const allPemilihan = await Model.getAllPemilihan()
    res.render('admin/tambahCalonPemilihan.ejs',{
        pemilihan: allPemilihan
    });
};

const tambahPemilihPemilihan = async(req,res)=>{
    const pemilih = await Model.getAdminPemilih()
    const allPemilihan = await Model.getAllPemilihan()
    res.render('admin/tambahPemilihPemilihan.ejs',{
        pemilih: pemilih,
        pemilihan: allPemilihan
    });
};

const daftarPemilih = async(req,res)=>{
    const idTerpilih = req.body.terpilih;
    const namaPemilihan = req.body.nama_pemilihan;
    for(let i = 0;i<idTerpilih.length;i++){
        await Model.daftarPemilih(idTerpilih[i],namaPemilihan)
    }
    const allPemilihan = await Model.getAdminPemilu();
    res.render('admin/home.ejs',{
        table: allPemilihan
    });
};

const editCalon = async(req,res)=>{
    const foto = "/images/calon/"+req.file.originalname;
    const nama = req.body.nama;
    const id = req.body.id;
    await Model.editCalon(nama,foto,id)
    const allPemilihan = await Model.getAdminPemilu();
    res.render('admin/home.ejs',{
        table: allPemilihan
    });
};

export {
    home,
    index,
    calon,
    pemilih,
    detailCalon,
    detailPemilih,
    getDaerah,
    editPemilih,
    detailPemilihan,
    tambahPemilihan,
    tambahPemilu,
    tambahCalonPemilihan,
    tambahCalon,
    tambahPemilihPemilihan,
    daftarPemilih,
    editCalon
}