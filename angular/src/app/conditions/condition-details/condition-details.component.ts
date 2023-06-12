import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_CONDITIONS } from '../../graphql/graphql.conditions';
import { GET_CLIENTS } from '../../graphql/graphql.clients';

interface Condition {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector:    'app-condition-details',
  templateUrl: './condition-details.component.html',
  styleUrls:   ['./condition-details.component.scss']
})

export class ConditionDetailsComponent {
  condition: Condition | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const conditionId = params.get('id');
      if (conditionId) {
        this.fetchConditionDetails(parseInt(conditionId));
        console.log('id', conditionId);
      }
      else {
        console.log('no id found');
      }
    });
  }

  fetchConditionDetails(conditionId: number): void {
    this.apollo.watchQuery<{ conditions: Condition[] }>(
      {
        query: GET_CONDITIONS
      }).valueChanges.subscribe(({data}) => {
      const conditions = data.conditions;
      console.log('data', conditions);
      console.log('condition/id', conditionId);
      this.condition = conditions.find(condition => condition.id == conditionId);
    }, error => {
      this.condition = null;
    });
  }

  goBack(): void {
    // You can navigate back to the previous page or any desired route
  }

}
