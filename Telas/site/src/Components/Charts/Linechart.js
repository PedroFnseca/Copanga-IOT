import React from 'react'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'; // Faz o grafico aparecer na tela

function Linechart({dataChart}) {
  return (
    <div>
      <Line data={dataChart}/>
    </div>
  )
}

export default Linechart