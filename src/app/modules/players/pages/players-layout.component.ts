import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Players } from '../interfaces/players.interfaces';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-root',
  templateUrl: './players-layout.component.html',
  styleUrls: ['./players-layout.scss'],
  providers: [MessageService]
})
export class PlayersLayout implements OnInit{
  title = 'entrenamiento';
  date1: Date;

  players: Players[] = [];
  playerA: Players;

  displayBasic: boolean;
  showEdit: boolean;
  
  constructor(
    private primengConfig: PrimeNGConfig,
    private teamsService: TeamsService,
    private el: ElementRef, 
    private renderer: Renderer2,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    // Obtenemos el listado inicial 
    // Obtener la lista de jugadores al iniciar el componente
    this.teamsService.getPlayers()
      .subscribe(players => {
        this.players = players;
      }
    );
  }

  createPLayer(event: any){
    this.removeBlurEffect();
    
    if (event.status){
      this.messageService.add({
        severity: 'success',  // Tipo de mensaje: 'success', 'info', 'warn', 'error'
        summary: 'Success',   // Título del mensaje
        detail: event.message,  // Detalles del mensaje
        life: 2000,
      });

      // Inicializa Lista Para actualizar
      this.players = [];
      
      this.teamsService.getPlayers()
      .subscribe(players => {
        this.players = players;
      });
      
      console.log('recarga ',this.players);
    }
    
    this.displayBasic = false;
    this.showEdit = false;
  }

  editPlayerEvent(event: any){
    this.removeBlurEffect();
    
    if (event.status){
      this.messageService.add({
        severity: 'success',  // Tipo de mensaje: 'success', 'info', 'warn', 'error'
        summary: 'Success',   // Título del mensaje
        detail: event.message,  // Detalles del mensaje
        life: 2000,
      });

      // Inicializa Lista Para actualizar
      this.players = [];
      this.playerA = null;
      
      this.teamsService.getPlayers()
      .subscribe(players => {
        this.players = players;
      });
      
      console.log('recarga ',this.players);
    }
    
    this.displayBasic = false;
    this.showEdit = false;
  }

  showBasicDialog() {
    this.displayBasic = true;
    this.addBlurEffect();
  }

  addBlurEffect() {
    const dialogMask = this.el.nativeElement.querySelector('.p-dialog-mask');
    if (dialogMask) {
      this.renderer.setStyle(dialogMask, 'backdrop-filter', 'blur(5px)');
      this.renderer.setStyle(dialogMask, 'background-color', 'rgba(0, 0, 0, 0.5)');
    }
  }

  removeBlurEffect() {
    console.log('rewmueve');
    // Obtiene el elemento de la máscara del modal
    const dialogMask = this.el.nativeElement.querySelector('.p-dialog-mask');

    if (dialogMask) {
      // Usamos Renderer2 para modificar los estilos de la máscara
      this.renderer.setStyle(dialogMask, 'background-color', 'transparent');
      this.renderer.setStyle(dialogMask, 'backdrop-filter', 'none');
    }
  }

  editPlayer(player: any){
    console.log('desde layout', player);
    this.playerA = player;
    this.cdr.detectChanges(); // Fuerza la detección de cambios manualmente
    if (this.playerA){
      this.showEdit = true;
    }

  }

}
