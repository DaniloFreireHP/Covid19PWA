import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'

const headerProps = {
    icon: 'bar-chart',
    title: 'Gráficos',
    subtitle: 'Gráficos atualizados da situação no Brasil'
}


const baseUrl = 'https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalEstadoRegiao'

class Data {
    constructor(label, y){
        this.label = label
        this.y = y
    }
}



export default class Graficos extends Component {
    constructor (props){
        super(props)

        this.state = {
            dados: [],
            lista: {
                labels: [],
                datasets:[]
            }
        }
    }

    componentWillMount() {
            fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                this.setState({dados: data});
                let datasets = [{
                    label: 'Casos',
                    data: [],
                    backgroundColor: 'green'
                }, 
                {
                    label: 'Óbitos',
                    data: [],
                    backgroundColor: 'red'
                }]
              for (let i = 0; i < this.state.dados.length; i++){
                  if (this.state.dados[i]._id != "DF") {
                      datasets[0].data.push(this.state.dados[i].metropolitana.casosAcumulado)
                      datasets[1].data.push(this.state.dados[i].metropolitana.obitosAcumulado)
                  } else {
                    datasets[0].data.push(this.state.dados[i].interior.casosAcumulado)
                    datasets[1].data.push(this.state.dados[i].interior.obitosAcumulado)
                  }
              }
              this.setState({lista: {
                labels: [
                    "Goiás",
                    "Mato Grosso",
                    "Mato Grosso do Sul",
                    "Rio Grande do Sul",
                    "Ceará",
                    "Maranhão",
                    "São Paulo",
                    "Amapá",
                    "Rondônia",
                    "Piauí",
                    "Distrito Federal",
                    "Roraima",
                    "Tocantins",
                    "Paraíba",
                    "Acre",
                    "Amazonas",
                    "Sergipe",
                    "Minas Gerais",
                    "Rio de Janeiro",
                    "Pará",
                    "Alagoas",
                    "Rio Grande do Norte",
                    "Pernambuco",
                    "Bahia",
                    "Espírito Santo",
                    "Paraná",
                    "Santa Catarina",
                ],
                  datasets: datasets
              }});
            });
      }   

    render() {
        return(
            <Main {...headerProps}>
                <div className= 'chart'>
                    <Bar
                        data={this.state.lista}
                        width={100}
                        height={50}
                    />
                </div>
            </Main>
        )
    }
}