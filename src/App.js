
import './style.css';
import { useState } from 'react';

function App() {

  const [partida, setPartida] = useState(false);
  const [tableroJugador, setTableroJugador] = useState([]);
  const [tableroPc, setTableroPC] = useState([]);



  const ColocarPieza = ({ pieza }) => {

    const [selectedOption, setSelectedOption] = useState("v");
    const [fila, setFila] = useState("");
    const [columna, setColumna] = useState("");
    const [errorFila, setErrorFila] = useState("")
    const [errorcColumna, setErrorColunma] = useState("")
    const [errorPieza, setErrorPieza] = useState("")

    const setSelect = (e)=>{
      setSelectedOption(e);
    }

    //en esta funcion se revisa que la pieza pueda caber en el tablero 

    const colocarPiezaEnElTablero = (evento) => {
      evento.preventDefault();
      let filaPieza = fila - 1;
      let columnaPieza = columna - 1;

      const comprobarSiEntraTablero = (largoPieza,sentido) =>{
        if (sentido === "v"){
          if(largoPieza >  (tableroJugador.length - fila)){
            setErrorPieza("la pieza se sale del tablero")
            return errorPieza
          }
        } else{
          if(largoPieza >  (tableroJugador.length - columna)){
            setErrorPieza("la pieza se sale del tablero")
            return errorPieza
          }
        }
        
      } 


      if (selectedOption === "v") { //vertical
        let resultado = comprobarSiEntraTablero(pieza.largo.length,selectedOption)

      } else if (selectedOption === "h") { //horizontal
        let resultado = comprobarSiEntraTablero(pieza.largo.length,selectedOption)
      }


    }

    const comprobarCampo = (valor) => {

      let valoresAceptados = /^[0-9]+$/;

      if (!valor.match(valoresAceptados)) {
        return "Debe ingresar un numero "
      } else if (valor > tableroJugador.length) {
        return "Debe ingresar un numero correcto "
      } else {
        return true;
      }
    }

    const revisarFila = (evento) => {
      let resultado = comprobarCampo(evento.target.value)
      if (typeof resultado === "string") {
        setErrorFila(resultado)
        setFila(evento.target.value)
      }
      else {
        setFila(evento.target.value)
        setErrorFila("")
      }
    }

    const revisarColumna = (evento) => {
      let resultado = comprobarCampo(evento.target.value)
      if (typeof resultado === "string") {
        setColumna(evento.target.value)
        setErrorColunma(resultado)
      }
      else {
        setColumna(evento.target.value)
        setErrorColunma("")
      }
    }


    return (
      <form className='formulario' onSubmit={colocarPiezaEnElTablero} >
        <h4>{pieza.nombre}</h4>
        <div className='contenedorInput'>
          <label>Fila</label>
          <input type="text" value={fila} onChange={revisarFila} />
        </div>
        {errorFila ? <div className='mensajeError' >{errorFila}</div> : null}
        <div className='contenedorInput'>
          <label>Columna</label>
          <input type="text" value={columna} onChange={revisarColumna} />
        </div>
        {errorcColumna ? <div className='mensajeError' >{errorcColumna}</div> : null}
        <select
          value={selectedOption}
          onChange={e => setSelect(e.target.value)}
        >
          <option key="v" value="v">Vertical</option>
          <option key="h" value="h" >Horizontal</option>
        </select>
        <div className='contenedorPiezas'>
          {pieza.largo.map((casilla) => {
            return <div key={casilla} className={` casillaJugador ${pieza.nombre}`}></div>
          })}
        </div>
        <input  type="button" onClick={colocarPiezaEnElTablero} value="Colocar Pieza" disabled={(errorFila || errorcColumna || !fila || !columna) ? true : false} />
        {errorPieza ? <div className='mensajeError'>{errorPieza}</div> : null}
      </form>
    )
  }

  //se crean las piezas las cuales voy a jugar 

  const piezas = [
    {
      nombre: "Barco",
      largo: [0]
    },
    {
      nombre: "Buque",
      largo: [0, 1]
    },
    {
      nombre: "Submarino",
      largo: [0, 1, 2]
    },
    {
      nombre: "PortaAviones",
      largo: [0, 1, 2, 3]
    }
  ]

  //con esta funcion voy a revisar al momento de crear la partida que piezas estan en el tablero y cuales no 
  const [piezasFueraTablero, setPiezasFueraTablero] = useState(piezas)

  //esta funcion creal el juego a nivel local. settea de manera predefinida el tamaño del campo de juego 

  const comenzarPartida = () => {
    setPartida(true);
    setTableroJugador([["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]])
    setTableroPC([["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]])
  }

  return (
    <div className="App">
      <h3>Batalla Naval</h3>
      <div className='contenedor'>
        <button className='botonStart' onClick={comenzarPartida}>Comenzar Juego</button>
        <div className={partida ? "TableroJuego" : "none"}>
          <div className='ContenedorTablero'>
            {console.log(tableroJugador)}
          </div>
          <label>Coloca tus piezas</label>
          {piezasFueraTablero.map(pieza => {
            return <ColocarPieza pieza={pieza} key={pieza.nombre} />
          })}
          <div className='inputsContainer'>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
