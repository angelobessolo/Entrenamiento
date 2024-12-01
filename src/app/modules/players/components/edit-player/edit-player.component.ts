import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TeamsService } from "src/app/services/teams.service";
import { Players } from "../../interfaces/players.interfaces";

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css'],
  
})
export class EditPLayer implements OnInit{
  @Output() editPlayerEvent = new EventEmitter<any>();
  @Input() player: Players;
  editPlayerForm!: FormGroup;

  countries: string[] = ['Argentina', 'Brasil', 'Colombia', 'España', 'Inglaterra', 'Italia', 'Francia', 'Holanda', 'Portugal'];

  allTeams: { [key: string]: string[] } = {
    'Argentina': [
      'Boca Juniors', 'River Plate', 'Independiente', 'Racing Club', 'San Lorenzo', 
      'Vélez Sarsfield', 'Huracán', 'Newell\'s Old Boys', 'Rosario Central', 'Lanús', 
      'Estudiantes de La Plata', 'Gimnasia y Esgrima La Plata', 'Talleres', 'Atlético Tucumán', 
      'Argentinos Juniors', 'Banfield', 'Platense', 'Central Córdoba', 'Sarmiento', 'Patronato'
    ],

    'Brasil': [
      'Flamengo', 'São Paulo', 'Palmeiras', 'Vasco da Gama', 'Fluminense', 'Botafogo', 
      'Atlético Mineiro', 'Grêmio', 'Internacional', 'Corinthians', 'Santos', 'Bahia', 
      'Fortaleza', 'Ceará', 'Cruzeiro', 'Atlético Paranaense', 'São Paulo', 'Gremio', 'Goias'
    ],

    'Colombia': [
      'Atlético Nacional', 'Millonarios', 'Independiente Santa Fe', 'Deportivo Cali', 
      'América de Cali', 'Junior de Barranquilla', 'Atlético Junior', 'Once Caldas', 
      'Millonarios', 'Cúcuta Deportivo', 'Deportivo Pasto', 'Envigado', 'Rionegro Águilas'
    ],

    'España': [
      'Real Madrid', 'FC Barcelona', 'Atlético de Madrid', 'Sevilla FC', 'Real Sociedad', 
      'Real Betis', 'Villarreal', 'Valencia CF', 'Athletic Club', 'Getafe CF', 'Celta de Vigo',
      'Granada CF', 'Levante UD', 'Eibar', 'Osasuna', 'Alavés', 'Elche CF', 'Espanyol', 'Valladolid'
    ],

    'Inglaterra': [
      'Manchester City', 'Manchester United', 'Liverpool', 'Chelsea', 'Arsenal', 'Tottenham Hotspur',
      'West Ham United', 'Leicester City', 'Aston Villa', 'Everton', 'Wolverhampton Wanderers', 
      'Newcastle United', 'Southampton', 'Brighton & Hove Albion', 'Burnley', 'Crystal Palace',
      'Leeds United', 'Sheffield United', 'Fulham', 'West Bromwich Albion'
    ],

    'Italia': [
      'Juventus', 'AC Milan', 'Inter de Milán', 'AS Roma', 'Napoli', 'Lazio', 'Atalanta', 
      'Fiorentina', 'Sampdoria', 'Bologna', 'Torino', 'Udinese', 'Genoa', 'Cagliari', 
      'Spezia', 'Parma', 'Benevento', 'Sassuolo', 'Hellas Verona', 'Crotone'
    ],

    'Francia': [
      'Paris Saint-Germain', 'Olympique de Marseille', 'AS Monaco', 'Olympique Lyonnais', 'Lille OSC', 
      'Stade Rennais', 'OGC Nice', 'RC Lens', 'Angers SCO', 'Bordeaux', 'Saint-Étienne', 'Montpellier',
      'Nantes', 'Reims', 'Strasburgo', 'Troyes', 'Clermont Foot', 'Lorient', 'Brest', 'Metz'
    ],

    'Holanda': [
      'Ajax', 'PSV Eindhoven', 'Feyenoord', 'AZ Alkmaar', 'Vitesse', 'Utrecht', 'Heerenveen',
      'Willem II', 'Groningen', 'Twente', 'Sparta Rotterdam', 'Fortuna Sittard', 'RKC Waalwijk',
      'PEC Zwolle', 'Emmen'
    ],

    'Portugal': [
      'Benfica', 'Porto', 'Sporting CP', 'Braga', 'Marítimo', 'Vitoria de Guimarães', 'Boavista', 
      'Rio Ave', 'Moreirense', 'Tondela', 'Belenenses', 'Famalicão', 'Paços de Ferreira', 
      'Santa Clara', 'Nacional', 'Ferreira', 'Estoril Praia', 'Vizela'
    ]
  };

  // Equipos que se mostrarán dependiendo del país seleccionado
  teams: string[] = []; 

  constructor(
    private fb: FormBuilder,
    private teamsService: TeamsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Llega al edit', this.player);
    // Inicializar el formulario si el jugador ya está disponible
    this.initializeForm();
    this.teams = [this.player.team];
    this.setValues();

  }

  initializeForm(): void {
    this.editPlayerForm = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(10)]],
      names: ['', [Validators.required, Validators.maxLength(100)]],
      shirt: ['', [Validators.maxLength(2)]],
      country: ['', Validators.required],
      team: ['', Validators.required],
      cups: ['', [Validators.required, Validators.maxLength(3)]],
    });
  }

  setValues(): void {
    this.editPlayerForm.patchValue({
      code: this.player.code,
      names: this.player.names,
      shirt: this.player.shirt,
      country: this.player?.country, 
      team: this.player?.team,
      cups: this.player.cups,
    });

    // Forzar la detección de cambios
    this.cdr.detectChanges();
  }

  onCountryChange(event: any) {
    const selectedCountry = event.target.value;
    this.teams = this.allTeams[selectedCountry] || [];
    // Resetear el campo del equipo al cambiar el país
    console.log('sdsdsd');
    this.editPlayerForm.get('team')?.reset();
  }

  updateCupsValidation(teamValue: string) {
    const cupsControl = this.editPlayerForm.get('cups');
    if (teamValue && (teamValue.toUpperCase().startsWith('A') || teamValue.toUpperCase().startsWith('B'))) {
      cupsControl?.setValidators([Validators.required, Validators.maxLength(3)]);
    } else {
      cupsControl?.clearValidators();
    }
    cupsControl?.updateValueAndValidity();
  }

  closeDialog(): void {
    this.editPlayerEvent.emit(true);
  }

  editPlayer(): void {
    if (this.editPlayerForm.valid) {
      this.teamsService.updatePlayer(this.editPlayerForm.value).subscribe(
        response => {
          if (response.status){
            this.editPlayerForm.reset();
            this.editPlayerEvent.emit(response);
          }    
        },
        error => {
          
        }
      );
    }

    // const appRoot = document.querySelector('app-root');
    // if (appRoot) {
    //   appRoot.classList.remove('blur-background'); 
    // } 
  }

}
