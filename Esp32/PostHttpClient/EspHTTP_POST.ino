#include <HTTPClient.h>
#include <WiFi.h>

const String SensorAPI = "http://api-irrigacao.herokuapp.com/sensor";
const String ValvulaAPI = "http://api-irrigacao.herokuapp.com/valvula";

//Nome e senha do WiFi
#define STASSID "Theodoro_2.4G"
#define STAPSK  "20011999"

int idSensor = 7;
int valorSensor = 0;
int measurementInterval = 10;
int millisData = 0;

//Senha da API
#define apiKey "\"Copanga7\""

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
    } else {
      Serial.printf("Ocorreu erro ao enviar a requisição POST, erro: %s\n", http.errorToString(httpCode).c_str());
    }
    http.end();  
}


void setup() {  
  Serial.begin(115200);

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
  valorSensor = analogRead(35);
  //Espera pela conexão WiFi
  if ((WiFi.status() == WL_CONNECTED)) {
    if(millis() - millisData >= (measurementInterval * 60000))
    {
      millisData = millis();
      //comando para enviar requisição para o sensor, primeiro parametro é o endereço, e o segundo é um objeto String que retorna formatado o json
      postHTTP(SensorAPI, json("sensor", idSensor, valorSensor));
    }
  }
}
