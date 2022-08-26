import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Animal } from '../Models/animal';
import { AnimalService } from '../Services/animal.service';
import { TokenStorageService } from '../_shared/services/token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

    //for image upload

    selectedFile: File;
    retrievedImage: any = null;
    base64Data: any;
    retrieveResonse: any;
    message: string | undefined;
    imageName: any;
    arrayOfBlob = new Array<Blob>();
  
  displayedColumns = ['status', 'name', 'age', 'gender', 'specie', 'breed', 'checkInDate', 'actions'];
  animalList = new MatTableDataSource<Animal>();
  
  private roles: string[] = [];
  showAdminBoard = false;
  
  constructor(private animalservice: AnimalService,
    private httpClient: HttpClient, private tokenStorageService: TokenStorageService) {

      this.selectedFile = new File(this.arrayOfBlob, "Mock.zip", { type: 'application/zip' })
   }


  ngOnInit(): void {
    this.getAll();
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;

    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
  
  }

  getAll(){
    this.animalservice.getAll().subscribe((backendresult: Animal[])=>{
      this.animalList.data=backendresult as Animal[];
    })
  }

  deleteAnimal(idAnimal:number){
    console.log(idAnimal)
    this.animalservice.deleteAnimal(idAnimal).subscribe();
    location.reload()
  }

  //for images

  //Gets called when the user selects an image
  public onFileChanged(event: { target: { files: (File )[]; }; }) {
    //Select File
    this.selectedFile = event.target.files[0];
  }


  //Gets called when the user clicks on submit to upload the image
  onUpload() {
   const  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'image/jpeg' })
  }
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:9191/skimanagement/api/v1/image/upload', uploadImageData, { observe: 'response',  })
      .subscribe((response: { status: number; }) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
  }
}
