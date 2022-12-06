import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/index.js";
import Header from "./Components/Header/index.js";
import Sensores from "./Pages/Sensores";
import Valvulas from "./Pages/Valvulas"
import Footer from "./Components/Footer/index.js";
import Error from "./Pages/Error";
import Relatorios from "./Pages/Relatorios/index.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sensores" element={<Sensores />} />
          <Route path="/valvulas" element={<Valvulas />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
