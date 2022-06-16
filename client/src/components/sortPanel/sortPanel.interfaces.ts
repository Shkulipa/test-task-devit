import { Dispatch, SetStateAction } from "react";
import { ESort } from "../../pages/home/home.interfaces";

export interface ISortPanel {
  sort: ESort; 
  setSort: Dispatch<SetStateAction<ESort>>; 
  sortType: boolean; 
  setSortType: Dispatch<SetStateAction<boolean>>;
}