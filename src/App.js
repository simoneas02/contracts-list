import React, { Component } from 'react';
import ajax from '@fdaciuk/ajax';
import ContractRows from './ContractRows'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      staticList: [],
      listColumn: []
    };
  };

  loadJSON() {
    ajax().get('contracts.json').then((response) => {
      response.contracts.forEach((contract) => {
        const listKeys = Object.keys(contract);
        listKeys.forEach((key) => {
          const newKey = key.toLowerCase().replace(/\s?/g, "").replace(/ó/, "o").replace(/í/, "i").replace(/ê/, "e").replace(/ç/, "c").replace(/ã/, "a");
          contract[newKey] = contract[key];
          delete contract[key];
        })
      })
      this.setState({ list: response.contracts });
      this.setState({ staticList: response.contracts});
      this.listAllColumn();
    });
  };
  
  componentDidMount() {
    this.loadJSON();
  };

  updateList(newContract) {
    const list = this.state.list.map((contract) => {
      if(contract.codigo === newContract.codigo) {
        return newContract;
      } else {
        return contract;
      }
    })
    this.setState({ list: list });
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

  sortRowsUp(column) {
    const list = this.state.list;

    list.sort((a, b) => {
      if(a[column] > b[column]) return 1;
      if(a[column] < b[column]) return -1;
      return 0;
    });
    
    this.setState({ list: list});
  }

  sortRowsDown(column) {
    const list = this.state.list;

    list.sort((a, b) => {
      if(a[column] > b[column]) return -1;
      if(a[column] < b[column]) return 1;
      return 0;
    });
    
    this.setState({ list: list});
  }

  listAllColumn() {
    const list = this.state.list[0];
    const listKey = Object.keys(list);
    
    const listColumn = listKey.map((column) => {
      return column= {
                name: column,
                isActive: true
              };
    });

    this.setState({ listColumn: listColumn });
  }

  removeColumn(columnName) {
    const list = this.state.listColumn.map((column) => {
      if(column.name === columnName) {
          return {
            name: column.name,
            isActive: false
          };
      };
      return {
         name: column.name,
         isActive: column.isActive
      };
    });
    this.setState({ listColumn: list });
  };

  addColumn(columnName) {
    const list = this.state.listColumn.map((column) => {
      if(column.name === columnName.value) {
          return {
            name: column.name,
            isActive: true
          }; 
      };
      return {
         name: column.name,
         isActive: column.isActive
      };
    });
    this.setState({ listColumn: list });
  };

  render() {
    const noActiveColums = this.state.listColumn.map((column) => {
      if(!column.isActive) {
          return (<option key={ column.name } value={ column.name }>{ column.name }</option>);
        }
        return null;
    });

    const activeColums = this.state.listColumn.map((column) => {
      if(column.isActive) {
          return (<option key={ column.name } value={ column.name }>{ column.name }</option>);
        }
        return null;
    });

    const columnHeaders = this.state.listColumn.map((column)=> {
      if(column.isActive) {
          return (
            <th key={ column.name }>
              <button onClick={ this.sortRowsUp.bind(this, column.name) }>▲</button>
              <button onClick={ this.sortRowsDown.bind(this, column.name) }>▼</button>
              {column.name}
              <button onClick={ this.removeColumn.bind(this, column.name) }>✖️</button>
            </th>
          );
        }
        return null;
    })

    return (
      <div>

          <main>
            <h1>Contratos</h1>

            <div>
              <select ref="searchColumn">{ activeColums }</select>

              <input onChange={ this.searchText.bind(this) } placeholder="Localizar contrato"/>
            </div>

             <div>
              <select ref="columnName">{ noActiveColums } </select>
              <button onClick={ this.addColumn.bind(this, this.refs.columnName) } >➕</button>
            </div>

            <table>
              <thead>
                <tr>
                  { columnHeaders }
                </tr>
              </thead>
                <ContractRows list= { this.state.list }
                              columns= { this.state.listColumn }
                              updatelist= { this.updateList.bind(this)} />
            </table>
          </main>

      </div>
    );
  }
}

export default App;
