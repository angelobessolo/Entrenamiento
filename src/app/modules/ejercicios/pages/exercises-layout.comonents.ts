import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './exercises-layout.html',
  styleUrls: ['./exercises-layout.scss']
})
export class ExercisesLayout implements OnInit{
  title = 'entrenamiento';
  date1: Date;

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
