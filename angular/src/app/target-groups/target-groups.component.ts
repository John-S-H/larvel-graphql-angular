import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {
  GET_TARGET_GROUPS,
  CREATE_TARGET_GROUP,
  UPDATE_TARGET_GROUP,
  DELETE_TARGET_GROUP
} from '../graphql/graphql.target-groups';
import { ActivatedRoute } from '@angular/router';

interface TargetGroup {
  id: number,
  title: string
}

interface CreateTargetGroupMutationData {
  createTargetGroup: TargetGroup;
}

interface UpdateTargetGroupMutationData {
  updateTargetGroup: TargetGroup;
}

@Component({
             selector:    'app-target-groups',
             templateUrl: './target-groups.component.html',
             styleUrls:   ['./target-groups.component.scss']
           })
export class TargetGroupsComponent implements OnInit {
  title: string = '';

  targetGroups: any[]     = [];
  error: any;
  selectedTargetGroup: any;
  showCreateForm: boolean = false;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const targetGroupId = params['id'];
      if (targetGroupId) {
        this.selectedTargetGroup = this.targetGroups.find(targetGroup => targetGroup.id === targetGroupId);
      }
    });

    this.apollo.watchQuery(
      {
        query: GET_TARGET_GROUPS
      }).valueChanges.subscribe(({data, error}: any) => {
      this.targetGroups = data.targetGroups;
      this.error        = error;
    });
  }

  createTargetGroup(title: string) {
    this.apollo.mutate<CreateTargetGroupMutationData>(
      {
        mutation:  CREATE_TARGET_GROUP,
        variables: {
          title
        },
        update:    (cache, {data}) => {
          const newTargetGroup = data?.createTargetGroup;
          if (newTargetGroup) {
            cache.modify(
              {
                fields: {
                  targetGroups(existingTargetGroups = []) {
                    const newTargetGroupRef = cache.writeFragment(
                      {
                        data:     newTargetGroup,
                        fragment: gql`
                            fragment NewTargetGroup on TargetGroup {
                                id
                                title
                            }
                        `
                      });
                    return [...existingTargetGroups, newTargetGroupRef];
                  }
                }
              });
          }
        }
      }).subscribe();
    this.showCreateForm = false;
  }

  updateTargetGroup(id: string, title: string) {
    this.apollo.mutate<UpdateTargetGroupMutationData>(
      {
        mutation:  UPDATE_TARGET_GROUP,
        variables: {
          id,
          title
        },
        update:    (cache, {data}) => {
          const updatedTargetGroup = data?.updateTargetGroup;
          if (!updatedTargetGroup) {
            return;
          }
          cache.modify(
            {
              fields: {
                targetGroups(existingTargetGroups = [], {readField}) {
                  return existingTargetGroups.map((targetGroup: any) => {
                    if (readField('id', targetGroup) === updatedTargetGroup.id) {
                      return {
                        ...targetGroup,
                        ...updatedTargetGroup,
                      };
                    }
                    return targetGroup;
                  });
                },
              },
            });
          this.selectedTargetGroup = null;
        },
      }).subscribe();
  }

  deleteTargetGroup(id: string) {
    this.apollo.mutate(
      {
        mutation:  DELETE_TARGET_GROUP,
        variables: {
          id
        },
        update:    (cache, {data}) => {
          const deletedTargetGroup  = id;
          const {targetGroups}: any = cache.readQuery({query: GET_TARGET_GROUPS});
          const updatedTargetGroups = targetGroups.filter((targetGroup: any) => targetGroup.id !== deletedTargetGroup);
          cache.writeQuery({
                             query: GET_TARGET_GROUPS,
                             data:  {
                               targetGroups: updatedTargetGroups
                             }
                           });
          this.selectedTargetGroup = null;
          this.targetGroups        = updatedTargetGroups; // Update local targetGroups array
        }
      }).subscribe();
  }

  selectTargetGroup(targetGroup: any) {
    this.selectedTargetGroup = {...targetGroup};
  }

  getTargetGroups(): void {
    this.apollo
      .watchQuery({ query: GET_TARGET_GROUPS })
      .valueChanges.subscribe(({ data, error }: any) => {
      this.targetGroups = data.targetGroups;
    });
  }

}

