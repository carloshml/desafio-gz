import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedGraficosComponent } from './red-graficos.component';

describe('RedGraficosComponent', () => {
  let component: RedGraficosComponent;
  let fixture: ComponentFixture<RedGraficosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedGraficosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedGraficosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
