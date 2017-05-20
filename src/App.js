import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <header></header>

          <main>
            <h1>Contratos</h1>

            <div>
              <input type="search" placeholder="Localizar contrato"/>
              <button >Pesquisar</button>
            </div>

             <div>
              <select>
                <option value="codigo">Código</option>
                <option value="data-acordo">Data acordo comercial</option>
                <option value="natureza">Natureza</option>
                <option value="comprador">Comprador</option>
                <option value="vendedor">Vendedor</option>
              </select>
              <button >+</button>
            </div>

            <table>
              <thead>
                <tr>
                  <th><button>></button>Código<button>x</button></th>
                  <th><button>></button>Comprador<button>x</button></th>
                  <th><button>></button>Vendedor<button>x</button></th>
                  <th><button>></button>Status aprovação<button>x</button></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>123/2012</td>
                  <td>Capibaribe Energia</td>
                  <td>Contoso Comercializadora</td>
                  <td>Aprovado</td>
                </tr>
                <tr>
                  <td>123/2012</td>
                  <td>Capibaribe Energia</td>
                  <td>Contoso Comercializadora</td>
                  <td>Aprovado</td>
                </tr>
                <tr>
                  <td>123/2012</td>
                  <td>Capibaribe Energia</td>
                  <td>Contoso Comercializadora</td>
                  <td>Aprovado</td>
                </tr>
                <tr>
                  <td>123/2012</td>
                  <td>Capibaribe Energia</td>
                  <td>Contoso Comercializadora</td>
                  <td>Aprovado</td>
                </tr>
              </tbody>
            </table>
          </main>

          <footer></footer>
      </div>
    );
  }
}

export default App;
