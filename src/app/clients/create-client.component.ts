import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../api/supabase.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private supabaseService: SupabaseService
  ) { }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (!this.clientForm) { // Check if clientForm is defined
      return;
    }

    if (this.clientForm.invalid) {
      return;
    }

    this.supabaseService.createClient(this.clientForm.value)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
