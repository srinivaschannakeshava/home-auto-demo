import { Component, OnInit } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { HMqttService } from 'src/app/services/h-mqtt.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  private message!: string;
  private topic:string="/kiran/h-auto/switch"


  private switchMap:any={s1:0,s2:0,s3:0,s4:0}

  constructor(private _mqttService: HMqttService) {
  }

  ngOnInit(): void {
    this._mqttService.ngOnInit()
  }

  private publishSwitchData(message: string): void {
    this._mqttService.publishSwitchData(message);
  }




  onChangeEvent(event:any){
    let switchKey=Object.keys(event)[0];
    this.switchMap[switchKey]=event[switchKey];
    console.log(this.switchMap);
    this.publishSwitchData(JSON.stringify(this.switchMap));
  }

}


interface SwitchConf{
  S1:number;
  S2:number;
  S3:number;
  S4:number
}
