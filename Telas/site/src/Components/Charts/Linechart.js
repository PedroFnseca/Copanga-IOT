import React from 'react'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'; // Faz o grafico aparecer na tela

function Linechart(props) {
  return (
    <div>
      <Line data={props.data} options={props.options}/>
    </div>
  )
}

export default Linechart