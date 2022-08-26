import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Medical } from '../Models/medical';
import { MedicalService } from '../Services/medical.service';
import { TokenStorageService } from '../_shared/services/token-storage.service';


@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.css']
})
export class MedicalComponent implements OnInit {


  displayedColumns = ['chartDate', 'disease', 'treatment', 'animalName'];
  medicalList = new MatTableDataSource<Medical>();

  private roles: string[] = [];
  showAdminBoard = false;

  constructor(private medicalService: MedicalService, private tokenStorageService: TokenStorageService) { }

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
    this.medicalService.getAll().subscribe(backendResult =>{
      this.medicalList.data=backendResult as Medical[];
    })
  }

  deleteMedical(idMedical:number){
    console.log(idMedical)
    this.medicalService.deleteMedical(idMedical).subscribe();
    location.reload()
  }

}
