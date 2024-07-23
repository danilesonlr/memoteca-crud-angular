import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPensamentoComponent } from './editar-pensamento.component';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { convertToParamMap, ActivatedRouteSnapshot } from '@angular/router';

describe('EditarPensamentoComponent', () => {
  let component: EditarPensamentoComponent;
  let fixture: ComponentFixture<EditarPensamentoComponent>;
  let pensamentoServiceStub: Partial<PensamentoService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: Partial<ActivatedRoute>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    pensamentoServiceStub = {
      buscarPorId: jasmine.createSpy('buscarPorId').and.returnValue(of({
        id: 1,
        conteudo: 'Test content',
        autoria: 'Author',
        modelo: 'modelo1',
        favorito: false
      })),
      editar: jasmine.createSpy('editar').and.returnValue(of({}))
    };

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    const snapshot: ActivatedRouteSnapshot = {
      url: [],
      params: {},
      queryParams: {},
      fragment: null,
      data: {},
      outlet: 'primary',
      component: null,
      routeConfig: null,
      root: {} as any,
      parent: null,
      firstChild: null,
      children: [],
      pathFromRoot: [],
      paramMap: convertToParamMap({ id: '1' }),
      queryParamMap: convertToParamMap({})
    };

    activatedRouteStub = {
      snapshot
    };

    await TestBed.configureTestingModule({
      declarations: [ EditarPensamentoComponent ],
      imports: [ 
        HttpClientTestingModule,
        ReactiveFormsModule 
      ],
      providers: [
        { provide: PensamentoService, useValue: pensamentoServiceStub },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        FormBuilder // Adicione o FormBuilder aos provedores
      ]
    })
    .compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPensamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the pensamento with data from the service', () => {
    expect(component.formulario).toBeDefined();
    expect(component.formulario.get('conteudo')?.value).toBe('Test content');
    expect(component.formulario.get('autoria')?.value).toBe('Author');
    expect(component.formulario.get('modelo')?.value).toBe('modelo1');
    expect(component.formulario.get('favorito')?.value).toBe(false);
  });

  it('should call the editar method and navigate on success', () => {
    component.editarPensamento();

    expect(pensamentoServiceStub.editar).toHaveBeenCalledWith(component.formulario.value);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/listarPensamento']);
  });

  it('should navigate on cancelar', () => {
    component.cancelar();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/listarPensamento']);
  });

  it('should return the correct button class', () => {
    component.formulario.get('conteudo')?.setValue('Test content');
    component.formulario.get('autoria')?.setValue('Author');
    expect(component.habilitarBotao()).toBe('botao');
    component.formulario.get('conteudo')?.setValue('');
    expect(component.habilitarBotao()).toBe('botao__desabilitado');
  });
});
