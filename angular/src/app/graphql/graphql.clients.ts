import { gql } from "apollo-angular";

const GET_CLIENTS = gql`
    query GetClients {
        clients {
            id
            first_name
            last_name
            age
            height
            weight
            email
            company
            information
        }
    }
`

export { GET_CLIENTS };

export const CREATE_CLIENT = gql`
    mutation CreateClient($first_name: String!, $last_name: String!, $email: String!, $age: String!, $height: String!, $weight: String!, $company: String!, $information: String!, $target_group_id: String!, $condition_id: String!) {
        createClient(input: { first_name: $first_name, last_name: $last_name, email: $email, age: $age, height: $height, weight: $weight, company: $company, information: $information, target_group_id: $target_group_id, condition_id: $condition_id }) {
            id
            first_name
            last_name
            email
            age
            height
            weight
            company
            information
            target_group_id
            condition_id
        }
    }
`;

export const UPDATE_CLIENT = gql`
    mutation UpdateClient(
        $id: ID!, 
        $first_name: String!, 
        $last_name: String!, 
        $age: String!, 
        $height: String!, 
        $weight: String!, 
        $email: String!, 
        $company: String!, 
        $information: String!
        $target_group_id: String!
        $condition_id: String!
    ) {
        updateClient(
            id: $id, 
            input: { 
                first_name: $first_name, 
                last_name: $last_name, 
                age: $age, 
                height: $height, 
                weight: $weight, 
                email: $email, 
                company: $company, 
                information: $information
                target_group_id: $target_group_id
                condition_id: $condition_id
            }) {
            id
            first_name
            last_name
            age
            height
            weight
            email
            company
            information
        }
    }
`;

export const DELETE_CLIENT = gql`
    mutation DeleteClient($id: ID!) {
        deleteClient(id: $id) {
            id
            first_name
            last_name
            age
            height
            weight
            email
            company
            information
        }
    }
`;