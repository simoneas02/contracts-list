import React, { Component } from 'react';
import update from 'immutability-helper';

class ContractRows extends Component {
  constructor(props) {
    super(props);
      this.state = {
        contract: []
      };
  };

  showContract(contractNumber) {
    const contract = this.props.list.filter((contract) => {
      return (contractNumber === contract.codigo);
    });
    this.setState({ contract: contract[0] });
  };

   updateInput(e) {
    const contract = this.state.contract;

    const contractUpdated = update(contract, { $merge: {codigo: e.target.value} } );
    this.setState({ contract: contractUpdated })
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
       return (
         <div>{ item.name }: { this.state.contract[item.name] }</div>
       )
    });

    return(
      <tbody>
        { contractsList }
        <div className="contractDialog">
          { itemsList }
        </div>
      </tbody>
    );
  }
}

export default ContractRows;