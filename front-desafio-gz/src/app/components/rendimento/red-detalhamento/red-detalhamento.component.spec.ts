import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedDetalhamentoComponent } from './red-detalhamento.component';

describe('RedDetalhamentoComponent', () => {
  let component: RedDetalhamentoComponent;
  let fixture: ComponentFixture<RedDetalhamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedDetalhamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedDetalhamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
