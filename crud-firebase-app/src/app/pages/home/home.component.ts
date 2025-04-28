import { Component, OnInit } from '@angular/core';
import { FirestoreService, Item } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [FormsModule, CommonModule]
})
export class HomeComponent implements OnInit {
  items: Item[] = [];
  newItem: Item = { name: '', description: '' };
  editMode: boolean = false;
  itemEditingId: string | null = null;

  constructor(private firestoreService: FirestoreService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.firestoreService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  addItem() {
    if (this.editMode && this.itemEditingId) {
      // Editar item existente
      this.firestoreService.updateItem(this.itemEditingId, this.newItem).then(() => {
        this.newItem = { name: '', description: '' };
        this.editMode = false;
        this.itemEditingId = null;
      });
    } else {
      // Crear nuevo item
      this.firestoreService.addItem(this.newItem).then(() => {
        this.newItem = { name: '', description: '' };
      });
    }
  }

  editItem(item: Item) {
    this.newItem = { name: item.name, description: item.description };
    this.editMode = true;
    this.itemEditingId = item.id!;
  }

  deleteItem(id: string) {
    this.firestoreService.deleteItem(id);
  }

  cancelEdit() {
    this.newItem = { name: '', description: '' };
    this.editMode = false;
    this.itemEditingId = null;
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }
}
