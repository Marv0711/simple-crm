import { Component, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrl: './dialog-user.component.scss'
})
export class DialogUserComponent {
  firestore: Firestore = inject(Firestore);
  
  user = new User();
  birthDate:Date = new Date();
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogUserComponent>){}


  async saveUser(){
    this.user.birthDate = this.birthDate.getTime();
    await addDoc(this.getUserRef(), {
      user: this.user.toJSON()
    }).then(() => {
      this.dialogRef.close();      
    });
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }
} 

