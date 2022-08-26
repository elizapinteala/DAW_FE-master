import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_shared/services/token-storage.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  
  constructor(private token: TokenStorageService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
 
  }

 

}
