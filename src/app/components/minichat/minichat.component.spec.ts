import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinichatComponent } from './minichat.component';

describe('MinichatComponent', () => {
  let component: MinichatComponent;
  let fixture: ComponentFixture<MinichatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinichatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinichatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
