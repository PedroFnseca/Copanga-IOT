import React from 'react'
import { Line } from 'react-chartjs-2'

function LineChart(chartData, ChartOptions) {

  return (
      <Line data={chartData} options={ChartOptions}/>
  )
}

export default { LineChart }