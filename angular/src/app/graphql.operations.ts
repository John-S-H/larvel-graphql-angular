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