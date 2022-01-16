import time
import os
from picamera import PiCamera
from ftplib import FTP
from time import sleep
from gpiozero import MotionSensor
import paho.mqtt.client as paho
import httplib2

#set as per the server properties
# check all the properties set before running

broker="******"
port=1883
camera = PiCamera()
http=httplib2.Http()

while True:
   resp = http.request("http://www.google.com")[0]
   print(resp.status)
   if(resp.status==200):
      print("Internet Connected")
      break
   print("No Internet")
   time.sleep(5)

def on_publish(client,userdata,result):            
    print("data published \n")

def on_log(client, userdata, level, buf):
    print("log: ",buf)
    
def on_connect(client, userdata, flags, rc):
    print("Connection returned result: "+connack_string(rc))

def on_disconnect(client, userdata, rc):
    if rc != 0:
        print("Unexpected disconnection.")



	
mqttClient= paho.Client("testMqttPyClient-PiZero")                          
mqttClient.on_publish = on_publish  
# set properties of mqtt client      
mqttClient.username_pw_set('****','*****')
mqttClient.on_log=on_log
mqttClient.on_connect = on_connect
mqttClient.on_disconnect = on_disconnect

                                
# set the properties as per your servers
ftpHost = "**.***.***"
ftpUser = "******"
ftpPwd = "*******"

lastCapture=time.time()
pir = MotionSensor(4)


def on_motion_detection():
   try:
        timestamp=str(int(time.time()))
        imageFile='/home/pi/images/'+timestamp+'.jpg'
        camera.start_preview()
        sleep(3)
        camera.capture(imageFile)
        camera.stop_preview()

        fileNamePath='test/'+timestamp+'.img'

        # Read file in binary mode
        with FTP(ftpHost, ftpUser, ftpPwd) as ftp, open(imageFile, 'rb') as file:
                ftp.storbinary(f'STOR {fileNamePath}', file)
        mqttClient.connect(broker,port,3600) 
        mqttClient.publish("test/h-auto/camera",fileNamePath) 
        os.remove(imageFile)
   except Exception as e:
        print(e)

while True :
    pir.wait_for_motion()
    on_motion_detection()
    time.sleep(15)
   
