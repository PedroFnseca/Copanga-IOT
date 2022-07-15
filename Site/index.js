const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];

const data = {
    labels: labels,
    datasets: [{
      label: 'Sensor 7',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [60, 10, 5, 2, 20, 30, 45, 7],
    },
    {
        label: 'Sensor 2',
        backgroundColor: 'rgb(50, 99, 132)',
        borderColor: 'rgb(50, 99, 132)',
        data: [54, 5, 15, 12, 2, 3, 40, 7],
      }
],
};

const config = {
    type: 'line',
    data: data,
    options: {}
};

const myChart = new Chart(
    document.getElementsByClassName('myChart'),
    config
);