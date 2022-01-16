import * as internal from 'stream';

export interface AirSensor {
  aqi: number;
  smoke: number;
  temp: number;
  hum: number;
}
