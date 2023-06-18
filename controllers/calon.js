import * as CalonModel from '../models/calon.js';

const index = (req, res) => {
    res.redirect('/calon/insight');
};

const insight = (req, res) => {
    res.render('calon/insight.ejs');
};

const fetchGraphData = async (req, res) => {
    const type = req.params.type;
    const calon_id = req.session.role_id;
    const [pemilihan_id] = await CalonModel.getAllPemilihan(calon_id);

    const ballotInsight = await CalonModel.getInsight(calon_id, pemilihan_id, type);

    let labels;
    let datas = [0,0,0,0];
    if(type === 'umur') {
        labels = ['17-30', '31-50', '51-70', '>70'];
    } else {
        labels = ['Pendidikan Dasar', 'Pendidikan Menengah', 'Undergraduate', 'Postgraduate'];
    };

    for (let i = 0; i < ballotInsight.length; i++) {
        const {label, data} = ballotInsight[i];
        for(let j = 0; j < labels.length; j++) {
            if(labels[j] === label) {
                datas[j] = Number(data); 
            };
        };
    };

    res.json({ 
        label: labels,
        data: datas, 
    });
};

export {
    index,
    insight,
    fetchGraphData
};