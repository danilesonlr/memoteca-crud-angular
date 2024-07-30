import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarPensamentoComponent } from './listar-pensamento.component';
import { PensamentoService } from '../pensamento.service';
import { Router, RouteReuseStrategy } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock RouteReuseStrategy
class MockRouteReuseStrategy implements RouteReuseStrategy {
  shouldDetach(route: import('@angular/router').ActivatedRouteSnapshot): boolean {
    return false;
  }
  store(route: import('@angular/router').ActivatedRouteSnapshot, handle: import('@angular/router').DetachedRouteHandle | null): void {}
  shouldAttach(route: import('@angular/router').ActivatedRouteSnapshot): boolean {
    return false;
  }
  retrieve(route: import('@angular/router').ActivatedRouteSnapshot): import('@angular/router').DetachedRouteHandle | null {
    return null;
  }
  shouldReuseRoute(future: import('@angular/router').ActivatedRouteSnapshot, current: import('@angular/router').ActivatedRouteSnapshot): boolean {
    return future.routeConfig === current.routeConfig;
  }
}

describe('ListarPensamentoComponent', () => {
  let component: ListarPensamentoComponent;
  let fixture: ComponentFixture<ListarPensamentoComponent>;
  let pensamentoServiceSpy: jasmine.SpyObj<PensamentoService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spies
    pensamentoServiceSpy = jasmine.createSpyObj('PensamentoService', ['listar']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Define mock responses
    pensamentoServiceSpy.listar.and.returnValue(of([
      { id: 1, conteudo: 'Test content 1', autoria: 'Author 1', modelo: 'modelo1', favorito: false },
      { id: 2, conteudo: 'Test content 2', autoria: 'Author 2', modelo: 'modelo2', favorito: true }
    ]));

    await TestBed.configureTestingModule({
      declarations: [ ListarPensamentoComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: PensamentoService, useValue: pensamentoServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: RouteReuseStrategy, useClass: MockRouteReuseStrategy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPensamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the list of pensamentos on init', () => {
    expect(component.listaPensamentos.length).toBe(2);
    expect(component.listaPensamentos[0].conteudo).toBe('Test content 1');
    expect(component.listaPensamentos[1].conteudo).toBe('Test content 2');
  });

  it('should load more pensamentos', () => {
    // Adjust mock response to simulate new data being loaded
    const newPensamentos = [
      { id: 3, conteudo: 'Test content 3', autoria: 'Author 3', modelo: 'modelo3', favorito: false },
      { id: 4, conteudo: 'Test content 4', autoria: 'Author 4', modelo: 'modelo4', favorito: true }
    ];
    pensamentoServiceSpy.listar.and.returnValue(of(newPensamentos));

    component.carregarMaisPensamentos();
    expect(pensamentoServiceSpy.listar).toHaveBeenCalledWith(2, '', false);
    expect(component.listaPensamentos.length).toBe(4); // 2 iniciais + 2 novos
  });

  it('should search for pensamentos', () => {
    component.filtro = 'Author 1';
    component.pesquisarPensamentos();
    expect(pensamentoServiceSpy.listar).toHaveBeenCalledWith(1, 'Author 1', false);
    expect(component.listaPensamentos.length).toBe(2);
  });

  it('should list favorite pensamentos', () => {
    component.listarFavoritos();
    expect(pensamentoServiceSpy.listar).toHaveBeenCalledWith(1, '', true);
    expect(component.listaPensamentos.length).toBe(2);
    expect(component.titulo).toBe('Meus Favoritos');
  });

  /*it('should reload the component', () => {
    // Simulate the method to reload the component
    component.recarragarComponente();
    
    // The `recarragarComponente` method should navigate to the same URL
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/listarPensamento']); // Adjust to expected navigation URL
  });*/
});
