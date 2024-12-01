import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TeamsService } from "src/app/services/teams.service";

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css'],
  
})
export class CreatePlayer implements OnInit{
  @Output() playerCreated = new EventEmitter<any>();
  createPlayerForm!: FormGroup;

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

  teams: string[] = []; 

  constructor(
    private fb: FormBuilder,
    private teamsService: TeamsService,
  ) {}

  ngOnInit(): void {
    
    // instanciamos el FormGroup y definimos los controles
    this.createPlayerForm = this.fb.group({
      code:  ['', [Validators.required, Validators.maxLength(10)]],
      names: ['',  [Validators.required, Validators.maxLength(100)]],
      shirt: ['', [Validators.maxLength(2)]],
      country: ['', Validators.required],
      team:  ['', Validators.required],
      cups:  ['', [Validators.required, Validators.maxLength(3)]],
    });
    
  }

  onCountryChange(event: any) {
    const selectedCountry = event.target.value;
    this.teams = this.allTeams[selectedCountry] || [];
    // Resetear el campo del equipo al cambiar el país
    this.createPlayerForm.get('team')?.reset();
  }

  updateCupsValidation(teamValue: string) {
    const cupsControl = this.createPlayerForm.get('cups');
    if (teamValue && (teamValue.toUpperCase().startsWith('A') || teamValue.toUpperCase().startsWith('B'))) {
      cupsControl?.setValidators([Validators.required, Validators.maxLength(3)]);
    } else {
      cupsControl?.clearValidators();
    }
    cupsControl?.updateValueAndValidity();
  }

  closeDialog(): void {
    console.log('cierra');
    this.playerCreated.emit(true);
  }

  createPlayer(): void {
    if (this.createPlayerForm.valid) {
      this.teamsService.addPlayer(this.createPlayerForm.value).subscribe(
        response => {
          if (response.status){
            this.createPlayerForm.reset();
            this.playerCreated.emit(response);
          }    
        },
        error => {
          
        }
      );
    }

    const appRoot = document.querySelector('app-root');
    if (appRoot) {
      appRoot.classList.remove('blur-background'); 
    } 
  }

}
