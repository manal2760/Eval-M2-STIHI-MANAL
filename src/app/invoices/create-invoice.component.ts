import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../api/supabase.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {
  private _clientId: number = 0; 
  invoiceForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._clientId = +params['id'];
    });

    this.invoiceForm = this.formBuilder.group({
      amount: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  set clientId(value: number) {
    this._clientId = value;
  }

  onSubmit() {
    if (this.invoiceForm.invalid) {
      return;
    }

    const invoiceData = {
      clientid: this._clientId,
      amount: this.invoiceForm.value.amount,
      status: this.invoiceForm.value.status
    };

    this.supabaseService.createInvoice(invoiceData)
      .subscribe((invoice: any) => { 
        this.router.navigate(['/', this._clientId]);
      });
  }
}
