import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GET_CLIENTS, CREATE_CLIENT, UPDATE_CLIENT, DELETE_CLIENT } from '../graphql/graphql.clients';
import { GET_TARGET_GROUPS } from '../graphql/graphql.target-groups';

interface Client {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  age: string,
  height: string,
  weight: string,
  company: string,
  information: string,
  target_group_id: number
}

interface CreateClientMutationData {
  createClient: Client;
}

interface UpdateClientMutationData {
  updateClient: Client;
}

@Component({
             selector:    'app-clients',
             templateUrl: './clients.component.html',
             styleUrls:   ['./clients.component.scss']
           })
export class ClientsComponent implements OnInit {
  clients: any[]          = [];
  error: any;
  selectedClient: any;
  showCreateForm: boolean = false;
  targetGroupsOptions: any[]     = [];
  targetGroup: string = '';

  constructor(
    private apollo: Apollo,
  ) {
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }

  loadTargetGroups(): void {
    this.apollo
      .watchQuery({query: GET_TARGET_GROUPS})
      .valueChanges.subscribe(({data, error}: any) => {
      this.targetGroupsOptions = data.targetGroups;
      console.log('test', this.targetGroupsOptions);
    });
  }

  ngOnInit(): void {
    this.loadTargetGroups();
    this.apollo.watchQuery(
      {
        query: GET_CLIENTS
      }).valueChanges.subscribe(({data, error}: any) => {
      this.clients = data.clients;
      this.error   = error;
    });
  }


  createClient(first_name: string, last_name: string, email: string, age: string, height: string, weight: string, company: string, information: string, target_group_id: string) {
    this.apollo.mutate<CreateClientMutationData>(
      {
        mutation:  CREATE_CLIENT,
        variables: {
          first_name,
          last_name,
          email,
          age,
          height,
          weight,
          company,
          information,
          target_group_id
        },
        update:    (cache, {data}) => {
          const newClient = data?.createClient;
          if (newClient) {
            cache.modify(
              {
                fields: {
                  clients(existingClients = []) {
                    const newClientRef = cache.writeFragment(
                      {
                        data:     newClient,
                        fragment: gql`
                            fragment NewClient on Client {
                                id
                                first_name,
                                last_name,
                                email,
                                age,
                                height,
                                weight,
                                company,
                                information,
                                target_group_id
                            }
                        `
                      });
                    return [...existingClients, newClientRef];
                  }
                }
              });
          }
        }
      }).subscribe();
  }

  updateClient(id: string, first_name: string, last_name: string, email: string, age: string, height: string, weight: string, company: string, information: string, target_group_id: string) {

    this.apollo.mutate<UpdateClientMutationData>(
      {
        mutation:  UPDATE_CLIENT,
        variables: {
          id,
          first_name,
          last_name,
          email,
          age,
          height,
          weight,
          company,
          information,
          target_group_id
        },
        update:    (cache, {data}) => {
          const updatedClient = data?.updateClient;
          if (!updatedClient) {
            return;
          }
          cache.modify(
            {
              fields: {
                clients(existingClients = [], {readField}) {
                  return existingClients.map((client: any) => {
                    if (readField('id', client) === updatedClient.id) {
                      return {
                        ...client,
                        ...updatedClient,
                      };
                    }
                    return client;
                  });
                },
              },
            });
          this.selectedClient = null;
        },
      }).subscribe();
    this.showCreateForm = false;
  }

  deleteClient(id: string) {
    this.apollo.mutate(
      {
        mutation:  DELETE_CLIENT,
        variables: {
          id
        },
        update:    (cache, {data}) => {
          const deletedClient  = id;
          const {clients}: any = cache.readQuery({query: GET_CLIENTS});
          const updatedClients = clients.filter((client: any) => client.id !== deletedClient);
          cache.writeQuery({
                             query: GET_CLIENTS,
                             data:  {
                               clients: updatedClients
                             }
                           });
          this.selectedClient = null; // reset the selected client
        }
      }).subscribe();
  }

  selectClient(client: any) {
    this.selectedClient = {...client};
  }
}