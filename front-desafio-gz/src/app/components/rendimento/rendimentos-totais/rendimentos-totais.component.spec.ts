import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendimentosTotaisComponent } from './rendimentos-totais.component';

describe('RendimentosTotaisComponent', () => {
  let component: RendimentosTotaisComponent;
  let fixture: ComponentFixture<RendimentosTotaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendimentosTotaisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RendimentosTotaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
