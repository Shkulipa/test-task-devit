import { ESort, TSortType } from "./sort.interfaces";

export interface IParsedQuery {
	limit: number;
	page: number;
  sort: ESort;
  sortType: TSortType;
}
