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

        const date = formatdate(data.dataHora, false)

        return dados.push(date)
    })

    return dados
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

getData(url, 15)
.then(response =>{
    // console.log(response)
    
    const dados = collectValue(response)
    const labels = collectDate(response)
    const id = collectId(response)
    
    const data = {
        labels: labels,
        datasets: [{
          label: `Sensor ${id[0]}`,
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
})