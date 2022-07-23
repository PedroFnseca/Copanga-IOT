import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div id='msgError'>
        <Link to='/' className='link' id='homeLink'>
            <h1>Ir para página inicial</h1>
        </Link>
    </div>
  )
}

export default Error