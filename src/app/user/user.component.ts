import { Component } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { DialogUserComponent } from '../dialog-user/dialog-user.component';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  constructor(public dialog: MatDialog){}

  user = new User();

  openDialog(){
    this.dialog.open(DialogUserComponent)
  }

}
