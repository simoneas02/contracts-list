import React, { Component } from 'react';

class ContractRows extends Component {

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
        <tr key = { contract.codigo }>{ columnsList }</tr>
        )
    });

    return(
      <tbody>{ contractsList }</tbody>
    );
  }
}

export default ContractRows;