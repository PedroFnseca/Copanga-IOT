int Sensor1A, Sensor2A, Sensor1B, Sensor2B;
int SensorSensivity;
int measurementInterval;

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
}

void loop() {
  int millisData;
  
  // put your main code here, to run repeatedly:
  Sensor1A = digitalRead(0);
  Sensor2A = digitalRead(1);
  Sensor1B = digitalRead(2);
  Sensor2B = digitalRead(3);
  
  if(millis() - millisData >= measurementInterval)
  {
    humidityMeasurement();
  }
}
