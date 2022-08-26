import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Animal } from '../Models/animal';
import { AnimalService } from '../Services/animal.service';
import { TokenStorageService } from '../_shared/services/token-storage.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  
  displayedColumns = ['status', 'name', 'age', 'gender', 'specie', 'breed', 'checkInDate', 'actions'];
  animalList = new MatTableDataSource<Animal>();
  
  private roles: string[] = [];
  showAdminBoard = false;
  
  constructor(private animalservice: AnimalService, private tokenStorageService: TokenStorageService) {


   }


  ngOnInit(): void {
    this.getAll();
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;

    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
  
  }

  getAll(){
    this.animalservice.getAll().subscribe(backendresult=>{
      this.animalList.data=backendresult as Animal[];
    })
  }

  deleteAnimal(idAnimal:number){
    console.log(idAnimal)
    this.animalservice.deleteAnimal(idAnimal).subscribe();
    location.reload()
  }
}
