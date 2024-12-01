import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormSharedModule} from "./form-shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { PlayersLayout } from './modules/players/pages/players-layout.component';
import { ExercisesLayout } from './modules/ejercicios/pages/exercises-layout.comonents';
import { CreatePlayer } from './modules/players/components/create-player/create-player.component';
import { EditPLayer } from './modules/players/components/edit-player/edit-player.component';
import { ExerciseOne } from './modules/ejercicios/components/exercise-one/exercise-one.component';
import { ExerciseTwo } from './modules/ejercicios/components/exercise-two/exercise-two.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersLayout,
    ExercisesLayout,
    CreatePlayer,
    EditPLayer,
    ExerciseOne,
    ExerciseTwo,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormSharedModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
