import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item {
  id?: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  addItem(item: Item) {
    const itemsCollection = collection(this.firestore, 'items');
    return addDoc(itemsCollection, item);
  }

  getItems(): Observable<Item[]> {
    const itemsCollection = collection(this.firestore, 'items');
    return collectionData(itemsCollection, { idField: 'id' }) as Observable<Item[]>;
  }

  deleteItem(id: string) {
    const itemDoc = doc(this.firestore, `items/${id}`);
    return deleteDoc(itemDoc);
  }

  updateItem(id: string, item: Partial<Item>) {
    const itemDoc = doc(this.firestore, `items/${id}`);
    return updateDoc(itemDoc, item);
  }
}
