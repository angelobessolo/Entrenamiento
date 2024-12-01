import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-exercise-two',
  templateUrl: './exercise-two.component.html',
  styleUrls: ['./exercise-two.component.css'],
  
})
export class ExerciseTwo implements OnInit{
  exerciseTwoForm!: FormGroup;
  result: string = '';  

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    
    // instanciamos el FormGroup y definimos los controles
    this.exerciseTwoForm = this.fb.group({
      stringA:  ['', Validators.required],
      stringB:  ['', Validators.required],
    });
    
  }

  checkAnagram(): void {
    const stringA = this.exerciseTwoForm.get('stringA')?.value;
    const stringB = this.exerciseTwoForm.get('stringB')?.value;

    // Limpiar espacios y convertir a minúsculas
    const cleanStringA = stringA.replace(/\s+/g, '').toLowerCase();
    const cleanStringB = stringB.replace(/\s+/g, '').toLowerCase();

    // Verificar si son anagramas
    if (this.areAnagrams(cleanStringA, cleanStringB)) {
      this.result = '¡Las cadenas son anagramas!';
    } else {
      this.result = 'Las cadenas no son anagramas.';
    }
  }

  // Función que determina si dos cadenas son anagramas
  private areAnagrams(str1: string, str2: string): boolean {
    // Si las longitudes no coinciden, no pueden ser anagramas
    if (str1.length !== str2.length) {
      return false;
    }

    // Ordenar ambas cadenas y comparar
    return str1.split('').sort().join('') === str2.split('').sort().join('');
  }

  cleanArray(){
    this.exerciseTwoForm.reset();
    this.result = '';
  }

}
