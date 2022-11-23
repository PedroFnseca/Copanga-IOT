import React, { useState, useEffect } from "react";
import api from "../../Service/api";
import Linechart from "../Charts/Linechart";
import "./index.css";

function AllSensorChart() {
  // Função para buscar os dados do sensor na API
  async function getData() {
    try {
      const data = await api.get("sensor/allData");
      return data.data.results;
    } catch (err) {
      console.log(err.code); // Erro de conexão
    }
  }

  async function getChartData() {
    const data = await getData();

    // Formatando data para o formato do gráfico
    const hour = data.map((item) => {
      const { dataHora } = item;
      const YMD = dataHora.split("T");
      const separatedHour = YMD[1].split(":");
      return `${separatedHour[0]}:${separatedHour[1]}`;
    });
    // Remove dados duplicados e põe em labels
    const labels = hour.filter((este, i) => hour.indexOf(este) === i);

    // Separa os dados de cada sensor para cada array
    const dados = [[], [], [], [], [], [], [], [], []]; // sensor1, sensor2, sensor3 ...
    const valueSensor = [];
    data.map((item) => {
      const { valorSensor, id_sensor } = item;
      dados[id_sensor].push(valorSensor);
    });
    // Passa os dados coletados para um array obs: O index do array é o id do sensor
    for (let i = 0; i < dados.length; i++) {
      if (dados[i].length != 0) {
        valueSensor.push(dados[i]);
      }
    }

    // Criando datasets para o gráfico
    const datasets = [];
    // Gerando dataset de acordo com o número de sensores
    for (let i = 0; i < valueSensor.length; i++) {
      let color = "";

      // Gerando cores de acordo com o id do sensor
      switch (i) {
        case 0:
          color = "#A5EEA0";
          break;
        case 1:
          color = "#1B98E0";
          break;
        case 2:
          color = "#623307";
          break;
        case 3:
          color = "#1B98E0";
          break;
        case 4:
          color = "#1B98E0";
          break;
      }

      datasets.push({
        label: `Sensor ${i + 1}`,
        data: valueSensor[i].reverse(),
        backgroundColor: color,
        borderColor: color,
        borderWidth: 3,
        tension: 0.2,
        pointStyle: "circle",
        pointRadius: 2.5,
      });
    }
    const days = [];
    // Coletando os dias referentes aos dados
    data.map((item) => {
      const { dataHora } = item;
      const YMD = dataHora.split("T");
      const date = YMD[0].split("-");
      const dateFormated = `${date[2]}-${date[1]}`;
      if (!days.includes(dateFormated)) days.push(dateFormated);
    });

    // Determinando os dias referentes aos dados na váriavel legend
    let legend = ""; // Legendas do gráfico
    if (days.length > 1) legend = `${days.pop()} a ${days[0]}`;
    else legend = days[0];

    // Dados do gráfico
    const dataChart = {
      // Atribuindo labels do gráfico
      type: "line",
      labels: labels.reverse(),
      datasets: datasets,
    };

    console.log("foi");
    return [dataChart, legend]; // Retornando dados do gráfico e legendas
  }

  // Hook que armazena os dados do gráfico
  const [dataChart, setDataChart] = useState({
    labels: ["...", "Carregando...", "..."],
    datasets: [
      {
        label: "Verifique a conexão com a internet",
        data: [0, 0, 0],
      },
    ],
  });

  // hook que armazena as options do gráfico
  const [options, setOptions] = useState({
    // Dados que irão aparecer durante o carregamento do gráfico
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: { stepSize: 10 },
      },
    },
    plugins: {
      title: {
        display: true,
        text: `Carregando dados...`,
        font: { size: 22 },
      },
      subtitle: {
        display: true,
        text: `Aguarde...`,
        font: { size: 18 },
      },
      legend: {
        // Caixas de legenda
        display: true,
        labels: {
          boxWidth: 50,
          font: { size: 16 },
        },
      },
    },
  });

  // Método para setar os dados do gráfico com promisse
  useEffect(() => {
    getChartData().then((data) => {
      setDataChart(data[0]); // Dados do gráfico

      const legend = data[1]; // Legendas do gráfico (dia(s))

      // Atualiza o titulo e legenda do gráfico
      setOptions({
        // responsive: true,
        // aspectRatio: 1,
        plugins: {
          title: {
            display: true,
            text: `Sensores de Umidade (%)`,
            font: { size: 22 },
            padding: 2,
          },
          subtitle: {
            display: true,
            text: `Dados de ${legend}`,
            font: { size: 18 },
            position: "top",
          },
          legend: {
            // Caixas de legenda
            display: true,
            labels: {
              boxWidth: 50,
              font: { size: 16 },
            },
          },
        },
      });
    });
  }, []);

  // Renderiza o gráfico
  return (
    <>
    <div id="DivchartAllSensor" className="mobile">
      <Linechart data={dataChart} options={{
        ...options,
        responsive: true,
        aspectRatio: 1,
        plugins: {
          ...options.plugins,
          legend: {
            ...options.plugins.legend,
            size: 12,
          },
          title: {
            ...options.plugins.title,
            font: {
              ...options.plugins.title.font,
              size: 16,
            }
          },
          subtitle: {
            ...options.plugins.subtitle,
            font: {
              ...options.plugins.subtitle.font,
              size: 14,
            }
          }
        }
      }}/>
    </div>

    <div id="DivchartAllSensor" className="desktop">
      <Linechart data={dataChart} options={options}/>
    </div>
    </>
  );
}

export default AllSensorChart;
