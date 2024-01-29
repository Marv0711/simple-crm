import { Component, OnInit, inject } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { DialogUserComponent } from '../dialog-user/dialog-user.component';
import { User } from '../../models/user.class';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent{
  firestore: Firestore = inject(Firestore);
  unsubUsers:any;
  allUsers:any = [];

  constructor(public dialog: MatDialog){
    this.unsubUsers = this.subUserList();
  }

  user = new User();

  openDialog(){
    this.dialog.open(DialogUserComponent)
  }

  subUserList(){
    return onSnapshot(this.getUserRef(), (list) => {
      this.allUsers = [];
      list.forEach(element => {
        let user = element.data();
        this.allUsers.push(user);
      });
    });
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }

  ngOnDestroy() {
    this.unsubUsers();
  }

}
