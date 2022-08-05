import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

function Error() {
  return (
    <Link to='/' className='link' id='homeLink'>
      <div id='msgError'>
        <h1>Página não encontrada<br />Clique aqui para voltar</h1>
      </div>
    </Link>
  )
}

export default Error