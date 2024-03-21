import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { SupabaseService } from '../api/supabase.service';
import { ClientDetailsComponent } from './client-details.component';

describe('ClientDetailsComponent', () => {
  let component: ClientDetailsComponent;
  let fixture: ComponentFixture<ClientDetailsComponent>;
  let supabaseServiceSpy: jasmine.SpyObj<SupabaseService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SupabaseService', ['getClientById', 'getInvoicesForClient']);
    await TestBed.configureTestingModule({
      declarations: [ClientDetailsComponent],
      providers: [
        { provide: SupabaseService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(convertToParamMap({ id: '1' }))
          }
        }
      ]
    }).compileComponents();
  
    supabaseServiceSpy = TestBed.inject(SupabaseService) as jasmine.SpyObj<SupabaseService>;
  });  

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load invoices', fakeAsync(() => {
    const mockInvoices = [{ id: 1, amount: 100 }, { id: 2, amount: 200 }];
    supabaseServiceSpy.getInvoicesForClient.and.returnValue(of(mockInvoices));

    component.loadInvoices(1);
    tick();

    expect(component.invoices).toEqual(mockInvoices);
  }));

});
