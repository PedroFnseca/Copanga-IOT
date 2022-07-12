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

> # Coletar todos os dados dos sensores 🛰
#### URL (GET)

```
https://api-irrigacao.herokuapp.com/sensor/allData
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

> # Coletar todos os dados das Valvulas 💧
#### URL (GET)

```
https://api-irrigacao.herokuapp.com/sensor/allData
```

#### Body JSON
```
  {
    "key": "valueKey"
  }
```
