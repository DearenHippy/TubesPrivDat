console.log("test");

let educationChartData;
let ageChartData;
let label;
let data;

const educationChart = document.getElementById("education-graph");
const ageChart = document.getElementById("age-graph")

const fetchData = async (dataType) => {
    let uri = '/calon/fetch-graph-data/' + dataType;
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
            if (dataType === 'pendidikan') {
                educationChartData = {
                    label: response.label,
                    data: response.data
                };
                
                new Chart(educationChart, {
                    type: 'bar',
                    data: {
                        labels: educationChartData.label,
                        datasets: [{
                            data: educationChartData.data,
                        }],
                    },
                    options: {
                        responsive: true,
                    },
                });
            } else {
                ageChartData = {
                    label: response.label,
                    data: response.data
                };

                new Chart(ageChart, {
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
            }
        })
};

await fetchData('umur');
await fetchData('pendidikan');


// const chrt = document.getElementById("graph");
// const educationChart = document.getElementById("education-graph");
// const ageChart = document.getElementById("age-graph");

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

// let educationGraph = new Chart(educationChart, {
//     type: 'bar',
//     data: {
//         labels: label,
//         datasets: [{
//             data: data,
//         }],
//     },
//     options: {
//         responsive: true,
//     },
// });

// educationGraph.update();

// let ageGraph = new Chart(ageChart, {
//     type: 'bar',
//     data: {
//         labels: ageChartData.label,
//         datasets: [{
//             data: ageChartData.data,
//         }],
//     },
//     options: {
//         responsive: true,
//     },
// });

// ageGraph.update();