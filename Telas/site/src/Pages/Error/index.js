import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <Link to='/' className='link' id='homeLink'>
      <div id='msgError'>
          <h1>Página não encontrada</h1>
          <h1>Ir para página inicial</h1>
      </div>
    </Link>
  )
}

export default Error