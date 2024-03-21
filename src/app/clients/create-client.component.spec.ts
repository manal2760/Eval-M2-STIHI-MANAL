import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SupabaseService } from '../api/supabase.service';
import { CreateClientComponent } from './create-client.component';

describe('CreateClientComponent', () => {
  let component: CreateClientComponent;
  let fixture: ComponentFixture<CreateClientComponent>;
  let supabaseServiceSpy: jasmine.SpyObj<SupabaseService>;
  let router: Router;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SupabaseService', ['createClient']);
    await TestBed.configureTestingModule({
      declarations: [CreateClientComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: SupabaseService, useValue: spy }]
    }).compileComponents();
    supabaseServiceSpy = TestBed.inject(SupabaseService) as jasmine.SpyObj<SupabaseService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form is invalid', () => {
    spyOn(router, 'navigate');
    component.onSubmit();
    expect(supabaseServiceSpy.createClient).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should submit if form is valid', () => {
    const clientData = { fullname: 'John Doe', email: 'john@example.com' };
    spyOn(router, 'navigate');
    supabaseServiceSpy.createClient.and.returnValue(of(clientData));
    component.clientForm.patchValue(clientData);
    component.onSubmit();
    expect(supabaseServiceSpy.createClient).toHaveBeenCalledWith(clientData);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
