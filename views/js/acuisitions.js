const proportionChart = document.getElementById("proportion-graph");
const educationChart = document.getElementById("education-graph");
const ageChart = document.getElementById("age-graph");

let proportionGraph = new Chart(proportionChart, {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: ['#007bff', '#dc3545', '#808080'],
        }]
    },
    options: {
        responsive: false,
    },
});

let educationGraph = new Chart(educationChart, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: "Banyak orang",
            data: [],
            backgroundColor: "rgba(2,117,216,1)",
            borderColor: "rgba(2,117,216,1)"
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
            backgroundColor: "rgba(2,117,216,1)",
            borderColor: "rgba(2,117,216,1)"
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

    if (type === 'proporsi') {
        updateChartData(chartLabel, chartData, proportionGraph);
    } else if (type === 'pendidikan') {
        updateChartData(chartLabel, chartData, educationGraph);
    } else {
        updateChartData(chartLabel, chartData, ageGraph);
    }
};

await fetchData('proporsi');
await fetchData('umur');
await fetchData('pendidikan');