import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {

  @Input() validator: any;
  @Input() environment: any = "mainnet";

  isAddedToFavorite: boolean;
  favorites: any;

  constructor() { }

  ngOnInit() {
    this.getFavorites();
  }

  async getFavorites() {
    let favorites: any = await Storage.get({ key: 'favorites' });
    this.favorites = JSON.parse(favorites.value);
    if (this.favorites == null) {
      this.favorites = { "mainnet": [], "testnet": [] };
    }
    if ((this.favorites.mainnet !== undefined && this.favorites.mainnet.indexOf(this.validator) >= 0) || (this.favorites.testnet !== undefined && this.favorites.testnet.indexOf(this.validator) >= 0)) {
      this.isAddedToFavorite = true;
    }
  }

  async setAsFavorite() {
    if (this.isAddedToFavorite) {
      this.favorites[this.environment].splice(this.favorites[this.environment].indexOf(this.validator), 1);
      this.isAddedToFavorite = false;
    } else {
      this.favorites[this.environment].push(this.validator);
      this.isAddedToFavorite = true;
    }
    await Storage.set({
      key: 'favorites',
      value: JSON.stringify(this.favorites),
    });
  }

}
