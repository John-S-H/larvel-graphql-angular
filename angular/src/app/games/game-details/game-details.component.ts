import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_GAMES } from '../../graphql/graphql.games';

interface Game {
  id: number;
  title: string;
  description: string;
}

@Component({
             selector:    'app-game-details',
             templateUrl: './game-details.component.html',
             styleUrls:   ['./game-details.component.scss']
           })

export class GameDetailsComponent {
  game: Game | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const gameId = params.get('id');
      if (gameId) {
        this.fetchGameDetails(parseInt(gameId));
      }
      else {
        console.log('no id found');
      }
    });
  }

  fetchGameDetails(gameId: number): void {
    this.apollo.watchQuery<{ games: Game[] }>(
      {
        query: GET_GAMES
      }).valueChanges.subscribe(({data}) => {
      const games = data.games;
      this.game = games.find(game => game.id == gameId);
    }, error => {
      this.game = null;
    });
  }

  goBack(): void {
    // You can navigate back to the previous page or any desired route
  }

}
