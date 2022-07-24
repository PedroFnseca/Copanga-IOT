import React from 'react'
import { Line } from 'react-chartjs-2'

function Linechart(dataChart) {
  return (
    <div>
      <Line data={dataChart} />
    </div>
  )
}

export default Linechart