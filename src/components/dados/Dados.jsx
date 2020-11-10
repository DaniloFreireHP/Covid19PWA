import React, { Component, useState } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import Select, { AsyncSelect } from 'react-select'
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'

const headerProps = {
    icon: 'database',
    title: 'Dados',
    subtitle: 'Estatísticas por Estado'
}

const baseUrl = 'https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalEstadoRegiao'

const options = [
    { "label": "Total", "value": "TT" },
    { "label": "Acre", "value": "AC" },
    { "label": "Alagoas", "value": "AL" },
    { "label": "Amapá", "value": "AP" },
    { "label": "Amazonas", "value": "AM" },
    { "label": "Bahia", "value": "BA" },
    { "label": "Ceará", "value": "CE" },
    { "label": "Distrito Federal", "value": "DF" },
    { "label": "Espírito Santo", "value": "ES" },
    { "label": "Goiás", "value": "GO" },
    { "label": "Maranhão", "value": "MA" },
    { "label": "Mato Grosso", "value": "MT" },
    { "label": "Mato Grosso do Sul", "value": "MS" },
    { "label": "Minas Gerais", "value": "MG" },
    { "label": "Pará", "value": "PA" },
    { "label": "Paraíba", "value": "PB" },
    { "label": "Paraná", "value": "PR" },
    { "label": "Pernambuco", "value": "PE" },
    { "label": "Piauí", "value": "PI" },
    { "label": "Rio de Janeiro", "value": "RJ" },
    { "label": "Rio Grande do Norte", "value": "RN" },
    { "label": "Rio Grande do Sul", "value": "RS" },
    { "label": "Rondônia", "value": "RO" },
    { "label": "Roraima", "value": "RR" },
    { "label": "Santa Catarina", "value": "SC" },
    { "label": "São Paulo", "value": "SP" },
    { "label": "Sergipe", "value": "SE" },
    { "label": "Tocantins", "value": "TO" }
]


export default class Dados extends Component {


    constructor(props) {
        super(props)

        this.getTotal()

        this.state = {
            item: "",
            estado: '',
            list: []
        }

        this.alterarItem = this.alterarItem.bind(this)
        this.getEstado = this.getEstado.bind(this)
        this.getTotal = this.getTotal.bind(this)

    }

    alterarItem(e) {
        this.setState({ item: e.value })
        if (e.value != "TT") {
            this.getEstado(e.value)
        } else {
            this.state.estado = ''
        }
    }

    getEstado(est) {

        axios.get(baseUrl)
            .then(resp => {
                const lista = resp.data
                const dadosEstadoAtual = lista
                    .filter(dado => dado._id == est)
                this.setState({ estado: dadosEstadoAtual })
            })
    }

    getDados(data) {
        const array = []
        if (data[0]._id != "DF") {
            array.push(data[0].metropolitana)
        } else {
            array.push(data[0].interior)
        }
        return array

    }

    getTotal() {
        axios.get(baseUrl)
            .then(resp => {
                const listaGeral = resp.data
                listaGeral.forEach(element => {
                    if (element._id != "DF") {
                        this.state.list.push(element.metropolitana)
                    } else {
                        this.state.list.push(element.interior)
                    }
                    
                })
            })
    }


render() {
   
    const columns =
        [
            {
                Header: "Estado",
                accessor: "_id",
                style: {
                    textAlign: "center"
                }

            },
            {
                Header: "Casos Acumulados",
                accessor: "casosAcumulado",
                style: {
                    textAlign: "center"
                }

            },
            {
                Header: "Obitos Acumulados",
                accessor: "obitosAcumulado",
                style: {
                    textAlign: "center"
                }


            }
        ]
    return (
        <Main {...headerProps}>
            <Select
                options={options}
                onChange={e => this.alterarItem(e)}
                className="mb-3"
                isSearchable
                defaultValue = {{ label: "Total", value: "TT"}}
                placeholder= "Escolha o estado"
                
            />
            <ReactTable
                title="Região Metropolitana"
                minRows
                columns={columns}
                data={this.state.estado ? this.getDados(this.state.estado) : this.state.list}
                className="mb-3"
                isSearchable
            />
        </Main>
    )
}
}