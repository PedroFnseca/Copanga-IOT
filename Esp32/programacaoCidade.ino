 #define sinalVerde 5;
 #define sinalAmarelo 4;
 #define sinalVermelho 3;
 #define delaySemaforo 2;

 #define sensorAgua 6;
 #define bombaAgua 7;
 
 void setup() {
  pinMode(sinalVerde, OUTPUT);
  pinMode(sinalAmarelo, OUTPUT);
  pinMode(sinalVermelho, OUTPUT);
}

void loop() {
  semaforo(delaySemaforo);
  gerenciaAgua();
}

void semaforo(int delaySemaforo)
{
  //gerenciamento dos leds dos semáforos
  digitalWrite(sinalVermelho, LOW);
  digitalWrite(sinalVerde, HIGH);
  
  delay(this.delaySemaforo);
  
  digitalWrite(sinalVerde, LOW);
  digitalWrite(sinalAmarelo, HIGH);

  delay(this.delaySemaforo);
  
  digitalWrite(sinalAmarelo, LOW);
  digitalWrite(sinalVermelho, HIGH);

  delay(this.delaySemaforo);
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
