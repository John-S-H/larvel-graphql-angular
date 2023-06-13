import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { TargetGroupsComponent }  from './target-groups/target-groups.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.gaurd';
import { ChatGptComponent } from './chat-gpt/chat-gpt.component';
import { ConditionsComponent } from './conditions/conditions.component';
import { ConditionDetailsComponent } from './conditions/condition-details/condition-details.component';
import { GamesComponent } from './games/games.component';
import { GameDetailsComponent } from './games/game-details/game-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'post/:id', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'client/:id', component: ClientDetailsComponent, canActivate: [AuthGuard] },
  { path: 'target-groups', component: TargetGroupsComponent, canActivate: [AuthGuard] },
  { path: 'target-group/:id', component: TargetGroupsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chat-gpt', component: ChatGptComponent },
  { path: 'conditions', component: ConditionsComponent },
  { path: 'condition/:id', component: ConditionDetailsComponent, canActivate: [AuthGuard] },
  { path: 'games', component: GamesComponent },
  { path: 'game/:id', component: GameDetailsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
