import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackDoneComponent } from './callback-done.component';

describe('CallbackDoneComponent', () => {
  let component: CallbackDoneComponent;
  let fixture: ComponentFixture<CallbackDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallbackDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
