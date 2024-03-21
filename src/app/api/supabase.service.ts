// src/app/api/supabase.service.ts
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";

const SUPABASE_URL = 'https://umeevsmrcsnstxwapepi.supabase.co/rest/v1';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZWV2c21yY3Nuc3R4d2FwZXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2NzkxNTgsImV4cCI6MjAyNjI1NTE1OH0.QFURR-PLMvNm_oR-xE0w54HScyQfSzRUUTxLIn-6HOg';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  constructor(private http: HttpClient) { }

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${SUPABASE_URL}/clients`, {
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_API_KEY
      }
    });
  }

  getClientById(id: number): Observable<any> {
    return this.http.get<any>(`${SUPABASE_URL}/clients?id=eq.${id}`, {
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_API_KEY
      }
    });
  }

  createClient(clientData: any): Observable<any> {
    return this.http.post<any>(`${SUPABASE_URL}/clients`, clientData, {
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_API_KEY
      }
    });
  }

  createInvoice(invoiceData: any): Observable<any> {
    return this.http.post<any>(`${SUPABASE_URL}/invoices`, invoiceData, {
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_API_KEY
      }
    }).pipe(
      catchError(this.handleError)
    );
  }  

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  getInvoicesForClient(clientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${SUPABASE_URL}/invoices?clientid=eq.${clientId}`, {
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_API_KEY
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  
}
