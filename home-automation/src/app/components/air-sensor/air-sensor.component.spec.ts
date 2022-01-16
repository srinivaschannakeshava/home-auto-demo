import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirSensorComponent } from './air-sensor.component';

describe('AirSensorComponent', () => {
  let component: AirSensorComponent;
  let fixture: ComponentFixture<AirSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirSensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
