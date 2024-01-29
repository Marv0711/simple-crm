import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {


  constructor(private route: ActivatedRoute) { }
  userID: any = '';
  docRef: any;
  currentUser:User = new User;
  firestore: Firestore = inject(Firestore);

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userID = paramMap.get('id');
      this.docRef = this.getUser('users', this.userID);
      this.getUserJSON();
    })
  }

  getUser(colId: string, docID: string) {
    return doc(collection(this.firestore, colId), docID);
  }

  async getUserJSON() {
    const docSnap = await getDoc(this.docRef);
    if (docSnap.exists()) {
      let user = docSnap.data();
      this.currentUser = new User(user)
    }
    else {
      console.log("No such document!");
    }
  }
}
