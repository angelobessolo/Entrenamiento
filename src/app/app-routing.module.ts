import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersLayout } from './modules/players/pages/players-layout.component';
import { ExercisesLayout } from './modules/ejercicios/pages/exercises-layout.comonents';

const routes: Routes = [
  { 
    path: 'jugadores', 
    component: PlayersLayout 
  }, 
  { 
    path: 'ejercicios', 
    component: ExercisesLayout, 
  },     
  { 
    path: '', 
    redirectTo: 'jugadores', 
    pathMatch: 'full' 
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
