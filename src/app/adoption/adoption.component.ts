import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Adoption } from '../Models/adoption';
import { AdoptionService } from '../Services/adoption.service';
import { TokenStorageService } from '../_shared/services/token-storage.service';


@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.css']
})
export class AdoptionComponent implements OnInit {

  displayedColumns = ['adoptionDate', 'shelterName', 'animalName', 'firstNamePerson','lastNamePerson','phonePerson', 'actions'];
  adoptionList = new MatTableDataSource<Adoption>();

  private roles: string[] = [];
  showAdminBoard = false;

  constructor(private adoptionService: AdoptionService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getAll();
    const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
   
      
  }

  getAll(){
    this.adoptionService.getAll().subscribe(backendResult =>{
      this.adoptionList.data=backendResult as Adoption[];
    })
  }

  deleteAdoption(idAdoption:number){
    console.log(idAdoption)
    this.adoptionService.deleteAdoption(idAdoption).subscribe();
    location.reload()
  }

}
