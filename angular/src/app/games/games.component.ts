import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GET_GAMES, CREATE_GAME, UPDATE_GAME, DELETE_GAME } from '../graphql/graphql.games';
import { GET_CLIENTS } from '../graphql/graphql.clients';
import { ActivatedRoute } from '@angular/router';

interface Game {
  id: number,
  title: string,
  description: string
}

interface CreateGameMutationData {
  createGame: Game;
}

interface UpdateGameMutationData {
  updateGame: Game;
}

@Component({
             selector:    'app-games',
             templateUrl: './games.component.html',
             styleUrls:   ['./games.component.scss']
           })
export class GamesComponent implements OnInit {
  games: any[]            = [];
  error: any;
  selectedGame: any;
  showCreateForm: boolean = false;
  clients: any[] = [];
  selectedClients: string[] = [];

  constructor(private apollo: Apollo, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const gameId = params['id'];
      if (gameId) {
        this.selectedGame = this.games.find(game => game.id === gameId);
      }
    });

    this.apollo.watchQuery(
      {
        query: GET_GAMES
      }).valueChanges.subscribe(({data, error}: any) => {
      this.games = data.games;
      this.clients = data?.clients || [];
      console.log('clients', this.clients);
      this.error = error;
    });
  }

  // createGame(title: string, description: string) {
  //   this.apollo.mutate<CreateGameMutationData>(
  //     {
  //       mutation:  CREATE_GAME,
  //       variables: {
  //         title,
  //         description
  //       },
  //       update:    (cache, {data}) => {
  //         const newGame = data?.createGame;
  //         if (newGame) {
  //           cache.modify(
  //             {
  //               fields: {
  //                 games(existingGames = []) {
  //                   const newGameRef = cache.writeFragment(
  //                     {
  //                       data:     newGame,
  //                       fragment: gql`
  //                           fragment NewGame on Game {
  //                               id
  //                               title
  //                               description
  //                           }
  //                       `
  //                     });
  //                   return [...existingGames, newGameRef];
  //                 }
  //               }
  //             });
  //         }
  //       }
  //     }).subscribe();
  //   this.showCreateForm = false;
  // }

  createGame(title: string, description: string) {
    this.apollo.mutate<CreateGameMutationData>(
      {
        mutation:  CREATE_GAME,
        variables: {
          title,
          description,
        },
        update:    (cache, {data}) => {
          const newGame = data?.createGame;
          if (newGame) {
            cache.modify(
              {
                fields: {
                  games(existingGames = []) {
                    const newGameRef = cache.writeFragment(
                      {
                        data:     newGame,
                        fragment: gql`
                            fragment NewGame on Game {
                                id
                                title
                                description
                            }
                        `
                      });
                    return [...existingGames, newGameRef];
                  }
                }
              });
          }
        }
      }).subscribe();
    this.showCreateForm = false;
  }

  updateGame(id: string, title: string, description: string) {
    this.apollo.mutate<UpdateGameMutationData>(
      {
        mutation:  UPDATE_GAME,
        variables: {
          id,
          title,
          description
        },
        update:    (cache, {data}) => {
          const updatedGame = data?.updateGame;
          if (!updatedGame) {
            return;
          }
          cache.modify(
            {
              fields: {
                games(existingGames = [], {readField}) {
                  return existingGames.map((game: any) => {
                    if (readField('id', game) === updatedGame.id) {
                      return {
                        ...game,
                        ...updatedGame,
                      };
                    }
                    return game;
                  });
                },
              },
            });
          this.selectedGame = null;
        },
      }).subscribe();
  }

  deleteGame(id: string) {
    this.apollo.mutate(
      {
        mutation:  DELETE_GAME,
        variables: {
          id
        },
        update:    (cache, {data}) => {
          const deletedGame  = id;
          const {games}: any = cache.readQuery({query: GET_GAMES});
          const updatedGames = games.filter((game: any) => game.id !== deletedGame);
          cache.writeQuery(
            {
              query: GET_GAMES,
              data:  {
                games: updatedGames
              }
            });
          this.selectedGame = null;
        }
      }).subscribe();
  }

  selectGame(game: any) {
    this.selectedGame = {...game};
  }
}

