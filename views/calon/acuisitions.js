const educationChart = document.getElementById("education-graph");
const ageChart = document.getElementById("age-graph");

let educationGraph = new Chart(educationChart, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: "Banyak orang",
            data: [],
            borderColor: '#36A2EB',
            backgroundColor: '#9BD0F5',
        }]
    },
    options: {
        responsive: true,
    },
});

let ageGraph = new Chart(ageChart, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: "Banyak orang",
            data: [],
            borderColor: '#36A2EB',
            backgroundColor: '#9BD0F5',
        }],
    },
    options: {
        responsive: true,
    },
});

const updateChartData = (chartLabel, chartData, chart) => {
    chart.data.labels = chartLabel;
    chart.data.datasets[0].data = chartData;

    chart.update();
};

const fetchData = async (type) => {
    let uri = '/calon/fetch-graph-data/' + type;

    const response = await fetch(uri, {
        method: 'GET',
        dataType: 'json',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    const chartData = data.data;
    const chartLabel = data.label;

    if (type === 'pendidikan') {
        updateChartData(chartLabel, chartData, educationGraph);
    } else {
        updateChartData(chartLabel, chartData, ageGraph);
    }
};

await fetchData('umur');
await fetchData('pendidikan');