import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Players } from '../modules/players/interfaces/players.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  // Lista de jugadores simulada
  private players: Players[] = [
    { code: 'JUANMADRID', names: 'Juan Pérez', shirt: '10', team: 'Real Madrid', cups: '001', country: 'España' },
    { code: 'CARLOSBAR1', names: 'Carlos Gómez', shirt: '7', team: 'FC Barcelona', cups: '002', country: 'España' },
    { code: 'LUISJUNI10', names: 'Luis Sánchez', shirt: '5', team: 'Boca Juniors', cups: '003', country: 'Argentina' },
    { code: 'MARLOPE199', names: 'Marcos López', shirt: '9', team: 'Juventus', cups: '004', country: 'Italia' },
    { code: 'JOSE1996AB', names: 'José Fernández', shirt: '8', team: 'Manchester United', cups: '005', country: 'Inglaterra' },
    { code: 'JRODRI1010', names: 'Andrés Rodríguez', shirt: '11', team: 'PSG', cups: '006', country: 'Francia' },
    { code: 'FERTO19921', names: 'Fernando Torres', shirt: '4', team: 'Atlético Madrid', cups: '007', country: 'España' },
    { code: 'MIGUEL4020', names: 'Miguel Silva', shirt: '2', team: 'River Plate', cups: '008', country: 'Argentina' },
    { code: '1996RIMART', names: 'Ricardo Martínez', shirt: '3', team: 'Arsenal', cups: '009', country: 'Inglaterra' },
    { code: 'SERGI10CHE', names: 'Sergio Rodríguez', shirt: '6', team: 'Chelsea', cups: '010', country: 'Inglaterra' }
  ];

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de jugadores con la propiedad showCups calculada
  getPlayers(): Observable<Players[]> {
    // Primero mapeamos los jugadores y añadimos el campo `showCups` según corresponda
    const playersWithShowCups = this.players.map(player => ({
      ...player,
      showCups: this.shouldShowCups(player.team)  // Calculamos si se debe mostrar el campo de campeonatos
    }));
  
    // Ahora ordenamos el arreglo `playersWithShowCups` por el campo `code` de forma ascendente
    const sortedPlayers = playersWithShowCups.sort((a, b) => a.code.localeCompare(b.code));
  
    // Retornamos el observable con la lista ordenada
    return of(sortedPlayers); // Simulamos la respuesta del servicio
  }

  // Método que determina si el campo "cups" debe mostrarse
  private shouldShowCups(team: string): boolean {
    // Convertir la primera letra del nombre del equipo a minúscula y comprobar si es 'a' o 'b'
    const firstLetter = team.charAt(0).toLowerCase();
    return firstLetter === 'a' || firstLetter === 'b';
  }

  // Método para agregar un nuevo jugador
  addPlayer(player: Players): Observable<any> {
    player.code = player.code.toUpperCase();
    this.players.push(player); 

    const response = {
      status: true,
      message: 'Jugador agregado exitosamente',
      data: player
    }
    return of(response);  
  }

  // Método para actualizar un jugador
  updatePlayer(updatedPlayer: Players): Observable<any> {
    const index = this.players.findIndex(player => player.code === updatedPlayer.code);

    if (index !== -1) {
      // Actualizamos el jugador en la lista
      this.players[index] = { ...this.players[index], ...updatedPlayer };

      const response = {
        status: true,
        message: 'Jugador actualizado exitosamente',
        data: this.players[index]
      };
      return of(response);
    } else {
      const response = {
        status: false,
        message: 'Jugador no encontrado',
      };
      return of(response);
    }
  }

}
