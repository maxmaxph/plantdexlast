import { Component } from '@angular/core';
import { Ligne } from '../../models/ligne.interface';
import { Plant } from 'src/app/models/plant';
import { PlantService } from '../../services/plant.service';

@Component({
  selector: 'app-admintable',
  templateUrl: './admintable.component.html',
  styleUrls: ['./admintable.component.css']
})
export class AdmintableComponent {
    lignes: Plant[] = [];
    isEditing = false;

  constructor(private plantsService: PlantService) {}

ngOnInit() {
    // Au chargement de la page, on récupère les données des plantes depuis le service
    this.plantsService.getPlants().subscribe((data: Plant[]) => {
      console.log(data);
      this.lignes = data;

    });
  }

    editerLigne(index: number) {
        this.isEditing = !this.isEditing;
    }

    supprimerLigne(id: number, index: number) {
        const plantId = id;
        this.plantsService.deletePlant(plantId).subscribe(() => {
          this.lignes.splice(index, 1);
        })
    }

confirmerChangements(id: number, nom: string, categorie: string, arrosage: number, soleil: string, image: string) {
    this.isEditing = false;
    const plantId = id;
    const updatePlant: Plant = {
      id: id,
      nom: nom,
      categorie: categorie,
      arrosage: arrosage,
      soleil: soleil,
      image: image,
      favoris: false
    };
    this.plantsService.updatePlant(plantId, updatePlant).subscribe(() => {
      console.log('Mise à jour effectuée');

    });

  }
}


