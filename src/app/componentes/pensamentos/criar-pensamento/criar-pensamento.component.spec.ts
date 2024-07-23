import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarPensamentoComponent } from './criar-pensamento.component';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CriarPensamentoComponent', () => {
  let component: CriarPensamentoComponent;
  let fixture: ComponentFixture<CriarPensamentoComponent>;
  let pensamentoServiceStub: Partial<PensamentoService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    pensamentoServiceStub = {
      criar: jasmine.createSpy('criar').and.returnValue(of({}))
    };

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ CriarPensamentoComponent ],
      imports: [ ReactiveFormsModule, HttpClientTestingModule ],
      providers: [
        { provide: PensamentoService, useValue: pensamentoServiceStub },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarPensamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.formulario).toBeDefined();
    expect(component.formulario.controls['conteudo']).toBeDefined();
    expect(component.formulario.controls['autoria']).toBeDefined();
    expect(component.formulario.controls['modelo']).toBeDefined();
    expect(component.formulario.controls['favorito']).toBeDefined();
  });

  it('should create a pensamento and navigate on success', () => {
    component.formulario.setValue({
      conteudo: 'Test content',
      autoria: 'Author',
      modelo: 'modelo1',
      favorito: false
    });

    component.criarPensamento();

    expect(pensamentoServiceStub.criar).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/listarPensamento']);
  });

  it('should not create a pensamento if the form is invalid', () => {
    component.formulario.setValue({
      conteudo: '',
      autoria: '',
      modelo: 'modelo1',
      favorito: false
    });

    component.criarPensamento();

    expect(pensamentoServiceStub.criar).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate on cancelarPensamento', () => {
    component.cancelarPensamento();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/listarPensamento']);
  });

  it('should return correct button class based on form validity', () => {
    component.formulario.setValue({
      conteudo: 'Test content',
      autoria: 'Author',
      modelo: 'modelo1',
      favorito: false
    });
    expect(component.habilitarBotao()).toBe('botao');

    component.formulario.setValue({
      conteudo: '',
      autoria: '',
      modelo: 'modelo1',
      favorito: false
    });
    expect(component.habilitarBotao()).toBe('botao__desabilitado');
  });
});
