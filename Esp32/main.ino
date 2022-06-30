//Bibliotecas a serem utilizadas, biblioteca para conexão WiFi e para utilizar o protocolo HTTP
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>


//Instruções caso a API esteja em localHost
/* this can be run with an emulated server on host:
        cd esp8266-core-root-dir
        cd tests/host
        make ../../libraries/ESP8266WebServer/examples/PostServer/PostServer
        bin/PostServer/PostServer
   then put your PC's IP address in SERVER_IP below, port 9080 (instead of default 80):
*/
#define SERVER_IP "10.0.1.7:9080" // endereço do PC, caso a API esteja em localhost
#define SERVER_IP "192.168.1.42"

//Configuração de nome e senha da rede WiFi a ser conenctada
#ifndef ssid
#define ssid "ssid"
#define password  "password"
#endif


//Variável global responsável por guardar o pacote JSON a ser enviado
string jsonPayload = "{\"idSensor\":15,\"valorSensor\":200}";


//Funcionamento interno
int Sensor1A, Sensor2A, Sensor1B, Sensor2B;
int SensorSensivity = 550;
int measurementInterval = 300;


void postHTTP(string endereco, string payload)
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

    //caso o código seja menor que 0, significa que o POST deu erro
    if (httpCode > 0) {
      // Mostra no monitor serial qual o código da requisição
      Serial.printf("Código HTTP: %d\n", httpCode);

      // Caso a requisição seja compreendida pela API, mostra no monitor serial o retorno da API
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


void humidityMeasurement()
{
  if(Sensor1A <= SensorSensivity)
  {
    Serial.print("Solo seco, sensor1A");
  }

  if(Sensor2A <= SensorSensivity)
  {
    Serial.print("Solo seco, sensor2A");
  }

  if(Sensor1B <= SensorSensivity)
  {
    Serial.print("Solo seco, sensor1B");
  }

  if(Sensor2B <= SensorSensivity)
  {
    Serial.print("Solo seco, sensor2B");
  }
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  PORTD = B00000011;
  
  
  //WiFi
  Serial.begin(115200);

  Serial.println();
  Serial.println();
  Serial.println();

  //Inicia a conexão WiFi, passando o ssid e a senha
  WiFi.begin(ssid, password);

  //Enquanto não está conectado à rede, aparece pontinhos a cada meio segundo no monitor serial
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
        
  //Após conectar, aparece o endereço IP
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  int millisData;
  
  // put your main code here, to run repeatedly:
  Sensor1A = digitalRead(0);
  Sensor2A = digitalRead(1);
  Sensor1B = digitalRead(2);
  Sensor2B = digitalRead(3);
  
  
  
  //HTTP 
  //Espera pela conexão WiFi, e a cada 10 segundos envia a requisição
  if ((WiFi.status() == WL_CONNECTED)) {         
          if(millis() - millisData >= measurementInterval)
          {
            humidityMeasurement();
            //Chama a função para enviar o endereço da API e o pacote JSON
            postHTTP("https://api-irrigacao.herokuapp.com/sensor", jsonPayload);
          }
  }
}
