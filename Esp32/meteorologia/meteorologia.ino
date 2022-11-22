#include "DHT.h"

#define DHT11pin 13 // pino analogico do Esp32
#define DHTTYPE DHT11 // DHT 11

DHT dht(DHT11PIN, DHTTYPE);

void setup(){
  Serial.begin(9600);
  Serial.println("Iniciando estação meteorológica!\n");

  dht.begin();
}

void loop(){
  float humidade = dht.readHumidity();
  float temperatura = dht.readTemperature();

  if (isnan(humidade) || isnan(temperatura)){
    Serial.println("Falha ao ler dados do sensor DHT11!");
    return;
  }

  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println("ºC");

  Serial.print("Umidade: ");
  Serial.print(humidade);
  Serial.println("%");

  delay(2000);

  // TODO: enviar dados para o servidor
}