import React, { Component } from 'react';

class ContractRows extends Component {

  render() {
    const contractsList = this.props.list.map((contract)=> {
      return (
        <tr key = { contract.Código }>
          <td>{ contract.Código }</td>
          <td>{ contract.Comprador }</td>
          <td>{ contract.Vendedor }</td>
        </tr>
        )
    });

    return(
      <tbody>{ contractsList }</tbody>
    );
  }
}

export default ContractRows;