import React, {useState} from 'react'
import Linechart from "../Charts/Linechart";

function Index() {

  const data = {
    labels: ['15:29', '15:40', '15:55', '16:10', '16:25', '16:40', '16:55'],
    datasets: [
      {
        label: 'Valvula 1',
        data: [0, 1, 0, 1, 1, 0, 1],
        backgroundColor: "#1B98E0",
        borderColor: "#1B98E0",
        stepped: true,
        borderWidth: 3,
        tension: 0.2,
        pointStyle: "circle",
        pointRadius: 1,
      },
      {
        label: 'Valvula 2',
        data: [1, 0, 1, 0, 0, 1, 0],
        backgroundColor: "#A5EEA0",
        borderColor: "#A5EEA0",
        stepped: true,
        borderWidth: 3,
        tension: 0.2,
        pointStyle: "circle",
        pointRadius: 1,
      },
    ]
  }

  // Configuração de chart com stepped 
  const [options, setOptions] = useState({
    scales: {
      y: {
        min: 0,
        max: 1,
        ticks: { stepSize: 1 },
      },
    },
    layout:{
      padding: 1
    },
    plugins: {
      title: {
        display: true,
        text: `Acionamento das valvulas`,
        font: { size: 22 },
      },
      subtitle: {
        display: true,
        text: `Dados de 15/05/2021`,
        font: { size: 18 },
      },
      legend: {
        // Caixas de legenda
        display: true,
        labels: {
          boxWidth: 50,
          font: { size: 16 },
        },
      },
    },
  })

  return (
    <div id="DivchartAllSensor">
      <Linechart data={data} options={options}/>
    </div>
  )
}

export default Index