import React, { Component } from 'react';
import ajax from '@fdaciuk/ajax';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[]
    };
  };

  componentDidMount() {
    this.loadJSON();
  };

  loadJSON() {
    ajax().get('contracts.json').then((response) => {
      this.setState({list: response.contracts})
    });
  };

  render() {
    let contractsList = this.state.list.map((contract)=> {
      return (
        <tr key = { contract.Código }>
          <td>{ contract.Código }</td>
          <td>{ contract.Comprador }</td>
          <td>{ contract.Vendedor }</td>
        </tr>
        )
    });

    return (
      <div>

          <main>
            <h1>Contratos</h1>

            <div>
              <input type="search" placeholder="Localizar contrato"/>
              <button >Pesquisar</button>
            </div>

             <div>
              <select>
                <option value="codigo">Código</option>
                <option value="data-acordo">Data acordo comercial</option>
                <option value="natureza">Natureza</option>
                <option value="comprador">Comprador</option>
                <option value="vendedor">Vendedor</option>
              </select>
              <button >+</button>
            </div>

            <table>
              <thead>
                <tr>
                  <th><button>></button>Código<button>x</button></th>
                  <th><button>></button>Comprador<button>x</button></th>
                  <th><button>></button>Vendedor<button>x</button></th>
                </tr>
              </thead>
              <tbody>
                { contractsList }
              </tbody>
            </table>
          </main>

      </div>
    );
  }
}

export default App;
