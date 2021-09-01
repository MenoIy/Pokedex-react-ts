import { usePagination } from "../../hooks/usePagination";
import "./style.css";

type PaginationProps = {
  ElementsCount: number;
  ElementsByPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const Pagination = ({
  ElementsCount,
  ElementsByPage,
  currentPage,
  setCurrentPage,
}: PaginationProps): JSX.Element => {
  const pagesCount = Math.ceil(ElementsCount / ElementsByPage);
  const pagesRange = usePagination(pagesCount, currentPage);

  const nextPage = (): void => {
    if (currentPage < pagesCount) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const firstPage = (): void => {
    setCurrentPage(1);
  };
  const lastPage = (): void => {
    setCurrentPage(pagesCount);
  };

  return (
    <div className="pagination">
      <ul>
        {currentPage > 1 && <li onClick={firstPage}>First</li>}
        {currentPage > 1 && <li onClick={prevPage}>Prev</li>}
        {pagesRange.map((index) => (
          <li
            key={index}
            className={index === currentPage ? "current-page" : "page"}
            onClick={() => setCurrentPage(index)}
          >
            {index}
          </li>
        ))}
        {currentPage < pagesCount && <li onClick={nextPage}>Next</li>}
        {currentPage !== pagesCount && <li onClick={lastPage}>Last</li>}
      </ul>
    </div>
  );
};

export default Pagination;
