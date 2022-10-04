import { Component, OnInit } from '@angular/core';
import { RaceItemGeneric } from '../../shared/interfaces/race.interface';
import { ApiService, UtilsService } from 'src/app/shared/services';
import { NameValueI } from 'src/app/shared/interfaces/generic.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
})
export class HomePage implements OnInit {
  type: 'cameras' | 'incidents' = 'cameras';
  types: NameValueI[] = [];
  cameras: RaceItemGeneric[] = [];
  incidents: RaceItemGeneric[] = [];
  location = {
    loading: true,
    noLocation: true,
    lat: 0,
    lng: 0,
  };
  kmMax = 20;
  page = 1;
  limit = 20;
  kms = [1, 5, 20, 50, 100, 1000]
  constructor(
    private apiService: ApiService,
    private utilsService: UtilsService
  ) {}

  async ngOnInit() {
    this.types = this.utilsService.types;
    await this.getPosition();
    this.getAllItems();
  }

  async getPosition() {
    try {
      const { lat, lng } = await this.utilsService.getPosition();
      this.location.lat = lat;
      this.location.lng = lng;
      this.location.loading = false;
      this.location.noLocation = false;
      console.log(this.location)
    } catch {
      this.location.loading = false;
      this.location.noLocation = true;
    }
  }

  async getAllItems() {
    console.log(this.type);
    const coords = { lat: this.location.lat, lng: this.location.lng };
    const response = await this.apiService.getLastItems(
      this.type,
      coords,
      this.kmMax,
      this.page,
      this.limit
    );
    switch (this.type) {
      case 'cameras':
        this.cameras = response;
        break;
      case 'incidents':
        this.incidents = response;
        break;

      default:
        break;
    }
  }

  handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}
