const url = 'https://api-irrigacao.herokuapp.com/sensor/allData'

async function getData(url, count){
    const data = await axios.get(url)

    return data.data.results.slice(0, count)
}

function collectValue(dataJson){
    let dados = []
    dataJson.map((dataSensor) =>{
        return dados.push(dataSensor.valorSensor)
    })

    return dados
}

function formatdate(date, format){
    const YMD = date.split('T')
    const separatedDate = YMD[0].split('-')
    const separatedHour = YMD[1].split(':')

    var hourString = `${separatedHour[0]}:${separatedHour[1]}`
    var dateString = `${separatedDate[2]}-${separatedDate[1]}`

    if(format){
        return `${hourString} ${dateString}`
    } 
    else {
        return `${hourString}`
    }
}

function collectDate(dataJson){
    let dados = []
    dataJson.map((dataSensor) =>{

        const date = formatdate(dataSensor.dataHora, false)

        return dados.push(date)
    })

    return dados
}

setTimeout(
    getData(url, 25)
.then(response =>{
    console.log(response)
    
    const dados = collectValue(response)

    const labels = collectDate(response)
    
    const data = {
        labels: labels,
        datasets: [{
          label: 'Sensor 7',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: dados,
        },
    ],
    };
    
    const config = {
        type: 'line',
        data: data
    };
    
    const myChart = new Chart(
        document.getElementsByClassName('myChart'),
        config
    );
}),  180000
)