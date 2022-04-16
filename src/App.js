
import style from './style.css';
import { useState } from 'react';

function App() {

  const [partida, setPartida] = useState(false);

  const comenzarPartida = () => {
    setPartida(true);
  }

  return (
    <div className="App">
      <h3>Batalla Naval</h3>
      <div className='contenedor'>
        <button className='botonStart' onClick={comenzarPartida}>Comenzar Juego</button>
        <div className='TableroJuego'>
          <div className='tableroJugador'></div>
          <div className='tableroPc'></div>
        </div>
      </div>
    </div>
  );
}

export default App;
