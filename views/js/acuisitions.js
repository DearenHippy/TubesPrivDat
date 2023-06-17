console.log("test");

let educationChartData;
let ageChartData;
let test_label
let test_data

const fetchData = (dataType) => {
    let uri = '/calon/fetch-graph-data/'+dataType;
    fetch(uri, {
        method: 'GET',
        dataType: 'json',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        if(dataType === 'education') {
            test_label = response[0].label;
            test_data = response[0].data; 
            educationChartData = {
                label: response.label,
                data: response.data
            };
        } else {
            ageChartData = {
                label: response.label,
                data: response.data
            };
        }
    })
};

fetchData('umur');
fetchData('pendidikan');

// const chrt = document.getElementById("graph");
const educationChart = document.getElementById("age-graph");
const ageChart = document.getElementById("education-graph");

// let graph = new Chart(chrt, {
//     type: 'bar',
//     data: {
//         labels: ["HTML", "CSS", "JAVASCRIPT", "CHART.JS", "JQUERY", "BOOTSTRP"],
//         datasets: [{
//             label: "online tutorial subjects",
//             data: [9, 8, 10, 7, 6, 12],
//         }],
//     },
//     options: {
//         responsive: true,
//     },
// });

let educationGraph = new Chart(educationChart, {
    type: 'bar',
    data: {
        labels: test_label,
        datasets: [{
            data: test_data,
        }],
    },
    options: {
        responsive: true,
    },
});

let ageGraph = new Chart(ageChart, {
    type: 'bar',
    data: {
        labels: ageChartData.label,
        datasets: [{
            data: ageChartData.data,
        }],
    },
    options: {
        responsive: true,
    },
});

educationGraph.update();
ageGraph.update();