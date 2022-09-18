 #define sinalVerde 4
 #define sinalAmarelo 3
 #define sinalVermelho 2

 //delay do semaforo em segundos
 #define delaySemaforo 2

 #define sensorAgua 6
 #define bombaAgua 7


void semaforo()
{
  //gerenciamento dos leds dos semáforos
  digitalWrite(sinalAmarelo, LOW);
  digitalWrite(sinalVermelho, LOW);
  digitalWrite(sinalVerde, HIGH);
  
  delay(delaySemaforo * 1000);
  
  digitalWrite(sinalVerde, LOW);
  digitalWrite(sinalAmarelo, HIGH);

  delay(delaySemaforo * 1000);
  
  digitalWrite(sinalAmarelo, LOW);
  digitalWrite(sinalVermelho, HIGH);

  delay(delaySemaforo * 1000);

  digitalWrite(sinalAmarelo, HIGH);

  delay(delaySemaforo * 1000);
}

void gerenciaAgua()
{
  if(sensorAgua == HIGH)
  {
    digitalWrite(bombaAgua, HIGH);
  }else{
    digitalWrite(bombaAgua, LOW);
  }
} 



void setup() {
  pinMode(sinalVerde, OUTPUT);
  pinMode(sinalAmarelo, OUTPUT);
  pinMode(sinalVermelho, OUTPUT);
}

void loop() {
  semaforo();
  gerenciaAgua();
}
