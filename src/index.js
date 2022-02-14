const $tablero = document.querySelector("#tablero");
const $cuadros = $tablero.querySelectorAll(".cuadro");
const cantidad_de_cuadros = $cuadros.length;
let $primer_cuadro = null;

function asignarColoresCuadros(){
  /* Asigna un color aleatorio a cada cuadro */

  const colores = ["green", "purple", "blue", "white", "red", "yellow"];
  const colores_duplicados = colores.concat(colores);
  const colores_aleatorios = colores_duplicados.sort( ()  => .5 - Math.random() );

  $cuadros.forEach(
    ($cuadro, index) => {
      $cuadro.style.backgroundColor = colores_aleatorios[index];
    }
  );
}

function asignarColoresCuadrosNoAleatorio(){
  /* Asigna un color a cada cuadro */
  // funcion para testing

  const colores = ["green", "purple", "blue", "white", "red", "yellow"];
  const colores_duplicados = colores.concat(colores);

  $cuadros.forEach(
    ($cuadro, index) => {
      $cuadro.style.backgroundColor = colores_duplicados[index];
    }
  );
}

function manejarClickTablero(e){
  const $elemento = e.target;

  if($elemento.classList.contains("cuadro")){
    manejarClickCuadro($elemento);
  }
};

function manejarClickCuadro($cuadro_actual){
  if($cuadro_actual.classList.contains("completo")){
    return;
  }

  mostrarCuadro($cuadro_actual);

  if($primer_cuadro === null){
    $primer_cuadro = $cuadro_actual;
  }
  else{
    if($cuadro_actual === $primer_cuadro){
      return;
    }

    if(cuadrosSonIguales($primer_cuadro, $cuadro_actual)){
      $primer_cuadro.classList.add("completo");
      $cuadro_actual.classList.add("completo");
    }
    else {
      ocultarCuadro($primer_cuadro);
      ocultarCuadro($cuadro_actual);
    }

    $primer_cuadro = null;

    evaluarFinJuego();
  }
}

function cuadrosSonIguales($cuadro_a, $cuadro_b){
  // dos cuadros son iguales si tienen el mismo color de fondo

  return $cuadro_a.style.backgroundColor === $cuadro_b.style.backgroundColor;
}

function mostrarCuadro($cuadro){
  $cuadro.style.opacity = 1;
}

function ocultarCuadro($cuadro){
  setTimeout( () => { $cuadro.style.opacity = 0; }, 500);
}

function evaluarFinJuego(){
  const cantidad_de_cuadros_completos = $tablero.querySelectorAll(".cuadro.completo").length;

  if(cantidad_de_cuadros_completos === cantidad_de_cuadros){
    configurarFinJuego();
  }
}

function configurarFinJuego(){
  // [...document.querySelectorAll('.cuadro')].map((c) => c.style.opacity = 1)

  $tablero.classList.add("tablero-completo");

  reproduciMusicaFinJuego();
  mostrarMensajeFinJuego();
}

function reproduciMusicaFinJuego(){
  const ruta_archivo = 'media/omedetito.mp3';

  const musica = new Audio(ruta_archivo);
  musica.play();
}

function mostrarMensajeFinJuego(){
  const $mensaje_fin_juego = document.querySelector("#mensaje-fin-juego");

  $mensaje_fin_juego.style.display = 'inline';
}

function main(){
  // asignarColoresCuadrosNoAleatorio();
  asignarColoresCuadros();
  $tablero.onclick = (e) => { manejarClickTablero(e) };
}

main();
