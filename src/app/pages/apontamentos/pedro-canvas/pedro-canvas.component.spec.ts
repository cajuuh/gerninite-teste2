import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedroCanvasComponent } from './pedro-canvas.component';

describe('PedroCanvasComponent', () => {
  let component: PedroCanvasComponent;
  let fixture: ComponentFixture<PedroCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedroCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedroCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
