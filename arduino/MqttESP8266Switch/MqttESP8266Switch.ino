#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>




// Update these with values suitable for your network.

const char* ssid = "*****";
const char* password = "*****";
const char* mqtt_server = "*****";
const int mqtt_port = ****;
const char* mqtt_user="*****";

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE	(50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  //  for (int i = 0; i < length; i++) {
  //    Serial.print((char)payload[i]);
  //  }
  //  Serial.println();
  StaticJsonDocument<96> doc;
  String input((char*) payload);
  DeserializationError error = deserializeJson(doc, input);

  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    return;
  }

  int s1 = doc["s1"]; // 0
  int s2 = doc["s2"]; // 1
  int s3 = doc["s3"]; // 1
  int s4 = doc["s4"]; // 0

  Serial.print(s1);
  Serial.print(s2);
  Serial.print(s3);
  Serial.println(s4);
  Serial.println();
  // Switch on the LED if an 1 was received as first character
  if (s1 == 1) {
    digitalWrite(2, LOW);   // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
  } else {
    digitalWrite(2, HIGH);  // Turn the LED off by making the voltage HIGH
  }
  if (s2 == 1) {
    digitalWrite(0, LOW);   // Turn the LED on (Note that LOW is the voltage level
  } else {
    digitalWrite(0, HIGH);  // Turn the LED off by making the voltage HIGH
  }
  if (s3 == 1) {
    digitalWrite(4, LOW);   // Turn the LED on (Note that LOW is the voltage level
  } else {
    digitalWrite(4, HIGH);  // Turn the LED off by making the voltage HIGH
  }
  if (s4 == 1) {
    digitalWrite(5, LOW);   // Turn the LED on (Note that LOW is the voltage level
  } else {
    digitalWrite(5, HIGH);  // Turn the LED off by making the voltage HIGH
  }

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str(),mqtt_user,mqtt_user)) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("srini91/mqtt/test", "hello world");
      // ... and resubscribe
      client.subscribe("/test/h-auto/switch/#");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
  
  pinMode(2, OUTPUT);     // Initialize the BUILTIN_LED pin as an output
  pinMode(0, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  //  unsigned long now = millis();
  //  if (now - lastMsg > 2000) {
  //    lastMsg = now;
  //    ++value;
  //    snprintf (msg, MSG_BUFFER_SIZE, "hello world #%ld", value);
  //    Serial.print("Publish message: ");
  //    Serial.println(msg);
  //    client.publish("outTopic", msg);
  //  }
}
