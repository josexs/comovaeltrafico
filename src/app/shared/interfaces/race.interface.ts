export interface ItemGenericI {
  id: string;
  lat: string;
  lng: string;
  // Cameras
  image?: string;
  // Incidents
  type?: string;
  date?: string;
  reason?: string;
  level?: string;
  province?: string;
  poblation?: string;
  street?: string;
  // varios
  kmAprox?: number;
}
