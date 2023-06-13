import { gql } from "apollo-angular";

const GET_CONDITIONS = gql`
    query GetConditions {
        conditions {
            id
            title
            description
        }
    }
`

export { GET_CONDITIONS };

export const CREATE_CONDITION = gql`
    mutation CreateCondition($title: String!, $description: String!) {
        createCondition(input: { title: $title, description: $description }) {
            id
            title
            description
        }
    }
`;

export const UPDATE_CONDITION = gql`
    mutation UpdateCondition($id: ID!, $title: String!, $description: String!) {
        updateCondition(id: $id, input: { title: $title, description: $description }) {
            id
            title
            description
        }
    }
`;

export const DELETE_CONDITION = gql`
    mutation DeleteCondition($id: ID!) {
        deleteCondition(id: $id) {
            id
            title
            description
        }
    }
`;