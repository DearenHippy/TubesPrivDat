import * as CalonModel from '../models/calon.js';

const index = (req, res) => {
    res.redirect('/calon/insight');
};

const insight = (req, res) => {
    res.render('calon/insight.ejs', {
        username: req.session.username
    });
};

const fetchGraphData = async (req, res) => {
    const type = req.params.type;
    const calon_id = req.session.role_id;
    const [pemilihan_id] = await CalonModel.getAllPemilihan(calon_id);

    let labels;
    let datas;
    if(type === 'proporsi') {
        const [numberOfVoter] = await CalonModel.getNumberOfVoter(pemilihan_id.pemilihan_id);
        const [numberOfAbstainVoter] = await CalonModel.getNumberOfAbstainVoter(calon_id);
        const [numberOfVotedVoter] = await CalonModel.getNumberOfVotedVoter(calon_id);

        console.log(numberOfVoter.num)

        const numberOfNotVotedVoter = numberOfVoter.num-numberOfVotedVoter.num;

        labels = ['Tidak abstain', 'Abstain', 'Belum memilih'];
        datas = [numberOfVotedVoter.num, numberOfAbstainVoter.num, numberOfNotVotedVoter];
    } else {
        const ballotInsight = await CalonModel.getInsight(calon_id, pemilihan_id, type);

        if(type === 'umur') {
            labels = ['17-30', '31-50', '51-70', '>70'];
            datas = [0,0,0,0];
        } else {
            labels = ['Pendidikan Dasar', 'Pendidikan Menengah', 'Undergraduate', 'Postgraduate'];
            datas = [0,0,0,0];
        };

        for (let i = 0; i < ballotInsight.length; i++) {
            const {label, data} = ballotInsight[i];
            for(let j = 0; j < labels.length; j++) {
                if(labels[j] === label) {
                    datas[j] = Number(data); 
                };
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