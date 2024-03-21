import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../api/supabase.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  clientId: number = 0; 
  client: any;
  invoices: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clientId = params['id'];
      this.loadClientDetails();
      this.loadInvoices(this.clientId);
    });
  }

  loadClientDetails() {
    this.supabaseService.getClientById(this.clientId).subscribe(client => {
      this.client = client[0];
      this.loadInvoices(this.clientId);
    });
  }

  loadInvoices(clientId: number) {
    this.supabaseService.getInvoicesForClient(clientId).subscribe(
      invoices => {
        this.invoices = invoices;
      },
      error => {
        console.error('Error loading invoices:', error);
      }
    );
  }
}
