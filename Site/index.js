const url = 'https://api-irrigacao.herokuapp.com/sensor/allData'

async function getData(url, count){
    const data = await axios.get(url)

    return data.data.results.slice(0, count)
}

function collectValue(dataJson){
    let dados = []
    dataJson.map((data) =>{
        return dados.push(data.valorSensor)
    })

    return dados
}

function collectDate(dataJson){
    let dados = []

    dataJson.map((data) =>{
        const date = formatdate(data.dataHora)
        if(!dados.includes(date)){
            return dados.push(date)
        }
    })  

    return dados.reverse()
}

function collectId(dataJson){
    let id = []
    dataJson.map((data) =>{
        if(!id.includes(data.id_sensor)){
            return id.push(data.id_sensor)
        }
    })

    return id
}

function formatdate(date){
    const YMD = date.split('T')
    const separatedHour = YMD[1].split(':')

    var hourString = `${separatedHour[0]}:${separatedHour[1]}`
    
    return `${hourString}`
}

function separateData(dataJson){
    data = [[], []]

    dataJson.map(dataMap => {
        if(dataMap.id_sensor == 0){
            data[0].push(dataMap.valorSensor)
        }
        else if(dataMap.id_sensor == 1){
            data[1].push(dataMap.valorSensor)
        }
    })
    return data
}

function collectDays(dataJson){
    var days = []

    dataJson.map(dataMap =>{
        const {dataHora} = dataMap
        const YMD = dataHora.split('T')
        const date = YMD[0].split('-')
        const dateFormated = `${date[2]}-${date[1]}`
        
        if(!days.includes(dateFormated)) days.push(dateFormated)
    })

    if(days.length > 1){
        const firstDay = days.pop()
        const lastday = days[0]
        return `${firstDay} a ${lastday}`
    }
    else{
        return days[0]
    }
}

getData(url, 12)
.then(response =>{
    // console.log(response)
    
    // const dados = collectValue(response)
    const labels = collectDate(response)
    const id = collectId(response)
    const dataSeparated = separateData(response)
    const days = collectDays(response)

    console.log(dataSeparated)

    const data = {
        labels: labels,
        datasets: [{
          label: `Sensor ${id[0]}`,
          backgroundColor: 'rgb(255, 0, 132)',
          borderColor: 'rgb(255, 0, 150)',
          data: dataSeparated[0].reverse(),
          tension: 0.3
        },
        {
        label: `Sensor ${id[1]}`,
        backgroundColor: 'rgb(0, 50, 132)',
        borderColor: 'rgb(0, 50, 132)',
        data: dataSeparated[1].reverse(),
        tension: 0.3
        }
    ],
    };
    
    const options = {
        scales:{
            y: {
                max: 100,
                min: 0,
            ticks: {
                stepSize: 10
            }
            }
        },
        plugins:{
            title:{
                display: true,
                text: `Sensores de umidade`,
                font: {size: 18}
            },
            subtitle:{
                display: true,
                text: `Dados de ${days}`,
                font: {size: 16}
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1
    }

    const config = {
        type: 'line',
        data: data,
        options: options
    }

    const myChart = document.getElementsByClassName('myChart')

    const canvasChart = new Chart(
        myChart,
        config
    );
})
