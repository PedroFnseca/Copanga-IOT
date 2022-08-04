> # Inserir dados dos sensores 🌱
> ### URL (POST)

#### ```https://api-irrigacao.herokuapp.com/sensor```

#### Body JSON

    {
      "idSensor": 4,      
      "valorSensor": 80,
      "key": "valueKey"
    }

<br>

> # Coletando dados dos sensores 🌱
> ### URL (GET)

#### 1- Todos os registros com seus valores ```https://api-irrigacao.herokuapp.com/sensor/allData```
#### 2- Todos os registros do id (parâmetro adicional "idSensor") ```https://api-irrigacao.herokuapp.com/sensor/allDataId```
#### 3- Números de registros ```https://api-irrigacao.herokuapp.com/sensor/allDataCount```
#### 4- Ultimos registros (parametro adicional "last" = número de registros) ```https://api-irrigacao.herokuapp.com/sensor/lastData```


<br><br>

> # Inserir dados das valvulas 💧
> ### URL (POST)
#### ```https://api-irrigacao.herokuapp.com/valvula```
#### Body JSON

    {
     "idValvula": ?,
     "segundos": ?,
     "key": "valueKey"
    }


<br>

> # Coletando os dados das Valvulas 💧
> ### URL (GET)
#### 1- Todos os registros com seus dados ```https://api-irrigacao.herokuapp.com/valvula/allData```
#### 2- Todos os registros do id (parâmetro adicional "idValvula") ```https://api-irrigacao.herokuapp.com/valvula/allDataId```
#### 3- Números de registros ```https://api-irrigacao.herokuapp.com/valvula/allDataCount```
#### 4- Ultimos registros (parametro adicional "last" = número de registros) ```https://api-irrigacao.herokuapp.com/valvula/lastData```
