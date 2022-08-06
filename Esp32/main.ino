//Bibliotecas utilizadas, necessárias para funcionamento do código.
#include <ESPmDNS.h>
#include <WiFiUdp.h>
#include <HTTPClient.h>
#include <WiFi.h>

//Nome e senha do WiFi
#define STASSID "Theodoro_2.4G"
#define STAPSK  "20011999"

//Variaveis que armazenam a umidade, se a válvula está ligada 
//e o tempo que ela está ativa, respectivamente.
int valorSensor[2];
int valvula[2];
int valvulaTimer[2];

//Intervalo em que irá medir a umidade e enviar as requisições para a api.
//Sensibilidade, caso a umidade esteja abaixo desse valor, a valvula solenoide correspondente ativará,
//molhando assim a terra
int intervalo = 10;
int sensibilidadeSensor = 55;

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
int acionamentoValvula(int pin, int id, bool onOff)
{
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
    valorSensor[0] = map(analogRead(35), 0, 4095, 100, 0);
    valorSensor[1] = map(analogRead(34), 0, 4095, 100, 0);
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
}

void loop() {
    //Espera pela conexão WiFi
    if ((WiFi.status() == WL_CONNECTED)) {
        //Condicional que é executada de tempos em tempos tendo como intervalo a variavel supra comentada
        if(millis() - millisData >= (intervalo * 60000))
        {
            //A variavel auxiliar de tempo é sobrescrita e passa a ser o tempo atual,
            //refazendo assim o ciclo.
            millisData = millis();

            //Medição dos sensores
            humidityMeasurement();
            
            //comando para enviar requisição para o sensor,o primeiro parametro é o endereço, 
            //e o segundo é um objeto String que retorna formatado o json
            postHTTP(SensorAPI, json("sensor", 0, valorSensor[0]));
            postHTTP(SensorAPI, json("sensor", 1, valorSensor[1]));
            postHTTP(ValvulaAPI, json("valvula", 0, acionamentoValvula(24, 0, HIGH)));
            postHTTP(ValvulaAPI, json("valvula", 1, acionamentoValvula(25, 1, HIGH)));
        }
    }
}
