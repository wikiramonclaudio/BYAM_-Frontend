import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinibyamDashboardComponent } from './minibyam-dashboard.component';

describe('MinibyamDashboardComponent', () => {
  let component: MinibyamDashboardComponent;
  let fixture: ComponentFixture<MinibyamDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinibyamDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinibyamDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
