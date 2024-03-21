import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ClientsListComponent } from './clients-list.component';
import { SupabaseService } from '../api/supabase.service';
import { of } from 'rxjs';

describe('ClientsListComponent', () => {
  let component: ClientsListComponent;
  let fixture: ComponentFixture<ClientsListComponent>;
  let supabaseServiceSpy: jasmine.SpyObj<SupabaseService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SupabaseService', ['getClients']);

    await TestBed.configureTestingModule({
      declarations: [ClientsListComponent],
      providers: [{ provide: SupabaseService, useValue: spy }]
    })
    .compileComponents();

    supabaseServiceSpy = TestBed.inject(SupabaseService) as jasmine.SpyObj<SupabaseService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load clients', () => {
    const mockClients = [{ id: 1, fullname: 'John Doe', email: 'john@example.com' }];
    supabaseServiceSpy.getClients.and.returnValue(of(mockClients));

    component.loadClients();

    expect(component.clients).toEqual(mockClients as any); 
  });
});
