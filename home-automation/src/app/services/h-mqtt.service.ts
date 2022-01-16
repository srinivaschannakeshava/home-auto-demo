import { Injectable, OnInit } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { AirSensor } from '../models/air-sensor';

@Injectable({
  providedIn: 'root'
})
export class HMqttService implements OnInit {

  private switchPubTopicpic:string="/kiran/h-auto/switch"
  private switchSubTopic:string="/kiran/h-auto/switch/#"
  private cameraSubTopic:string="kiran/h-auto/camera/#"
  private aqiSubTopic:string="kiran/h-auto/air-sensor/#"

  private switchSubscription!: Subscription;
  private cameraSubscription!: Subscription;
  private aqiSubscription!: Subscription;

  public airSensorData:BehaviorSubject<any>=new BehaviorSubject<any>({});

  public cameraSensorData:Subject<string>=new Subject<string>();

  constructor(private _mqttService: MqttService) { }

  ngOnInit(): void {
    console.log("init mqtt subscribtion");

    this.switchSubscription=this._mqttService.observe(this.switchSubTopic).subscribe((message: IMqttMessage) => {
      console.log(message.payload.toString() );
    });
    this.cameraSubscription=this._mqttService.observe(this.cameraSubTopic).subscribe((message: IMqttMessage) => {
      console.log(message.payload.toString() );
      this.cameraSensorData.next(message.payload.toString());
    });
    this.aqiSubscription=this._mqttService.observe(this.aqiSubTopic).subscribe((message: IMqttMessage) => {
      console.log(message.payload.toString() );
      this.airSensorData.next(message.payload.toString());
    });
  }

  ngOnDestroy() {
    console.log("destroy mqtt subscribtion");

    this.switchSubscription.unsubscribe();
    this.cameraSubscription.unsubscribe();
    this.aqiSubscription.unsubscribe();
  }

  public publishSwitchData(message: string): void {
    this._mqttService.unsafePublish(this.switchPubTopicpic, message, {qos: 1, retain: true});
  }

}
