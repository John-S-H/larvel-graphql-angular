import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_CLIENTS } from '../../graphql/graphql.clients';

interface Client {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  age: string;
  height: string;
  weight: string;
  company: string;
  information: string;
}

@Component({
             selector:    'app-client-details',
             templateUrl: './client-details.component.html',
             styleUrls:   ['./client-details.component.scss']
           })
export class ClientDetailsComponent implements OnInit {
  client: Client | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const clientId = params.get('id');
      if (clientId) {
        this.fetchClientDetails(parseInt(clientId));
        console.log('id', clientId);
      }
      else {
        console.log('no id found');
      }
    });
  }

  fetchClientDetails(clientId: number): void {
    this.apollo.watchQuery<{ clients: Client[] }>(
      {
        query: GET_CLIENTS
      }).valueChanges.subscribe(({data}) => {
      const clients = data.clients;
      console.log('data', clients);
      console.log('client/id', clientId);
      this.client = clients.find(client => client.id == clientId);
    }, error => {
      this.client = null;
    });
  }

  goBack(): void {
    // You can navigate back to the previous page or any desired route
  }
}