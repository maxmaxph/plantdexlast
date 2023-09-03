import { Component, Input } from '@angular/core';
import { PlantService } from 'src/app/services/plant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plant } from 'src/app/models/plant';
 

@Component({

  selector: 'app-plantform',

  templateUrl: './plantform.component.html',

  styleUrls: ['./plantform.component.css']

})

export class PlantformComponent {
imageChoice: string = 'url'; // valeur par défaut
 
@Input() categories!: string[]
  constructor(private formBuilder: FormBuilder, private plantService: PlantService) {}


  plantForm: FormGroup = this.formBuilder.group({

    nom: ['', [Validators.required ]],

    categorie: ['', [Validators.required]],

    soleil: ['', [Validators.required]],

    arrosage: [0, [Validators.required]],

    image: ['', [Validators.required]]

  });

 

 

 submit() {
    this.plantService.createPlant(this.plantForm.value).subscribe(
        (newPlant) => {
            console.log("Nouvelle plante créée:", newPlant);
            alert('Plante ajoutée avec succès !');
            this.plantForm.reset();  // Réinitialisez le formulaire après la soumission
        },
        (error) => {
            console.error("Erreur lors de la création de la plante:", error);
            alert('Erreur lors de la création de la plante. Veuillez réessayer.');
        }
    );
}

}