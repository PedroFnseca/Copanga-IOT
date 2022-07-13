//Bibliotecas a serem utilizadas, biblioteca para conexão WiFi e para utilizar o protocolo HTTP
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

//Configuração de nome e senha da rede WiFi a ser conenctada
#define STASSID "Theodoro_2.4G"
#define STAPSK  "20011999"

//Senha para se comunicar com a API
#define apiKey "\"Copanga7\""

//Endereços para enviar os pacotes sobre os sensores e válvulas
const String SensorAPI = "http://api-irrigacao.herokuapp.com/sensor";
const String ValvulaAPI = "http://api-irrigacao.herokuapp.com/valvula";

//Funcionamento interno
int sensor[1];
int SensorSensivity = 550;
int measurementInterval = 10;
int millisData = 0;


//função responsável por retornar o json com os valores de sensore ou válvulas
String json(String caminho, int id, int value)
{
  String jsonPayload;
  
  //verifica se o json é para o sensor ou para as valvulas
  if(caminho == "sensor")
  {
    jsonPayload = "{\"key\":"apiKey",\"idSensor\":" + String(id) + ",\"valorSensor\":" + String(value) + "}";
    return jsonPayload;
  }else if(caminho == "valvula")
  {
    jsonPayload = "{\"key\":"apiKey",\"idValvula\":" + String(id) + ",\"segundos\":" + String(value) + "}";
    return jsonPayload;
  }
  
}


//Função que efetua a requisição à API e retorna no monitor Serial qual a resposta do body
void postHTTP(String endereco, String payload)
{
  WiFiClient client;
  HTTPClient http;

  Serial.print("Requisição iniciada...\n");
  //Inicia a comunicação http e envia o header na requisição
  http.begin(client, endereco); //HTTP
  http.addHeader("Content-Type", "application/json");

  Serial.print("POST...\n");
  //httpCode é a variável que recebe o valor da requisição, se deu certo o valor é 200, responsável também por chamar a função que faz um POST na API.
  int httpCode = http.POST(payload);

  //caso o código seja maior que 0 ou seja, retornou o código
  if (httpCode > 0) {
    // Mostra no monitor serial qual o código da requisição
    Serial.printf("Código HTTP: %d\n", httpCode);

    // Caso a requisição seja compreendida pela API, mostra no monitor serial o body da requisição
    if (httpCode == HTTP_CODE_OK) {
      const String& bodyGET = http.getString();
      Serial.println("Pacote recebido:\n<<");
      Serial.println(bodyGET);
      Serial.println(">>");
    }
  }else{
      Serial.printf("Ocorreu erro ao enviar a requisição POST, erro: %s\n", http.errorToString(httpCode).c_str());
    }
  //Finaliza a comunicação
  http.end();  
}

//Função que mede a umidade do solo em cada sensor
void humidityMeasurement()
{
  for(int i = 0; i >= sizeof(sensor); i++)
  {
    //O indice do vetor é correspondente ao index do for e o terminal a ser medido também
    sensor[i] = analogRead(i);

    //se a umidade no sensor for menor que a sensibilidade pre-determinada ele enviará o valor para API e executará uma função para acionar a válvula solenoide
    if(sensor[i] <= SensorSensivity)
    {
      Serial.print("Solo seco, sensor" + i);
      //comando para enviar requisição para o sensor, primeiro parametro é o endereço, e o segundo é um objeto String que retorna formatado o json
      postHTTP(SensorAPI, json("sensor", i, sensor[i]));
      //acionaValvula();
    }
  }
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  //definir os terminais de 0 a 5 como pinos de leitura referentes aos sensores de umidade
  for(int i = 0; i = 5; i++)
  {
    pinMode(i, INPUT);
  }

  //terminais 6 e 7 como saída, referentes às valvulas
  pinMode(7, OUTPUT);
  pinMode(6, OUTPUT);

  Serial.println();
  Serial.println();
  Serial.println();

  //inicia a conexão WiFi
  WiFi.begin(STASSID, STAPSK);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() { 
  //Espera pela conexão WiFi
  if ((WiFi.status() == WL_CONNECTED)) {
    //Caso haja internet e medirá a todo instante a umidade do soloe tomará decisões
    humidityMeasurement();
    
    //A cada 10 minutos envia a requisição
    if(millis() - millisData >= (measurementInterval * 60000))
    {
      //reiniciando ciclo de contagem
      millisData = millis();

      //comando para enviar requisição para o sensor, primeiro parametro é o endereço, e o segundo é um objeto String que retorna formatado o json
      for(int i = 0; i >= sizeof(sensor); i++)
      {
        //O indice do vetor é correspondente ao index do for e o terminal a ser medido também
        sensor[i] = analogRead(i);
        
        //comando para enviar requisição para o sensor, primeiro parametro é o endereço, e o segundo é um objeto String que retorna formatado o json
        postHTTP(SensorAPI, json("sensor", i, sensor[i]));
      }
    }
  }
}
