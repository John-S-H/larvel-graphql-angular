import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GET_CONDITIONS, CREATE_CONDITION, UPDATE_CONDITION, DELETE_CONDITION } from '../graphql/graphql.conditions'
import { ActivatedRoute } from '@angular/router';

interface Condition {
  id: number,
  description: string
}

interface CreateConditionMutationData {
  createCondition: Condition;
}

interface UpdateConditionMutationData {
  updateCondition: Condition;
}

@Component({
             selector:    'app-conditions',
             templateUrl: './conditions.component.html',
             styleUrls:   ['./conditions.component.scss']
           })
export class ConditionsComponent implements OnInit {
  conditions: any[]            = [];
  error: any;
  selectedCondition: any;
  showCreateForm: boolean = false;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const conditionId = params['id'];
      if (conditionId) {
        this.selectedCondition = this.conditions.find(condition => condition.id === conditionId);
      }
    });

    this.apollo.watchQuery(
      {
        query: GET_CONDITIONS
      }).valueChanges.subscribe(({data, error}: any) => {
      this.conditions = data.conditions;
      this.error = error;
    });
  }

  createCondition(title: string, description: string) {
    this.apollo.mutate<CreateConditionMutationData>(
      {
        mutation:  CREATE_CONDITION,
        variables: {
          title,
          description
        },
        update:    (cache, {data}) => {
          const newCondition = data?.createCondition;
          if (newCondition) {
            cache.modify(
              {
                fields: {
                  conditions(existingConditions = []) {
                    const newConditionRef = cache.writeFragment(
                      {
                        data:     newCondition,
                        fragment: gql`
                            fragment NewCondition on Condition {
                                id
                                description
                            }
                        `
                      });
                    return [...existingConditions, newConditionRef];
                  }
                }
              });
          }
        }
      }).subscribe();
    this.showCreateForm = false;
  }

  updateCondition(id: string, title: string, description: string) {
    this.apollo.mutate<UpdateConditionMutationData>(
      {
        mutation:  UPDATE_CONDITION,
        variables: {
          id,
          title,
          description
        },
        update:    (cache, {data}) => {
          const updatedCondition = data?.updateCondition;
          if (!updatedCondition) {
            return;
          }
          cache.modify(
            {
              fields: {
                conditions(existingConditions = [], {readField}) {
                  return existingConditions.map((condition: any) => {
                    if (readField('id', condition) === updatedCondition.id) {
                      return {
                        ...condition,
                        ...updatedCondition,
                      };
                    }
                    return condition;
                  });
                },
              },
            });
          this.selectedCondition = null;
        },
      }).subscribe();
  }

  deleteCondition(id: string) {
    this.apollo.mutate(
      {
        mutation:  DELETE_CONDITION,
        variables: {
          id
        },
        update:    (cache, {data}) => {
          const deletedCondition  = id;
          const {conditions}: any = cache.readQuery({query: GET_CONDITIONS});
          const updatedConditions = conditions.filter((condition: any) => condition.id !== deletedCondition);
          cache.writeQuery(
            {
              query: GET_CONDITIONS,
              data:  {
                conditions: updatedConditions
              }
            });
          this.selectedCondition = null;
        }
      }).subscribe();
  }

  selectCondition(condition: any) {
    this.selectedCondition = {...condition};
  }
}

