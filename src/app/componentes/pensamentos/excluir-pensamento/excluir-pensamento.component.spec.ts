import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExcluirPensamentoComponent } from './excluir-pensamento.component';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ParamMap, convertToParamMap } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('ExcluirPensamentoComponent', () => {
  let component: ExcluirPensamentoComponent;
  let fixture: ComponentFixture<ExcluirPensamentoComponent>;
  let pensamentoServiceStub: Partial<PensamentoService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(async () => {
    pensamentoServiceStub = {
      buscarPorId: jasmine.createSpy('buscarPorId').and.returnValue(of({
        id: 1,
        conteudo: 'Test content',
        autoria: 'Author',
        modelo: 'modelo1',
        favorito: false
      })),
      excluir: jasmine.createSpy('excluir').and.returnValue(of({}))
    };

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    const snapshot: Partial<ActivatedRouteSnapshot> = {
      paramMap: convertToParamMap({ id: '1' })
    };

    activatedRouteStub = {
      snapshot: snapshot as ActivatedRouteSnapshot
    };

    await TestBed.configureTestingModule({
      declarations: [ ExcluirPensamentoComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: PensamentoService, useValue: pensamentoServiceStub },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluirPensamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the pensamento with data from the service', () => {
    expect(component.pensamento).toBeDefined();
    expect(component.pensamento.id).toBe(1);
    expect(component.pensamento.conteudo).toBe('Test content');
    expect(component.pensamento.autoria).toBe('Author');
    expect(component.pensamento.modelo).toBe('modelo1');
    expect(component.pensamento.favorito).toBe(false);
  });

  it('should call the excluir method and navigate on success', () => {
    component.excluirPensamento();

    expect(pensamentoServiceStub.excluir).toHaveBeenCalledWith(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/listarPensamento']);
  });

  it('should not call the excluir method if id is not present', () => {
    component.pensamento.id = 0;

    component.excluirPensamento();

    expect(pensamentoServiceStub.excluir).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate on cancelar', () => {
    component.cancelar();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/listarPensamento']);
  });
});
