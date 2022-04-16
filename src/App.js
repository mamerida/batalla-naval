
import './style.css';
import { useState } from 'react';

function App() {

  const [partida, setPartida] = useState(false);
  const [tableroJugador, setTableroJugador] = useState([]);
  const [tableroPc, setTableroPC] = useState([]);
  const piezas = [
    {
      nombre:"barco",
      largo:[0]
    },
    {
      nombre:"buque",
      largo:[0,1]
    },
    {
      nombre:"submarino",
      largo:[0,1,2]
    },
    {
      nombre:"portaAviones",
      largo:[0,1,2,3]
    }
  ]

  const comenzarPartida = () => {
    setPartida(true);
    setTableroJugador([["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""]])
    setTableroPC([["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""]])
  }

  return (
    <div className="App">
      <h3>Batalla Naval</h3>
      <div className='contenedor'>
        <button className='botonStart' onClick={comenzarPartida}>Comenzar Juego</button>
        <div className={partida ? "TableroJuego" : "none"}>
          <div className='ContenedorTablero'>

          </div>
          <label>Coloca tus piezas</label>
          <div className='inputsContainer'>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
