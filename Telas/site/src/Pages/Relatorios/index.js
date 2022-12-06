import React, {useState} from 'react'
import "./index.css"
import {utils, writeFile} from 'xlsx';
import api from "../../Service/api";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Index() {

  const [typeReport, setTypeReport] = useState("");
  const [timeReport, setTimeReport] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  async function getData() {

    if(typeReport === ""){
      alert("Selecione um relatório");
      throw new Error("Selecione um relatório");
    }

    try{
      setIsLoading(true);
      const data = await api.get(`report/${typeReport}/${timeReport}`);

      return data.data;
    } catch (err) {
      console.log(err); 
    }

    setIsLoading(false);
  }

  async function generateReport(){
    try{
      const data = getData();

      const wb = utils.book_new();
      const ws = utils.json_to_sheet(await data);
      utils.book_append_sheet(wb, ws, "Relatório");
      writeFile(wb, "Relatório.xlsx");
    } catch (err) {
      alert(err);
    } 
    setIsLoading(false);
  }

  return (
    <div className="relatorios-container">
      <div className="relatorios-radio">
        <p>
          Selecione o relatório que deseja gerar:
        </p>
        <Form.Check 
          name="relatorio" 
          value="valvula" 
          label="Valvulas" 
          type="radio" 
          onChange={(e) => setTypeReport(e.target.value)}/>
        <Form.Check 
          name="relatorio" 
          value="sensor" 
          label="Sensor de solo"
          type="radio"
          onChange={(e) => setTypeReport(e.target.value)}/>
      </div>
      <div className="relatorios-input">
        <p>
          Selecione o intervalo de tempo:
        </p>
        <Form.Select onChange={(e) => setTimeReport(e.target.value)}>
          <option value="1">Ultima semana</option>
          <option value="4">Ultimo mês</option>
          <option value="8">Ultimo bimestre</option>
          <option value="12">Ultimo trimestre</option>
          <option value="18">Ultimo semestre</option>
          <option value="56">Ultimo ano</option>
        </Form.Select>
      </div>
      <div className="relatorios-button">
        <Button id="btn-relatorio" variant="secondary" type="submit" onClick={generateReport}>
          Gerar relatório
        </Button>
        {isLoading && <Spinner animation="border" variant="secondary" />}
      </div>
    </div>
  )
}

export default Index