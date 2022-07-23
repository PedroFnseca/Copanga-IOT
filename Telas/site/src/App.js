import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Error from './Pages/Error';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
