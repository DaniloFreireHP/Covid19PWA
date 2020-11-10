import React from 'react'
import Main from '../template/Main'

export default props =>
    <Main icon="home" title="Início"
    subtitle="Projeto PWA." >
        <div className='display-4'>Bem Vindo!</div>
        <hr />
        <p className="mb-0">Sistema para demonstrar estatísticas a respeito
            dos dados de pessoas infectadas pelo corona vírus em cada estado do Brasil</p>
    </Main>