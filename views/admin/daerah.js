const desa = document.getElementById('desa');
desa.addEventListener("change",getDaerah);

function getDaerah(a){
    var desa = document.getElementById('desa').value;
    fetch('/admin/daerah',{
        method:'post',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({param1:desa})
    })
    .then(response=> response.json())
    .then(data=>{ 
        document.getElementById('kota').value = data[0].nama_kota;
        document.getElementById('provinsi').value = data[0].nama_provinsi;
    })
}