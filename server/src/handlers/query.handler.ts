import { IQueryValues } from "../interfaces/pagination.interfaces";
import { IParsedQuery } from "../interfaces/query.interfaces";
import { ESort } from "../interfaces/sort.interfaces";

export const queryHandler = ({ limit, page, sort, sortType }: IQueryValues): IParsedQuery => {
	limit ? (limit = Math.max(1, Math.round(+limit))) : (limit = 10);
	page ? (page = Math.max(1, Math.round(+page))) : (page = 1);
  sort = sort ? sort : ESort.DATE;
  sortType = sortType === "true" ? 1 : -1;

	return { limit, page, sort, sortType };
};
