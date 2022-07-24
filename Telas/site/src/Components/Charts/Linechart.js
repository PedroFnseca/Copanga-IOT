import React from 'react'
import { Line } from 'react-chartjs-2'

function Linechart(props) {
  return (
    <div>
      <Line data={props.dataChart}/>
    </div>
  )
}

export default Linechart