import React from 'react'
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
        getData()
        .then(data => {

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

            // Dados do gráfico
            const dataChart = {
                // Atribuindo labels do gráfico
                labels: labels.reverse(),
                datasets: datasets
            }
            console.log(datasets)
            return dataChart // Retornando o objeto para o gráfico
        })
    }

    return (
    <div>
        <h1>Gráfico de todos os sensores</h1>
        <Button variant="primary" onClick={getChartData}>Teste</Button>
    </div>
    )
}

export default AllSensorChart