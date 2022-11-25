import React, {useState} from 'react'
import Linechart from "../Charts/Linechart";

function Index() {

  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        label: 'Dataset',
        data: [0, 1, 0, 1, 1, 0, 1],
        backgroundColor: "#1B98E0",
        borderColor: "#1B98E0",
        stepped: true,
        borderWidth: 3,
        tension: 0.2,
        pointStyle: "circle",
        pointRadius: 1,
      }
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
        text: `Carregando dados...`,
        font: { size: 22 },
      },
      subtitle: {
        display: true,
        text: `Aguarde...`,
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