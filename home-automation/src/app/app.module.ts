import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwitchComponent } from './components/switch/switch.component';
import { AirSensorComponent } from './components/air-sensor/air-sensor.component';
import { CameraComponent } from './components/camera/camera.component';
import { HomeComponent } from './home/home.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'rabbitmq.alemari.in',
  port: 32675,
  path: '/ws',
  username: 'mqtt-ws',
  password: 'mqtt-ws'
};

@NgModule({
  declarations: [
    AppComponent,
    SwitchComponent,
    AirSensorComponent,
    CameraComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts:()=> import('echarts')
    }),
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    UiSwitchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
