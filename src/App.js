
import './style.css';
import { useState } from 'react';

function App() {

  const [partida, setPartida] = useState(false);
  const [tableroJugador, setTableroJugador] = useState([]);
  const [tableroPc, setTableroPC] = useState([]);


  const ColocarPieza = ({ pieza }) => {

    const [selectedOption, setSelectedOption] = useState("");
    const [fila, setFila] = useState("");
    const [columna, setColumna] = useState("");
    const [errorFila, setErrorFila] = useState("")
    const [errorcColumna, setErrorColunma] = useState("")

    const colocarPiezaEnElTablero = (evento) => {
      evento.preventDefault();
      console.log(evento)
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
      if (typeof resultado === "string"){
        setErrorFila(resultado)
        setFila(evento.target.value)
      }
      else{
        setFila(evento.target.value)
        setErrorFila("")
      }
    }

    const revisarColumna = (evento) => {
      let resultado = comprobarCampo(evento.target.value)
      if (typeof resultado === "string"){
        setColumna(evento.target.value)
        setErrorColunma(resultado)       
      }
      else{
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
        {errorFila ? <div>{errorFila}</div> : null}
        <div className='contenedorInput'>
          <label>Columna</label>
          <input type="text" value={columna} onChange={revisarColumna} /> 
        </div>
        {errorcColumna ? <div>{errorcColumna}</div> : null}
        <select
          value={selectedOption}
          onChange={e => setSelectedOption(e.target.value)}
        >
          <option key="v" value="h">Vertical</option>
          <option key="h" value="v" >Horizontal</option>
        </select>
        <div className='contenedorPiezas'>
          {pieza.largo.map((casilla) => {
            return <div key={casilla} className={` casillaJugador ${pieza.nombre}`}></div>
          })}
        </div>
        <input type="submit" value="Colocar Pieza" disabled={(errorFila || errorcColumna) ? true : false}/>
      </form>
    )
  }


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
          {piezas.map(pieza => {
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
