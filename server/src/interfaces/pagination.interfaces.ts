import { ESort, TSortType } from './sort.interfaces';

export interface IQueryValues {
	limit?: number;
	page?: number;
  sort?: ESort,
  sortType?: string | TSortType;
}