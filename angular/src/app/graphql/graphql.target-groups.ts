import { gql } from "apollo-angular";

const GET_TARGET_GROUPS = gql`
    query GetTargetGroups {
        targetGroups {
            id
            title
        }
    }
`

export { GET_TARGET_GROUPS };

export const CREATE_TARGET_GROUP = gql`
    mutation CreateTargetGroup($title: String!) {
        createTargetGroup(input: { title: $title }) {
            id
            title
        }
    }
`;

export const UPDATE_TARGET_GROUP = gql`
    mutation UpdateTargetGroup($id: ID!, $title: String!) {
        updateTargetGroup(id: $id, input: { title: $title }) {
            id
            title
        }
    }
`;

export const DELETE_TARGET_GROUP = gql`
    mutation DeleteTargetGroup($id: ID!) {
        deleteTargetGroup(id: $id) {
            id
            title
        }
    }
`;