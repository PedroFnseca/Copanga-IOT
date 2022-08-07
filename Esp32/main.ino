//Bibliotecas utilizadas, necessárias para funcionamento do código.
#include <ESPmDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include <HTTPClient.h>
#include <WiFi.h>

//Nome e senha do WiFi
#define STASSID "Theodoro_2.4G"
#define STAPSK  "20011999"

//Variaveis que armazenam a umidade, se a válvula está ligada 
//e o tempo que ela está ativa, respectivamente.
#define QuantSensores 2
int valorSensor[QuantSensores];
int valvula[QuantSensores];
int valvulaTimer[QuantSensores];

#define sensor0 35
#define sensor1 34

#define valvula0 25
#define valvula1 26

//Intervalo em que irá medir a umidade e enviar as requisições para a api.
//Sensibilidade, caso a umidade esteja abaixo desse valor, a valvula solenoide correspondente ativará,
//molhando assim a terra
int intervalo = 10;
int intervaloSeco = 1;
int sensSensor = 65;
bool soloSeco;

//Variavel auxiliar do intervalo
int millisData = 0;

//Senha da API
#define apiKey "\"Copanga7\""

//Endereços da API
const String SensorAPI = "http://api-irrigacao.herokuapp.com/sensor";
const String ValvulaAPI = "http://api-irrigacao.herokuapp.com/valvula";


//Função que envia as requisições POST
void postHTTP(String endereco, String payload)
{
    //Cliente que está acessando, sendo este o próprio esp e a criação de uma instância de um cliente http
    WiFiClient client;
    HTTPClient http;


    //Inicia a comunicação http e envia o header na requisição
    Serial.print("Requisição iniciada...\n");
    http.begin(client, endereco); //HTTP
    http.addHeader("Content-Type", "application/json");

    Serial.print("POST...\n");
    //httpCode é a variável que recebe o valor da requisição, se deu certo o valor é 200, responsável também por chamar a função que faz um POST na API.
    int httpCode = http.POST(payload);


    //caso o código seja maior que 0 ele retornou um código do corpo da requisição
    if (httpCode > 0) {
        // Mostra no monitor serial qual o código da requisição
        Serial.printf("Código HTTP: %d\n", httpCode);

        // Caso a requisição seja compreendida pela API, mostra no monitor serial o body da requisição
        if (httpCode == HTTP_CODE_OK) {
            //bodyGET recebe o que há escrito no corpo da pagina
            const String& bodyGET = http.getString();
            Serial.println("Pacote recebido:\n<<");
            Serial.println(bodyGET);
            Serial.println(">>");
        }
    } else {
        //Mostra o código de erro
        Serial.printf("Ocorreu erro ao enviar a requisição POST, erro: %s\n", http.errorToString(httpCode).c_str());
    }

    //Finaliza a requisição
    http.end();  
}


//função responsavel por receber os dados dos sensores ou valvulas e retornar o json
String json(String caminho, int id, int value)
{
    String jsonPayload;

    //verifica se o json é para o sensor ou para as valvulas
    if(caminho == "sensor")
    {
        jsonPayload = "{\"key\":"apiKey",\"idSensor\":" + String(id) + ",\"valorSensor\":" + String(value) + "}";
    }else if(caminho == "valvula")
    {
        jsonPayload = "{\"key\":"apiKey",\"idValvula\":" + String(id) + ",\"segundos\":" + String(value) + "}";
    }
  
  //Retorna a variavel com o json formatado e pronto para ser enviado para a api
  return jsonPayload;
}

//Função responsável por gerir as válvulas e o tempo em que elas estão ligadas
int acionamentoValvula(int id, bool onOff)
{
    int pin = 0;
    
    if(id == 0)
    {
      pin = valvula0;
    }else if(id == 1)
    {
      pin = valvula1;
    }
    
    //Define o pino selecionado como saida
    pinMode(pin, OUTPUT);
    
    //Caso queira ligar a válvula ela verifica se o indice do vetor é zero ou nulo, para evitar que ela
    //sobrescreva sobre o valor inicial, se for, ele registra o tempo inicial
    if(onOff == true && (valvulaTimer[id] == 0 || valvulaTimer[id] == NULL))
    {
        //Acionamento da valvula
        digitalWrite(pin, HIGH);
        //A valvula recebe o valor millis quando é acionada, tendo assim o tempo de inicio
        valvulaTimer[id] = millis();
    }
    //Caso a valvula estiver sendo desligada
    else if(onOff == false)
    {
        //Se a valvula for desligada a função retorna o tempo corrido desde o acionamento da válvula
        //que é igual ao meu tempo atual menos o tempo em que ela esteve ligada
        digitalWrite(pin, LOW);
        return (millis() - valvulaTimer[id])/1000;
    }
}

//Void que lê o valor dos sensores externos, tendo em vista que o valor recebido vai de 0 a 4095 
//é aplicado uma regra de tres para transformar em porcentagem
void humidityMeasurement()
{
    bool soloSecoAux;
    
    //Medição dos valores dos sensores que são transformados em porcentagem 
    //porque são lidos e retornam valores de 0 a 4095
    valorSensor[0] = map(analogRead(sensor0), 0, 4095, 100, 0);
    valorSensor[1] = map(analogRead(sensor1), 0, 4095, 100, 0);

    for(int i = 0; i <= QuantSensores; i++)
    {
      if((valorSensor[i] < sensSensor))
      {
          soloSecoAux = true;
          if((valorSensor[i] < sensSensor))
          {
            soloSeco = true || soloSecoAux;
          }
          
          acionamentoValvula(i, true);
      }else{
          soloSecoAux = false;
          acionamentoValvula(i, false);
      }
    }
}

void intervaloFuncao()
{
    //Condicional que é executada de tempos em tempos tendo como intervalo a variavel supra comentada
    if((millis() - millisData >= (intervalo * 60000)) && (soloSeco != true))
    {
        //A variavel auxiliar de tempo é sobrescrita e passa a ser o tempo atual,
        //refazendo assim o ciclo.
        millisData = millis();
       
        
        //comando para enviar requisição para o sensor,o primeiro parametro é o endereço, 
        //e o segundo é um objeto String que retorna formatado o json
        postHTTP(SensorAPI, json("sensor", 2, valorSensor[0]));
        postHTTP(SensorAPI, json("sensor", 3, valorSensor[1]));
        postHTTP(ValvulaAPI, json("valvula", 0, acionamentoValvula(0, HIGH)));
        postHTTP(ValvulaAPI, json("valvula", 1, acionamentoValvula(1, HIGH)));
    }else if((millis() - millisData >= (intervaloSeco * 60000)) && (soloSeco == true))
    {
        millisData = millis();
        postHTTP(SensorAPI, json("sensor", 2, valorSensor[0]));
        postHTTP(SensorAPI, json("sensor", 3, valorSensor[1]));
        postHTTP(ValvulaAPI, json("valvula", 0, acionamentoValvula(0, HIGH)));
        postHTTP(ValvulaAPI, json("valvula", 1, acionamentoValvula(1, HIGH)));
    }
}
void setup() {  
    Serial.begin(115200);
    Serial.println();


    //inicia a conexão WiFi, passando o nome e a senha da rede WiFi
    WiFi.begin(STASSID, STAPSK);

    //Enquanto não estiver conectado o código não procede para as próximas etapas
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    //Conectado, aparece o IP da rede
    Serial.println("");
    Serial.print("Connected! IP address: ");
    Serial.println(WiFi.localIP());





    //OTA

  // Port defaults to 3232
  // ArduinoOTA.setPort(3232);

  // Hostname defaults to esp3232-[MAC]
  // ArduinoOTA.setHostname("myesp32");

  // No authentication by default
  // ArduinoOTA.setPassword("admin");

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
    
    //Espera pela conexão WiFi
    if ((WiFi.status() == WL_CONNECTED)) {
        
        humidityMeasurement();
        intervaloFuncao();
    }
}
