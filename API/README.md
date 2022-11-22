# Inserir dados dos sensores 🌱
### URL (POST)

#### ```https://api-irrigacao.herokuapp.com/sensor```

#### Body JSON

```json
{
    "idSensor": 4,      
    "valorSensor": 80,
    "key": "valueKey"
}
```

<br>

# Coletando dados dos sensores 🌱
### URL (GET)

#### 1- Todos os registros com seus valores ```.../sensor/allData```
#### 2- Todos os registros do id (parâmetro adicional "idSensor") ```.../sensor/allDataId```
#### 3- Números de registros ```.../sensor/allDataCount```
#### 4- Ultimos registros (parametro adicional "last" = número de registros) ```.../sensor/lastData```


<br><br>

# Inserir dados das valvulas 💧
### URL (POST)
#### ```https://api-irrigacao.herokuapp.com/valvula```
#### Body JSON

```json
{
    "idValvula": 10,
    "segundos": 20,
    "key": "valueKey"
}
```

<br>

> # Coletando os dados das Valvulas 💧
> ### URL (GET)
#### 1- Todos os registros com seus dados ```.../valvula/allData```
#### 2- Todos os registros do id (parâmetro adicional "idValvula") ```.../valvula/allDataId```
#### 3- Números de registros ```.../valvula/allDataCount```
#### 4- Ultimos registros (parametro adicional "last" = número de registros) ```.../valvula/lastData```

<br><br>

# Inserir os dados em meteorologia 📡

### URL (POST)

#### ```https://api-irrigacao.herokuapp.com/meteorologia``` Insere os dados de meteorologia

#### Body JSON

```json
{
    "temperatura": 20,
    "umidade": 50
}
```

<br>

# Coletando os dados de meteorologia 📡

### URL (GET)

#### 1- Todos os registros com seus dados ```.../meteorologia/```