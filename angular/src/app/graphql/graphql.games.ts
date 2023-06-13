import { gql } from "apollo-angular";

const GET_GAMES = gql`
    query GetGames {
        games {
            id
            title
            description
        }
        clients {
            id
            first_name
        }
    }
`

export { GET_GAMES };

// export const CREATE_GAME = gql`
//     mutation CreateGame($title: String!, $description: String!) {
//         createGame(input: { title: $title, description: $description }) {
//             id
//             title
//             description
//         }
//     }
// `;

export const CREATE_GAME = gql`
    mutation CreateGame($title: String!, $description: String!) {
        createGame(input: { title: $title, description: $description }) {
            id
            title
            description
        }
    }
`;

export const UPDATE_GAME = gql`
    mutation UpdateGame($id: ID!, $title: String!, $description: String!) {
        updateGame(id: $id, input: { title: $title, description: $description }) {
            id
            title
            description
        }
    }
`;

export const DELETE_GAME = gql`
    mutation DeleteGame($id: ID!) {
        deleteGame(id: $id) {
            id
            title
            description
        }
    }
`;