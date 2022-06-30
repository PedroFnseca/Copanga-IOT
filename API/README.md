![Banner API](https://user-images.githubusercontent.com/97262778/176702116-eabb2fd8-b17a-4aaf-b891-b6b5b9a82531.png)

<br>

# Como Usar a API 🤔

<br>

> ## Para inserir dados de sensores de umidade 🛰
## URL
```
https://api-irrigacao.herokuapp.com/sensor
```

## Body JSON
### Coloque os valores no lugar do '?'
```
  {
    "idSensor": ?,      
    "valorSensor": ?
  }
```

<br>
<br>

## Para inserir dados das valvulas 💧
- ### URL
```
https://api-irrigacao.herokuapp.com/valvula
```
- ### Body JSON
  - ### Coloque os valores no lugar do ?
```
{
  "idValvula": ?,
  "segundos": ?
}
```
