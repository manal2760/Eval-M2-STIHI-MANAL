import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../api/supabase.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  clients: any[] = [];
  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.supabaseService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }
}
