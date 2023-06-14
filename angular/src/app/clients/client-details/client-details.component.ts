import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { GET_CLIENTS, GET_TARGET_GROUP_NAME, GET_CONDITION_NAME } from '../../graphql/graphql.clients';

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
  targetGroupName: string = '';
  conditionName: string = '';
  responseText: string = '';
  question: string = '';

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const clientId = params.get('id');
      if (clientId) {
        this.fetchClientDetails(parseInt(clientId));
        this.fetchTargetGroupName(clientId);
        this.fetchConditionName(clientId)
      }
      else {
      }
    });
  }

  fetchClientDetails(clientId: number): void {
    this.apollo.watchQuery<{ clients: Client[] }>(
      {
        query: GET_CLIENTS
      }).valueChanges.subscribe(({data}) => {
      const clients = data.clients;
      this.client = clients.find(client => client.id == clientId);
    }, error => {
      this.client = null;
    });
  }

  fetchTargetGroupName(clientId: string): void {
    this.apollo
      .query<any>({
                    query: GET_TARGET_GROUP_NAME,
                    variables: {
                      clientId: clientId
                    }
                  })
      .subscribe(({ data }) => {
        this.targetGroupName = data.client.targetGroup?.title || '';
        this.setQuestion();
      });
  }

  fetchConditionName(clientId: string): void {
    this.apollo
      .query<any>({
                    query: GET_CONDITION_NAME,
                    variables: {
                      clientId: clientId
                    }
                  })
      .subscribe(({ data }) => {
        this.conditionName = data.client.condition?.title || '';
        this.setQuestion();
      });
  }

  setQuestion(): void {
    if (this.targetGroupName && this.conditionName) {
      this.question = `Wat zijn 5 leerzame spellen voor ${this.targetGroupName} met de conditie ${this.conditionName}? In max 50 woorden.`;
    }
  }

  submitQuestion() {
    const apiUrl = 'http://localhost/api/ask/chat-gpt/' + this.question;

    this.http.get(apiUrl).subscribe((response: any) => {
      this.responseText = response[0].text;
    });
  }

  goBack(): void {
  }
}