import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Shelter } from '../Models/shelter';
import { ShelterService } from '../Services/shelter.service';
import { TokenStorageService } from '../_shared/services/token-storage.service';

@Component({
  selector: 'app-shelter',
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.css']
})
export class ShelterComponent implements OnInit {

  displayedColumns = ['shelterName', 'address', 'city', 'phone','capacity'];
  shelterList = new MatTableDataSource<Shelter>();
  
  private roles: string[] = [];
  showAdminBoard = false;

  constructor(private shelterService: ShelterService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getAll();
    const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      if(this.showAdminBoard){
        this.displayedColumns.push('actions')
      }
  }

  getAll(){
    this.shelterService.getAll().subscribe(backendResult =>{
      this.shelterList.data=backendResult as Shelter[];
    })
  }

  deleteShelter(idShelter:number){
    console.log(idShelter)
    this.shelterService.deleteShelter(idShelter).subscribe();
    location.reload()
  }

}
