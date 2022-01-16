#include "DHT.h"
#include <SoftwareSerial.h>
#include <ArduinoJson.h>

#define DHTPIN 2     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11   // DHT 11
DHT dht(DHTPIN, DHTTYPE);


SoftwareSerial espSerial(12, 13); // RX, TX
StaticJsonDocument<200> doc;

int aqiSensorValue;
int smokeSensorValue;
void setup() {
  Serial.begin(115200);    // sets the serial port to 9600
  dht.begin();
  // set the data rate for the SoftwareSerial port
  espSerial.begin(115200);
  espSerial.println("Intialised");

}
void loop() {
  aqiSensorValue = analogRead(0);       // read analog input pin 0
  Serial.print("AirQua=");
  Serial.print(aqiSensorValue, DEC);               // prints the value read
  Serial.println(" PPM");
  smokeSensorValue = analogRead(2);
  Serial.print("Smoke=");
  Serial.print(smokeSensorValue, DEC);               // prints the value read
  Serial.println(" PPM");
  float sensor_volt;
  float RS_gas; // Get value of RS in a GAS
  float ratio; // Get ratio RS_GAS/RS_air
  int sensorValue = analogRead(A1);
  sensor_volt = (float)sensorValue / 1024 * 5.0;
  RS_gas = (5.0 - sensor_volt) / sensor_volt; // omit *RL

  /*-Replace the name "R0" with the value of R0 in the demo of First Test -*/
  ratio = RS_gas / -0.09; // ratio = RS/R0
  /*-----------------------------------------------------------------------*/

  Serial.print("sensor_volt = ");
  Serial.println(sensor_volt);
  Serial.print("RS_ratio = ");
  Serial.println(RS_gas);
  Serial.print("Rs/R0 = ");
  Serial.println(ratio);
  float h = dht.readHumidity();
  float t = dht.readTemperature();     // read temperature
  if (isnan(h) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  Serial.print(F(" Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.println(F("°C "));
  doc["aqi"] = aqiSensorValue;
  doc["smoke"] = smokeSensorValue;
  doc["temp"] = t;
  doc["hum"] = h;
  serializeJson(doc, Serial);
  Serial.println("");
  Serial.println("----------");
  espSerial.println(doc.as<String>());


  delay(2000);                                   // wait 100ms for next reading
}
