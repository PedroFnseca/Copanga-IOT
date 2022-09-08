 #define sinalVerde 5
 #define sinalAmarelo 4
 #define sinalVermelho 3
 #define delaySemaforo 2

 #define sensorAgua 6
 #define bombaAgua 7
 
 void setup() {
  pinMode(sinalVerde, OUTPUT);
  pinMode(sinalAmarelo, OUTPUT);
  pinMode(sinalVermelho, OUTPUT);
}

void loop() {
  semaforo();
  gerenciaAgua();
}

void semaforo()
{
  //gerenciamento dos leds dos semáforos
  digitalWrite(sinalVermelho, LOW);
  digitalWrite(sinalVerde, HIGH);
  
  delay(delaySemaforo);
  
  digitalWrite(sinalVerde, LOW);
  digitalWrite(sinalAmarelo, HIGH);

  delay(delaySemaforo);
  
  digitalWrite(sinalAmarelo, LOW);
  digitalWrite(sinalVermelho, HIGH);

  delay(delaySemaforo);
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
