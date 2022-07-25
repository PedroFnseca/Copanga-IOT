import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import api from '../../Service/api'
import Linechart from '../Charts/Linechart'

function AllSensorChart() {

    function random(min, max) {
        const num = Math.floor(Math.random() * max) - min
        if(num < 0) return num * -1 // Se o numero for negativo, retorna o numero positivo
        return num
    }

    // Função para buscar os dados do sensor na API
    async function getData() {
        try{
            const data = await api.get('sensor/allData')
            return data.data.results 
        }
        catch(err){
            alert(err.code) // Erro de conexão
        }
    }

    async function getChartData() {
        const data = await getData()
    
        // Formatando data para o formato do gráfico
        const hour = data.map(item => {
            const {dataHora} = item
            const YMD = dataHora.split('T')
            const separatedHour = YMD[1].split(':')
            return `${separatedHour[0]}:${separatedHour[1]}`
        })
        // Remove dados duplicados e põe em labels
        const labels = hour.filter((este, i) => hour.indexOf(este) === i)

        // Separa os dados de cada sensor para cada array
        const dados = [[], [], [], [], [], [], [], [], []]  // sensor1, sensor2, sensor3 ...
        const valueSensor = []
        data.map(item => {
            const {valorSensor, id_sensor} = item
            dados[id_sensor].push(valorSensor)
        })
        // Passa os dados coletados para um array obs: O index do array é o id do sensor
        for(let i = 0; i < dados.length; i++){
            if (dados[i].length != 0){
                valueSensor.push(dados[i])
            }
        }

        // Criando datasets para o gráfico
        const datasets = []
        // Gerando dataset de acordo com o número de sensores
        for(let i = 0; i < valueSensor.length; i++){

            // Gerando cores aleatórias
            const r = random((i + 13) * (i + 12), 255) // Red
            const g = random((i + 13) * (i + 12), 255) // Green
            const b = random((i + 13) * (i + 12), 255) // Blue

            datasets.push({
                label: `Sensor ${i}`,
                data: valueSensor[i].reverse(),
                backgroundColor: `rgb(${r}, ${g}, ${b})`,
                borderColor: `rgb(${r}, ${g}, ${b})`,
                borderWidth: 1,
                tension: 0.2,
                pointStyle: 'circle',
                pointRadius: 5.5
            })
        }
        const days = []
        // Coletando os dias referentes aos dados
        data.map(item => {
            const {dataHora} = item
            const YMD = dataHora.split('T')
            const date = YMD[0].split('-')
            const dateFormated = `${date[2]}-${date[1]}`
            if(!days.includes(dateFormated)) days.push(dateFormated)
        })

        // Determinando os dias referentes aos dados na váriavel legend
        let legend = '' // Legendas do gráfico
            if(days.length > 1) legend = `${days.pop()} a ${days[0]}`
            else legend = days[0]
        
        // Titulo do gráfico    
        const title = 'Sensores de umidade'

        // Dados do gráfico
        const dataChart = {
            // Atribuindo labels do gráfico
            type: 'line',
            labels: labels.reverse(),
            datasets: datasets
        }

        console.log('foi')
        return dataChart // Retornando o objeto para o gráfico
    }

    const [dataChart, setDataChart] = useState(async () => {
        const data = await getChartData()
        return data
    })

    async function teste() {
        const dadosTeste = await dataChart
        console.log(dadosTeste)
    }

    return (
    <div>
        {/* Tentar passar uma promisse por props */}
        {/* <Button onClick={teste}>clique me</Button> */}
        {/* <Linechart dataChart={dataChart}/> */}
    </div>
    )
}

export default AllSensorChart