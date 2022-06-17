import "./sortPanel.css";
import cn from "classnames";
import { Container } from "../container/container";
import { ISortPanel } from "./sortPanel.interfaces";
import { ESort } from "../../pages/home/home.interfaces";

export function SortPanel({
  sort,
  setSort,
  sortType,
  setSortType
}: ISortPanel): JSX.Element {

  const sortClickHandler = (newSort: ESort): void => {
    if(sort === newSort) {
      setSortType(state => !state);
      return;
    }

    setSort(newSort);
    setSortType(true);
  }

  return (
    <Container>
      <div className="sort-panel-block">
        <div 
          className={cn("sort-panel-btn", {
            "active": sort === ESort.DATE,
            }, sortType ? "desc" :  "asc")
          } 
          onClick={() => sortClickHandler(ESort.DATE)}
        >
          date
        </div>
        <div 
          className={cn("sort-panel-btn", {
            "active": sort === ESort.AUTHOR,
            }, sortType ? "asc" : "desc")
          } 
          onClick={() => sortClickHandler(ESort.AUTHOR)}
        >
          author
        </div>
        <div 
          className={cn("sort-panel-btn", {
            "active": sort === ESort.TITLE,
            }, sortType ? "asc" : "desc")
          } 
          onClick={() => sortClickHandler(ESort.TITLE)}
        >
          title
        </div>
      </div>
    </Container>
  )
}
