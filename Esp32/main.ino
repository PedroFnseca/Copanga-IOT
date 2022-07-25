#include <ESPmDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include <HTTPClient.h>
#include <WiFi.h>

//Nome e senha do WiFi
#define STASSID "Theodoro_2.4G"
#define STAPSK  "20011999"

//int idSensor = 7;
int valorSensor[2];
int measurementInterval = 10;
int SensorSensivity = 55;
int millisData = 0;

//Senha da API
#define apiKey "\"Copanga7\""

//Endereços da API
const String SensorAPI = "http://api-irrigacao.herokuapp.com/sensor";
const String ValvulaAPI = "http://api-irrigacao.herokuapp.com/valvula";


void humidityMeasurement()
{
  valorSensor[0] = map(analogRead(35), 0, 4095, 100, 0);
  valorSensor[1] = map(analogRead(34), 0, 4095, 100, 0);

  /*for(int i = 0; i >= (sizeof(valorSensor)/sizeof(int)); i++)
  {
    if(valorSensor[i] <= SensorSensivity)
    {
      //comando para enviar requisição para o sensor, primeiro parametro é o endereço, 
      //e o segundo é um objeto String que retorna formatado o json
      postHTTP(SensorAPI, json("sensor ", i, valorSensor[i]));
      //acionaValvula();
    }
  }*/
}


//função responsavel por receber os dados dos sensores ou valvulas e retornar o json a ser enviado
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

//Void que envia as requisições POST
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



  //OTA

  // Port defaults to 3232
  // ArduinoOTA.setPort(3232);

  // Hostname defaults to esp3232-[MAC]
  ArduinoOTA.setHostname("esp32");

  // No authentication by default
  ArduinoOTA.setPassword("admin");

  // Password can be set with it's md5 value as well
  // MD5(admin) = 21232f297a57a5a743894a0e4a801fc3
  // ArduinoOTA.setPasswordHash("21232f297a57a5a743894a0e4a801fc3");

  ArduinoOTA
    .onStart([]() {
      String type;
      if (ArduinoOTA.getCommand() == U_FLASH)
        type = "sketch";
      else // U_SPIFFS
        type = "filesystem";

      // NOTE: if updating SPIFFS this would be the place to unmount SPIFFS using SPIFFS.end()
      Serial.println("Start updating " + type);
    })
    .onEnd([]() {
      Serial.println("\nEnd");
    })
    .onProgress([](unsigned int progress, unsigned int total) {
      Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
    })
    .onError([](ota_error_t error) {
      Serial.printf("Error[%u]: ", error);
      if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
      else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
      else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
      else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
      else if (error == OTA_END_ERROR) Serial.println("End Failed");
    });

  ArduinoOTA.begin();
}

void loop() {
  ArduinoOTA.handle();
  humidityMeasurement();
  
  //Espera pela conexão WiFi
  if ((WiFi.status() == WL_CONNECTED)) {
    if(millis() - millisData >= (measurementInterval * 60000))
    {
      millisData = millis();
     
      //comando para enviar requisição para o sensor,o primeiro parametro é o endereço, 
      //e o segundo é um objeto String que retorna formatado o json
      postHTTP(SensorAPI, json("sensor", 2, valorSensor[0]));
      postHTTP(SensorAPI, json("sensor", 3, valorSensor[1]));
    }
  }
}
