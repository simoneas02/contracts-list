import React, { Component } from 'react';
import update from 'immutability-helper';
import edit from './icons/edit.svg'
import save from './icons/save.svg'
import close from './icons/close.svg'

class ContractRows extends Component {
  constructor(props) {
    super(props);
      this.state = {
        contract: [],
        isEditable: false,
        isVisible: false
      };
  };

  showContract(contractNumber) {
    const contract = this.props.list.filter((contract) => {
      return (contractNumber === contract.codigo);
    });
    this.setState({ contract: contract[0] });
    this.setState({ isVisible: true });
  };

   updateInput(columnName) {
    const contract = this.state.contract;
    const value = this.refs[columnName];

    const contractUpdated = update(contract, { $merge: {[columnName]: value.value }} );
    this.setState({ contract: contractUpdated })
  };

  editList() {
    this.setState({ isEditable: true });
  };
  
  closeList() {
    this.setState({ isVisible: false });
    this.setState({ isEditable: false });
  };

  render() {
    const contractsList = this.props.list.map((contract)=> {
      const columns = this.props.columns;
      
      const columnsList = columns.map((column) => {

        if(column.isActive) {
           return (
             <td className="column-cell" key = { contract[column.name] }>{ contract[column.name] }</td>
             );
        }
        return null;
      });

      return (
        <tr className="contract-row" key = { contract.codigo } onClick={ this.showContract.bind(this, contract.codigo) }>{ columnsList }</tr>
        )
    });

    const itemsList = this.props.columns.map((item) => {
      if(!this.state.isEditable){
        return (
          <tr>
            <td>{ item.name }</td>
            <td>{ this.state.contract[item.name] }</td>
          </tr>
        )
      } else {
         return ( 
            <tr>
              <td>
                { item.name }:
              </td>
              <td>
                <input type="text" 
                    ref={ item.name }
                    value={ this.state.contract[item.name] } 
                    onChange={ this.updateInput.bind(this, item.name) } />
              </td>
            </tr>
         );
      };
    });

    const contractDialog = () => {
      if(this.state.isVisible) {
        return (
          <div className="contract-dialog">
            <div className="controlDialog">
              <button className="buttom-icon" onClick={ this.editList.bind(this) }>
                <img src={ edit }/>
              </button>
              <button className="buttom-icon" onClick={ this.closeList.bind(this) }>
                <img src={ close }/>
              </button>
              <button className="buttom-icon" onClick={ this.props.updatelist.bind(this, this.state.contract) }>
                <img src={ save }/>
              </button>
            </div>
            <table>
              { itemsList }
           </table>
          </div>
        );
      };
    };

    return(
      <tbody>
        { contractsList }
        { contractDialog() }
      </tbody>
    );
  }
}

export default ContractRows;