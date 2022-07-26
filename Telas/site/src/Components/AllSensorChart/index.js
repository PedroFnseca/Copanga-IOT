import React, {useState, useEffect} from 'react'
import api from '../../Service/api'
import Linechart from '../Charts/Linechart'
import './index.css'

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
            console.log(err.code) // Erro de conexão
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
                borderWidth: 3,
                tension: 0.2,
                pointStyle: 'circle',
                pointRadius: 3
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

        // Dados do gráfico
        const dataChart = {
            // Atribuindo labels do gráfico
            type: 'line',
            labels: labels.reverse(),
            datasets: datasets
        }

        console.log('foi')
        return [dataChart, legend] // Retornando dados do gráfico e legendas
    }

    // Hook que armazena os dados do gráfico
    const [dataChart, setDataChart] = useState({
        labels: [],
        datasets: []
    })
    
    // hook que armazena as options do gráfico
    const [options, setOptions] = useState({
        plugins:{
            title:{
                display: true,
                text: `Carregando dados ...`,
                font: {size: 18}
            },
            subtitle:{
                display: true,
                text: `Aguarde ...`,
                font: {size: 16}
            }
        }
    })


    // Método para setar os dados do gráfico com promisse
    useEffect(() => {
        getChartData().then(data => {
            setDataChart(data[0]) // Dados do gráfico

            const legend = data[1]   // Legendas do gráfico (dia(s))

            // Coloca as configurações do gráfico para os dados coletados
            setOptions({
                    scale:{
                        y: {
                            max: 100,
                            min: 0,    
                            ticks: {stepSize: 10}, // Tamanho do intervalo de valores   
                            }
                    },
                    plugins:{
                        title:{ 
                            display: true,
                            text: `Sensores de umidade (%)`,
                            font: {size: 10},
                            padding:  2
                        },
                        subtitle:{
                            display: true,
                            text: `Dados de ${legend}`,
                            font: {size: 8},
                            position: 'top'
                        },
                        legend:{ // Caixas de legenda
                            display: true,
                            labels: {
                                boxWidth: 25,
                                padding: 5,
                                font: {size: 8}
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    aspectRatio: 1
                }
            )
        })
    }, [])

    // Renderiza o gráfico
    return (
    <div id='DivchartAllSensor'>
        <Linechart data={dataChart} options={options} />
    </div>
    )
}

export default AllSensorChart