import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { RaceItemGeneric } from '../interfaces/race.interface';
import { RaceI } from '../interfaces/race.interface';
import { CoordsI } from '../interfaces/generic.interface';
import { UtilsService } from '.';

@Injectable({ providedIn: 'root' })
export class ApiService {
  jsonMock!: RaceI;
  constructor(
    private httpClient: HttpClient,
    private utilsService: UtilsService
  ) {}

  getObject(): Promise<void> {
    return new Promise((resolve) => {
      this.httpClient
        .get<RaceI>('../../../assets/json/race.json')
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            this.jsonMock = response;
            resolve();
          },
        });
    });
  }

  async getLastItems(
    type: 'cameras' | 'incidents',
    coords: CoordsI,
    kmMax = 20,
    page = 1,
    limit = 20
  ): Promise<RaceItemGeneric[]> {
    await this.getObject();
    const init = (page - 1) * limit;
    const offset = page * limit;
    let items = this.filterItems(this.jsonMock[type], coords, kmMax);
    items = items.slice(init, offset);
    // console.log(items);

    return items;
  }

  filterItems(
    items: RaceItemGeneric[],
    coords: CoordsI,
    kmMax: number
  ): RaceItemGeneric[] {
    const newItems: RaceItemGeneric[] = [];
    for (const item of items) {
      const kmAprox = this.utilsService.getKmAprox(
        coords.lat,
        coords.lng,
        Number(item.lat),
        Number(item.lng)
      );
      if (kmAprox < kmMax) {
        item.kmAprox = kmAprox;
        newItems.push(item);
      }
    }
    newItems.sort((a, b)=> a.kmAprox! < b.kmAprox! ? -1 : 1)
    return newItems;
  }
}
