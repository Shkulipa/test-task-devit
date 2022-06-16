import { ESort } from "../pages/home/home.interfaces";

export interface IFetchPayload {
  limit?: number, 
  page: number, 
  search: string, 
  sort: ESort, 
  sortType: boolean
}