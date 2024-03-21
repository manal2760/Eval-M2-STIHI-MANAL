import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SupabaseService } from '../api/supabase.service';
import { CreateInvoiceComponent } from './create-invoice.component';

describe('CreateInvoiceComponent', () => {
  let component: CreateInvoiceComponent;
  let fixture: ComponentFixture<CreateInvoiceComponent>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SupabaseService', ['createInvoice']);
    await TestBed.configureTestingModule({
      declarations: [CreateInvoiceComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: SupabaseService, useValue: spy },
        { provide: ActivatedRoute, useValue: { params: of(convertToParamMap({ id: '1' })) } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form is invalid', () => {
    component.onSubmit();
    expect(component.invoiceForm.invalid).toBe(true);
  });

  it('should submit if form is valid', () => {
    const invoiceData = { amount: 100, status: 'PAID' };
    const supabaseServiceSpy = TestBed.inject(SupabaseService) as jasmine.SpyObj<SupabaseService>;
    supabaseServiceSpy.createInvoice.and.returnValue(of({}));
    const component = fixture.componentInstance;
    component.clientId = 1;
    fixture.detectChanges();
    component.invoiceForm.patchValue(invoiceData);
    component.onSubmit();
    expect(supabaseServiceSpy.createInvoice).toHaveBeenCalledWith({ clientid: 1, ...invoiceData });
  });
  
});
