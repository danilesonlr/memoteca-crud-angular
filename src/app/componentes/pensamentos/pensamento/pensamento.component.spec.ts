import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PensamentoComponent } from './pensamento.component';
import { PensamentoService } from '../pensamento.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PensamentoComponent', () => {
  let component: PensamentoComponent;
  let fixture: ComponentFixture<PensamentoComponent>;
  let pensamentoServiceStub: Partial<PensamentoService>;

  beforeEach(async () => {
    pensamentoServiceStub = {
      mudarFavorito: jasmine.createSpy('mudarFavorito').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      declarations: [ PensamentoComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: PensamentoService, useValue: pensamentoServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PensamentoComponent);
    component = fixture.componentInstance;
    component.pensamento = {
      id: 1,
      conteudo: 'Test content',
      autoria: 'Author',
      modelo: 'modelo1',
      favorito: false
    };
    component.listaFavoritos = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return "pensamento-g" if conteudo length is greater than or equal to 256', () => {
    component.pensamento.conteudo = 'a'.repeat(256);
    expect(component.larguraPensamento()).toBe('pensamento-g');
  });

  it('should return "pensamento-p" if conteudo length is less than 256', () => {
    component.pensamento.conteudo = 'a'.repeat(255);
    expect(component.larguraPensamento()).toBe('pensamento-p');
  });

  it('should return "ativo" if pensamento.favorito is true', () => {
    component.pensamento.favorito = true;
    expect(component.mudarIconeFavorito()).toBe('ativo');
  });

  it('should return "inativo" if pensamento.favorito is false', () => {
    component.pensamento.favorito = false;
    expect(component.mudarIconeFavorito()).toBe('inativo');
  });

  it('should call mudarFavorito and update listaFavoritos on atualizarFavoritos', () => {
    component.listaFavoritos = [component.pensamento];
    component.atualizarFavoritos();
    expect(pensamentoServiceStub.mudarFavorito).toHaveBeenCalledWith(component.pensamento);
    expect(component.listaFavoritos).not.toContain(component.pensamento);
  });
});
