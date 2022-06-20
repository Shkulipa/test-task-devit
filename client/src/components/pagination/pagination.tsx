
import { dataTestIds } from "../../tests/utils/dataTestIds";
import "./pagination.css";

interface IPaginationProps {
  count: number;
  currentPage: number;
  prefetchHoverPage: (hoverPage: number) => void;
  setPage :React.Dispatch<React.SetStateAction<number>>
}

export function Pagination({ currentPage, prefetchHoverPage, count, setPage }: IPaginationProps): JSX.Element {
  const countPages = Math.ceil(count / 5);

  return (
    <div className="paginationPageBlock">
      {new Array(countPages).fill(0).map((_, idx) => {
        const pageNumber = idx + 1;
        const isActive = currentPage === pageNumber ? "active" : "";

        return (
          <div 
            key={idx} 
            onMouseEnter={() => prefetchHoverPage(pageNumber)}
            className={`paginationPageNumber ${isActive}`}
            onClick={() => setPage(pageNumber)}
            data-testid={dataTestIds.paginationBtn}
          >
            {pageNumber}
          </div>
        )
      })}
    </div>
  )
}
