import { ItemGenericI } from "../interfaces";

export class ItemsPaginationM {
  allItems: ItemGenericI[] = [];
  items: ItemGenericI[] = [];
  page = 1;
  limit = 20;
}
