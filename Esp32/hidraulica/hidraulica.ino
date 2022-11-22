#define waterPump 11
#define levelSensor4 10
#define levelSensor3 9
#define levelSensor2 8
#define levelSensor1 7 

void setup() {
  //Define como saída e entrada, respectivamente a bomba de água e o sensor de nível
  pinMode(waterPump, OUTPUT);
  pinMode(levelSensor4, INPUT);
  pinMode(levelSensor3, INPUT);
  pinMode(levelSensor2, INPUT);
  pinMode(levelSensor1, INPUT);

  Serial.begin(9600);
}

void loop() {           
  //Caso a água chegue no nivel, ele desliga a bomba de água
  if(digitalRead(levelSensor4) == HIGH){
    digitalWrite(waterPump, LOW);
    Serial.println("O sensor do bairro 4 está ativo");
    Serial.println("A bomba de água está desligada");
  }else {
    digitalWrite(waterPump, HIGH);
    Serial.println("A bomba de água está ligada");
 }

 Serial.println("O sensor 1 está: " + digitalRead(levelSensor3));
 Serial.println("O sensor 1 está: " + digitalRead(levelSensor2));
 Serial.println("O sensor 1 está: " + digitalRead(levelSensor1));
}
