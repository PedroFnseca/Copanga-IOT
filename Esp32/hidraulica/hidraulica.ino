#define waterPump 6
#define levelSensor 5 

void setup() {
  //Define como saída e entrada, respectivamente a bomba de água e o sensor de nível
  pinMode(waterPump, OUTPUT);
  pinMode(levelSensor, INPUT);
}

void loop() {           
  //Caso a água chegue no nivel, ele desliga a bomba de água
  if(digitalRead(levelSensor) == HIGH){
    digitalWrite(waterPump, LOW);
  }else {
    digitalWrite(waterPump, HIGH);
 }
}
