import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'entrenamiento';
  date1: Date;

  items: MenuItem[];

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.items = [
      {
        label: 'Jugadores', 
        icon: 'pi pi-fw pi-users',
        routerLink: ['/jugadores']
      },
      {
        label: 'Ejercicios', 
        icon: 'pi pi-fw pi-pencil',
        routerLink: ['/ejercicios']
      },
    ];
  }
}
