import React, { Component } from 'react';
import ajax from '@fdaciuk/ajax';
import ContractRows from './ContractRows'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      staticList: []
    };
  };

  loadJSON() {
    ajax().get('contracts.json').then((response) => {
      this.setState({ list: response.contracts });
      this.setState({ staticList: response.contracts});
    });
  };
  
  componentDidMount() {
    this.loadJSON();
  };

  searchText(e) {
    const searchColumn = this.refs.searchColumn.value;
    const searchTextCleaned = e.target.value.trim().toLowerCase();

    if(searchTextCleaned.length > 0) {

      const filterContractList = this.state.staticList.filter((contract) => {

        const searchTextInnerContract = contract[searchColumn].toLowerCase().match(searchTextCleaned);
        
        return searchTextInnerContract;
        
      });
      
      this.setState({ list: filterContractList });

    } else {

      this.setState({ list: this.state.staticList });
    };
  }

  render() {
    return (
      <div>

          <main>
            <h1>Contratos</h1>

            <div>
              <select ref="searchColumn">
                <option value="Código">Código</option>
                <option value="Natureza">Natureza</option>
                <option value="Comprador">Comprador</option>
                <option value="Vendedor">Vendedor</option>
              </select>

              <input onChange={ this.searchText.bind(this) } placeholder="Localizar contrato"/>
            </div>

             <div>
              <select>
                <option value="Código">Código</option>
                <option value="Natureza">Natureza</option>
                <option value="Comprador">Comprador</option>
                <option value="Vendedor">Vendedor</option>
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
                <ContractRows list= { this.state.list } />
            </table>
          </main>

      </div>
    );
  }
}

export default App;
