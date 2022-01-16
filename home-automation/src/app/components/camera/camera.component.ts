import { Component, OnInit } from '@angular/core';
import { MqttService } from 'ngx-mqtt';
import { HMqttService } from 'src/app/services/h-mqtt.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {
  public imagePath!:String;
  public timestamp!:number;

  public imageList:ImageDataMap={
    1:{
      imagePath:'',
      timestamp:0
  },
  2:{
    imagePath:'',
    timestamp:0
  },
  3:{
    imagePath:'',
    timestamp:0
  }

};

  constructor(private _mqttServ:HMqttService) { }

  ngOnInit(): void {
    this._mqttServ.cameraSensorData.subscribe(data=>{
      console.log(data);

      this.pushToImageList(data)
      // this.imagePath="http://103.87.128.78:8082/"+data;
      // this.timestamp= parseInt(data.substring(6,16))
    })
  }

  pushToImageList(data:any){
    this.imageList[4]=this.imageList[3];
      this.imageList[3]=this.imageList[2];
      this.imageList[2]=this.imageList[1];
      this.imageList[1]={
        imagePath: "http://103.87.128.78:8082/"+data,
        timestamp: parseInt(data.substring(6,16))
      };
  }

}

export interface ImageData{
  imagePath:String;
  timestamp:number;
}

export interface ImageDataMap{
 [key:number]:ImageData;
}
