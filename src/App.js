import React, { Component } from 'react';
import ajax from '@fdaciuk/ajax';
import ContractRows from './ContractRows'
import arrowUp from './icons/arrow-up.svg'
import arrowDown from './icons/arrow-down.svg'
import close from './icons/close.svg'

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
        contract.Key = Math.random().toString();
        const listKeys = Object.keys(contract);
        listKeys.forEach((key) => {
          const newKey = key.toLowerCase().replace(/\s?/g, "").replace(/ó/, "o").replace(/í/, "i").replace(/ê/, "e").replace(/ç/, "c").replace(/ã/, "a");
          contract[newKey] = contract[key];
          delete contract[key];
        })
      })
      console.log(response.contracts)
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
      if(contract.key === newContract.key) {
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

              {/* Column Title Container */}

              <div className="column-title-container">

                <div className="arrow-container">
                  <button className="buttom-icon" onClick={ this.sortRowsUp.bind(this, column.name) }>
                    <img className="icon" src={ arrowUp } alt="Ordenar em ordem crescente"/>
                  </button>
                  <button className="buttom-icon" onClick={ this.sortRowsDown.bind(this, column.name) }>
                    <img className="icon" src={ arrowDown } alt="Ordenar em ordem decrescente"/>
                  </button>
                </div>

                <span className="title-column">{column.name}</span>

                <button className="buttom-icon close-icon" onClick={ this.removeColumn.bind(this, column.name) }>
                  <img className="icon" src={ close } alt="Exclue a coluna"/>
                </button>

              </div>

            </th>
          );
        }
        return null;
    })

    return (
      <div>

        {/* Header */}
        <header className="header">
          <h1 className="heading-lv1">Contratos</h1>
        </header>

          <main>

            {/* Container */}
            <div className="control-container">

              {/* Search for Text */}

              <div className="control-box">
                <h2 className="heading-lv2">Buscar</h2>
                <select className="input" ref="searchColumn">{ activeColums }</select>
                <input className="input" onChange={ this.searchText.bind(this) } placeholder="Localizar contrato"/>
              </div>

              {/* Add Columns */}

              <div className="control-box">
                <h2 className="heading-lv2">Adicionar Colunas</h2>
                <select className="input" ref="columnName">{ noActiveColums } </select>
                <button className="buttom" onClick={ this.addColumn.bind(this, this.refs.columnName) } >add</button>
              </div>

            </div>

            {/* Contract Table */}
            <div className="table-container">
              <table className="contract-table">

                <thead>
                  <tr>
                    { columnHeaders }
                  </tr>
                </thead>
                <ContractRows list= { this.state.list }
                                columns= { this.state.listColumn }
                                updatelist= { this.updateList.bind(this)} />
              </table>
            </div>
          </main>
      </div>
    );
  }
}

export default App;
