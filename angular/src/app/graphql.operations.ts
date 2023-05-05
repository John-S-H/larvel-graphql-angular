import { gql } from "apollo-angular";

const GET_POSTS = gql`
    query GetPosts {
        posts {
            id
            title
            content
        }
    }
`

export { GET_POSTS };

export const CREATE_POST = gql`
    mutation CreatePost($title: String!, $content: String!) {
        createPost(input: { title: $title, content: $content }) {
            id
            title
            content
        }
    }
`;

export const UPDATE_POST = gql`
    mutation UpdatePost($id: ID!, $title: String!, $content: String!) {
        updatePost(id: $id, input: { title: $title, content: $content }) {
            id
            title
            content
        }
    }
`;

export const DELETE_POST = gql`
    mutation DeletePost($id: ID!) {
        deletePost(id: $id) {
            id
            title
            content
        }
    }
`;