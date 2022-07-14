![Banner API](https://user-images.githubusercontent.com/97262778/176702116-eabb2fd8-b17a-4aaf-b891-b6b5b9a82531.png)

<br>

> # Inserir dados dos sensores 🛰
##### URL (POST)

```
https://api-irrigacao.herokuapp.com/sensor
```

#### Body JSON
```
  {
    "idSensor": 4,      
    "valorSensor": 80,
    "key": "valueKey"
  }
```

<br>

> # Coletando dados dos sensores 🛰
#### URL (GET)
  #### Todos recebem o parâmetro "key"
     1- Todos os registros com seus valores
     2- Todos os registros do id (parâmetro adicional "idSensor")
     3- Números de registros

```
1- https://api-irrigacao.herokuapp.com/sensor/allData
2- https://api-irrigacao.herokuapp.com/sensor/allDataId
3- https://api-irrigacao.herokuapp.com/sensor/allDataCount
```

<br><br>

> # Inserir dados das valvulas 💧
#### URL (POST)
```
https://api-irrigacao.herokuapp.com/valvula
```
#### Body JSON
```
{
  "idValvula": ?,
  "segundos": ?,
  "key": "valueKey"
}
```

<br>

> # Coletando os dados das Valvulas 💧
#### URL (GET)
  #### Todos recebem o parâmetro "key"
    1- Todos os registros com seus dados
    2- Todos os registros do id (parâmetro adicional "idValvula")
    3- Números de registros

```
1- https://api-irrigacao.herokuapp.com/valvula/allData
2- https://api-irrigacao.herokuapp.com/valvula/allDataId
3- https://api-irrigacao.herokuapp.com/valvula/allDataCount
```
