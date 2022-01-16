import { TestBed } from '@angular/core/testing';

import { HMqttService } from './h-mqtt.service';

describe('HMqttService', () => {
  let service: HMqttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HMqttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
