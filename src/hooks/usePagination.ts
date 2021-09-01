import { useMemo } from "react";

export const usePagination = (pagesCount: number, currentPage: number) => {
  const getPagesRange = useMemo(() => {
    const getOffset = () => {
      if (currentPage - 2 < 1) return 1;
      else if (pagesCount - currentPage >= 6) return currentPage - 2;
      else return currentPage - 5;
    };

    const offset = getOffset();
    const pages: Array<number> = new Array(6)
      .fill(0)
      .map((_, index) => offset + index);
    return pages;
  }, [pagesCount, currentPage]);

  return getPagesRange;
};
