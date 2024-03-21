import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ClientsListComponent } from './clients/clients-list.component'; 
import { CreateClientComponent } from './clients/create-client.component';
import { ClientDetailsComponent } from './clients/client-details.component'; 
import { CreateInvoiceComponent } from './invoices/create-invoice.component';
import { SupabaseService } from './api/supabase.service';

@NgModule({
  declarations: [
    AppComponent,
    ClientsListComponent,
    CreateClientComponent,
    ClientDetailsComponent,
    CreateInvoiceComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: ClientsListComponent },
      { path: 'create', component: CreateClientComponent },
      { path: ':id', component: ClientDetailsComponent },
      { path: ':id/invoices/add', component: CreateInvoiceComponent },
    ])
  ],
  providers: [
    SupabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
