import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendimentoComponent } from './rendimento.component';

describe('RendimentoComponent', () => {
  let component: RendimentoComponent;
  let fixture: ComponentFixture<RendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendimentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
