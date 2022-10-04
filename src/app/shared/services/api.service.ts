import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { UtilsService } from '.';
import { CoordsI, PaginatorI, ItemGenericI } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ApiService {
  jsonMock!: ItemGenericI[];
  constructor(
    private httpClient: HttpClient,
    private utilsService: UtilsService
  ) {}

  async getLastItemsPaginated(
    type: 'cameras' | 'incidents' | 'radars',
    coords: CoordsI,
    kmMax = 20,
  ): Promise<ItemGenericI[]> {
    await this.getItems(type);

    let items = this.filterItems(this.jsonMock, coords, kmMax);

    return items ;
  }

  private getItems(type: 'cameras' | 'incidents' | 'radars'): Promise<void> {
    return new Promise((resolve) => {
      this.httpClient
        .get<ItemGenericI[]>(`../../../assets/json/race_${type}.json`)
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            this.jsonMock = response;
            resolve();
          },
        });
    });
  }

  private filterItems(
    items: ItemGenericI[],
    coords: CoordsI,
    kmMax: number
  ): ItemGenericI[] {
    const newItems: ItemGenericI[] = [];
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
    newItems.sort((a, b) => (a.kmAprox! < b.kmAprox! ? -1 : 1));
    return newItems;
  }
}
