import { Component, OnInit } from '@angular/core';
import { AirSensor } from 'src/app/models/air-sensor';
import { HMqttService } from 'src/app/services/h-mqtt.service';

@Component({
  selector: 'app-air-sensor',
  templateUrl: './air-sensor.component.html',
  styleUrls: ['./air-sensor.component.scss'],
})
export class AirSensorComponent implements OnInit {
  options: any;
  runningChartOption: any;
  tempChartOption: any;

  private oneDay = 24 * 3600 * 1000;
  private now!: Date;
  private value!: number;
  private data: any[] = [];
  private timer: any;
  options2: any;
  data2 = 20;

  private tempData: number = 20;

  constructor(private _mqttService: HMqttService) {}

  ngOnInit(): void {
    this._mqttService.airSensorData.subscribe((data) => {
      try {
        let temp = JSON.parse(data);
        this.tempData = temp.temp;
        console.log(temp);
        // this.data.shift();
        this.data.push(this.getAqiChartData(temp.aqi));
      } catch (err) {}

      this.tempChartOption = {
        series: [
          {
            data: [
              {
                value: this.tempData,
              },
            ],
          },
          {
            data: [
              {
                value: this.tempData,
              },
            ],
          },
        ],
      };

      this.runningChartOption = {
        series: [
          {
            data: this.data,
          },
        ],
      };
    });
    // generate some random testing data:
    this.data = [];
    // this.now = new Date(1997, 9, 3);
    // this.value = Math.random() * 1000;

    // for (let i = 0; i < 1000; i++) {
    //   this.data.push(this.randomData());
    // }

    // initialize chart options:
    this.options = {
      title: {
        text: 'AQI Data + Time Axis',
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          const date = new Date(params.name);
          return (
            date.getFullYear() +
            '/' +
            date.getMonth() +
            1 +
            '/' +
            date.getDate() +
            '-' +
            date.getHours() +
            ':' +
            date.getMinutes() +
            ':' +
            date.getSeconds() +
            ' : ' +
            params.value[1]+ 'PPM'
          );
        },
        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: 'AQI Data',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.data,
        },
      ],
    };

    this.options2 = {
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
            color: '#FFAB91',
          },
          progress: {
            show: true,
            width: 30,
          },

          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 30,
            },
          },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: {
              width: 3,
              color: '#999',
            },
          },
          axisLabel: {
            distance: -20,
            color: '#999',
            fontSize: 20,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 60,
            fontWeight: 'bolder',
            formatter: '{value} °C',
            color: 'auto',
          },
          data: [
            {
              value: 20,
            },
          ],
        },

        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
            color: '#FD7347',
          },
          progress: {
            show: true,
            width: 8,
          },

          pointer: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          detail: {
            show: false,
          },
          data: [
            {
              value: 20,
            },
          ],
        },
      ],
    };
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  getAqiChartData(aqiValue: number) {
    this.now = new Date();
    return {
      name: this.now.toString(),
      value: [this.now.getTime(), aqiValue],
    };
  }
}
