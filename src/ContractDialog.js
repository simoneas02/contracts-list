import React, { Component } from 'react';
import update from 'immutability-helper';

class ContractDialog extends Component {
  constructor(props) {
    super(props);
    this.state= {
      contract: {}
    }
  };

  componentWillReceiveProps() {
    this.setState({ contract: this.props.contract });
  }

  updateInput(e) {
    const contract = this.state.contract;

    const contractUpdated = update(contract, { $merge: {codigo: e.target.value} } );
    this.setState({ contract: contractUpdated })
  };

  render() {
    return (
      <div className="contractDialog">
          <input type="text" value={ this.state.contract.codigo } onChange={ this.updateInput.bind(this) } />
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
     );
  };
} ;

export default ContractDialog;