import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TeamsService } from "src/app/services/teams.service";
import { ModuleNumbers } from "../../interfaces/module-numbers.interface";

@Component({
  selector: 'app-exercise-one',
  templateUrl: './exercise-one.component.html',
  styleUrls: ['./exercise-one.component.css'],
  
})
export class ExerciseOne implements OnInit{
  @Output() playerCreated = new EventEmitter<any>();
  exerciseOneForm!: FormGroup;
  numbers: ModuleNumbers[] = [];

  constructor(
    private fb: FormBuilder,
    private teamsService: TeamsService,
  ) {}

  ngOnInit(): void {
    
    // instanciamos el FormGroup y definimos los controles
    this.exerciseOneForm = this.fb.group({
      numberInput:  ['', [Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]{1,4}$')]],
    });
    
  }

  addNumber(){
    if (this.exerciseOneForm.valid){
      const numbeInput = this.exerciseOneForm.get('numberInput').value;
      console.log('cadena', numbeInput);
      const valueString = this.getModule(numbeInput);
    
      this.numbers.push(
        {
          number: numbeInput,
          label: valueString,
        }
      );
      this.exerciseOneForm.reset();
    }
    this.exerciseOneForm.reset();
  }

  cleanArray(){
    // Resetea el array de números y el formulario
    this.numbers = [];
    this.exerciseOneForm.reset();
  }

  getModule(number: number): string{
    if (number % 2 === 0) {
      return 'Es Par';
    }else {
      return 'Es Impar';
    }
  }

  onInput(event: Event): void {
    const input = <HTMLInputElement>event.target;
    // Elimina cualquier carácter no numérico
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 4);
  }

}
