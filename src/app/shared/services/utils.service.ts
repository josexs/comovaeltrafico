import { Injectable } from '@angular/core';
import { NameValueI } from '../interfaces/generic.interface';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  types: NameValueI[] = [
    { name: 'Camaras', value: 'cameras' },
    { name: 'Incidencias', value: 'incidents' },
  ];

  getPosition(): Promise<{ lng: number; lat: number }> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getKmAprox = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const deg2rad = (deg: number) => deg * (Math.PI / 180);

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(Number(lat2) - Number(lat1)); // deg2rad below
    const dLon = deg2rad(Number(lon2) - Number(lon1));
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Number(d.toFixed(2));
  };

  onErrorImage(event: any) {
    console.log(event);
    event.target.src = 'https://cdn.browshot.com/static/images/not-found.png';
  }
}
