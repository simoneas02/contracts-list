import React, { Component } from 'react';
import update from 'immutability-helper';

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
             <td key = { contract[column.name] }>{ contract[column.name] }</td>
             );
        }
        return null;
      });

      return (
        <tr key = { contract.codigo } onClick={ this.showContract.bind(this, contract.codigo) }>{ columnsList }</tr>
        )
    });

    const itemsList = this.props.columns.map((item) => {
      if(!this.state.isEditable){
        return (
          <div>{ item.name }: { this.state.contract[item.name] }</div>
        )
      } else {
         return ( 
          <div>{ item.name }:
            <input type="text" 
                   ref={ item.name }
                   value={ this.state.contract[item.name] } 
                   onChange={ this.updateInput.bind(this, item.name) } />
          </div>
         );
      };
    });

    const contractDialog = () => {
      if(this.state.isVisible) {
        return (
          <div className="contractDialog">
            <button onClick={ this.editList.bind(this) }>edite</button>
            <button onClick={ this.closeList.bind(this) }>x</button>
            <button onClick={ this.props.updatelist.bind(this, this.state.contract) }>salvar</button>
            { itemsList }
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