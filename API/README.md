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
     1- Todos os registros com seus valores
     2- Números de registros

```
1- https://api-irrigacao.herokuapp.com/sensor/allData
2- https://api-irrigacao.herokuapp.com/sensor/allDataCount
```

#### Body JSON
```
  {
    "key": "valueKey"
  }
```

# ㅤ
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
    1- Todos os registros com seus dados
    2- Número de registros

```
1- https://api-irrigacao.herokuapp.com/valvula/allData        
2- https://api-irrigacao.herokuapp.com/valvula/allDataCount
```

#### Body JSON
```
  {
    "key": "valueKey"
  }
```
