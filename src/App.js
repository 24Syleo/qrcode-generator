import { QrForm } from './components';
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <h1 className='title'>
          Génère ton code QR
        </h1>
      </div>
     <QrForm/>
    </div>
  );
}

export default App;
