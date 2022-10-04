import { Component, OnInit } from '@angular/core';
import { ApiService, UtilsService } from 'src/app/shared/services';
import { CoordsI, SelectorOutputI } from 'src/app/shared/interfaces';
import { ItemsPaginationM } from 'src/app/shared/models';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
})
export class HomePage implements OnInit {
  type: 'cameras' | 'incidents' | 'radars' = 'cameras';
  items = new ItemsPaginationM();
  location = {
    loading: true,
    noLocation: true,
    lat: 0,
    lng: 0,
  };
  kmMax = 20;
  constructor(
    private apiService: ApiService,
    private utilsService: UtilsService
  ) {}

  async ngOnInit() {
    await this.checkPosition();
  }

  async checkPosition() {
    const location = localStorage.getItem('location') ?? '';
    if (location === '') {
      await this.getPosition();
    } else {
      const locationJSON: CoordsI = JSON.parse(location);
      this.location.lat = locationJSON.lat;
      this.location.lng = locationJSON.lng;
      this.location.loading = false;
      this.location.noLocation = false;
    }
    this.getLastItems();
  }

  async getPosition() {
    try {
      const { lat, lng } = await this.utilsService.getPosition();
      this.location.lat = lat;
      this.location.lng = lng;
      this.location.loading = false;
      this.location.noLocation = false;
      localStorage.setItem('location', JSON.stringify({ lat, lng }));
    } catch {
      this.location.loading = false;
      this.location.noLocation = true;
    }
  }

  async getLastItems() {
    const coords = { lat: this.location.lat, lng: this.location.lng };
    const response = await this.apiService.getLastItemsPaginated(
      this.type,
      coords,
      this.kmMax
    );
    const init = (this.items.page - 1) * this.items.limit;
    const offset = this.items.page * this.items.limit;
    const items = response;
    this.items.allItems = response;
    this.items.items = items.slice(init, offset);
  }

  onChangeSelectors(event: SelectorOutputI) {
    console.log(event);
    this.type = event.type;
    this.kmMax = event.kmMax;
    this.getLastItems();
  }
}
