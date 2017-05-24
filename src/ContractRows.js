import React, { Component } from 'react';

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

    return(
      <tbody>
        { contractsList }
        <div className="contractDialog">
          Código: { this.state.contract.codigo}<br/>
          Data acordo comercial: { this.state.contract.dataacordocomercial}<br/>
          Natureza: { this.state.contract.natureza}<br/>
          Comprador: { this.state.contract.comprador}<br/>
          Vendedor: { this.state.contract.vendedor}<br/>
          Energia referência: { this.state.contract.energiareferencia}<br/>
          Energia entregue: { this.state.contract.energiaentregue}<br/>
          Status aprovação: { this.state.contract.statusaprovacao}<br/>
          Modelo: { this.state.contract.modelo}<br/>
          Preço base contratado: { this.state.contract.precobasecontratado}<br/>
          Submercado: { this.state.contract.submercado}<br/>
          Início fornecimento: { this.state.contract.iniciofornecimento}<br/>
          Fim fornecimento: { this.state.contract.fimfornecimento}<br/>
          Início vigência: { this.state.contract.iniciovigencia}<br/>
          Fim vigência: { this.state.contract.fimvigencia}<br/>
        </div>
      </tbody>
    );
  }
}

export default ContractRows;