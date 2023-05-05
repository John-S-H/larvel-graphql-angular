import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST } from '../graphql.operations';

interface Post {
  id: number,
  title: string
}

interface CreatePostMutationData {
  createPost: Post;
}

interface UpdatePostMutationData {
  updatePost: Post;
}

@Component({
             selector:    'app-posts',
             templateUrl: './posts.component.html',
             styleUrls:   ['./posts.component.scss']
           })
export class PostsComponent implements OnInit {
  posts: any[] = [];
  error: any;
  selectedPost: any;

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.apollo.watchQuery({
                             query: GET_POSTS
                           }).valueChanges.subscribe(({data, error}: any) => {
      this.posts = data.posts;
      this.error = error;
    });
  }

  createPost(title: string, content: string) {
    this.apollo.mutate<CreatePostMutationData>({
      mutation:  CREATE_POST,
      variables: {
      title,
      content
    },
    update:    (cache, {data}) => {
    const newPost = data?.createPost;
      if (newPost) {
       cache.modify({
          fields: {
            posts(existingPosts = []) {
              const newPostRef = cache.writeFragment({
                 data:     newPost,
                 fragment: gql`
                     fragment NewPost on Post {
                         id
                         title
                     }
                 `
               });
              return [...existingPosts, newPostRef];
            }
          }
        });
      }
    }
    }).subscribe();
  }

  updatePost(id: string, title: string, content: string) {
    this.apollo.mutate<UpdatePostMutationData>({
     mutation: UPDATE_POST,
     variables: {
       id,
       title,
       content
     },
     update: (cache, { data }) => {
       const updatedPost = data?.updatePost;
       if (!updatedPost) return;
       cache.modify({
        fields: {
          posts(existingPosts = [], { readField }) {
            return existingPosts.map((post: any) => {
              if (readField("id", post) === updatedPost.id) {
                return {
                  ...post,
                  ...updatedPost,
                };
              }
              return post;
            });
          },
        },
      });
       this.selectedPost = null;
     },
   }).subscribe();
  }

  deletePost(id: string) {
    this.apollo.mutate({
     mutation: DELETE_POST,
     variables: {
       id
     },
     update: (cache, { data  }) =>  {
       const deletedPost = id;
       const { posts }: any = cache.readQuery({ query: GET_POSTS });
       const updatedPosts = posts.filter((post: any) => post.id !== deletedPost);
       cache.writeQuery({
          query: GET_POSTS,
          data: {
            posts: updatedPosts
          }
        });
       this.selectedPost = null; // reset the selected post
     }
   }).subscribe();
  }

  selectPost(post: any) {
    this.selectedPost = {...post};
  }
}