const URL = './index.html';

describe('Memotest', () => {

  before(() => { cy.visit(URL) });

  it('comprueba que los cuadros sean aleatorios', () => {
    cy.get('.cuadro').then(cuadros => {
      let cuadros_partida_a = [];
      cuadros.each((i, cuadro) => cuadros_partida_a.push(cuadro.style['background-color']));

      cy.reload();

      cy.get('.cuadro').then(cuadros => { 
        let cuadros_partida_b = [];
        cuadros.each((i, cuadro) => cuadros_partida_b.push(cuadro.style['background-color']));

        cy.wrap(cuadros_partida_a).should('not.deep.equal', cuadros_partida_b);
      });

    });

  });

  describe('Resuelve el juego', () => {
    let mapa_de_pares, lista_de_pares;

    before(() => {
      cy.get('.cuadro').then( cuadros => {
        mapa_de_pares = obtenerMapaDePares(cuadros);
        lista_de_pares = Object.values(mapa_de_pares);
      });
    });

    it('elige una combinación errónea', () => {
      cy.get(lista_de_pares[0][0]).click()
      cy.get(lista_de_pares[1][0]).click()

      // NO se le deberia asignar la clase 'completo' a ningun cuadro
      cy.get(lista_de_pares[0][0]).should('not.have.class', 'completo');
      cy.get(lista_de_pares[1][0]).should('not.have.class', 'completo');

      // se deberian ocultar, despues 500ms
      cy.wait(500)
      cy.get(lista_de_pares[0][0]).should('to.have.css', 'opacity', '0');
      cy.get(lista_de_pares[1][0]).should('to.have.css', 'opacity', '0');
    });

    it('elige una combinación correcta', () => {
      cy.get(lista_de_pares[0][0]).click()
      cy.get(lista_de_pares[0][1]).click()

      // se le deberia asignar la clase 'completo' a cada cuadro
      cy.get(lista_de_pares[0][0]).should('have.class', 'completo');
      cy.get(lista_de_pares[0][1]).should('have.class', 'completo');

      // NO se deberian ocultar
      cy.get(lista_de_pares[0][0]).should('to.have.css', 'opacity', '1');
      cy.get(lista_de_pares[0][1]).should('to.have.css', 'opacity', '1');
    });

    it('resuelve todo el juego', () => {
      lista_de_pares.forEach((par) => {
        cy.get(par[0]).click();
        cy.get(par[1]).click();
      });

      // el tablero deberia tener la clase completo
      cy.get('#tablero').should('have.class', 'tablero-completo');

      // se muestra el cartel de fin de juego
      cy.get('#mensaje-fin-juego').should('not.have.css',  'display', 'none');
    });

  });
})

function obtenerMapaDePares(cuadros) {
  const mapa_de_pares = {};
  let color_cuadro;

  for (let cuadro of cuadros){
    color_cuadro = cuadro.style['background-color'];

    if(mapa_de_pares[color_cuadro]){
      mapa_de_pares[color_cuadro].push(cuadro);
    }
    else{
      mapa_de_pares[color_cuadro] = [cuadro];
    }
  }

  return mapa_de_pares;
}
