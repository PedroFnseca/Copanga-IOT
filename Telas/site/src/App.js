import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Canvas from './Components/Canvas/index';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Canvas />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
