import { useMemo } from "react";

export const usePagination = (pagesCount: number, currentPage: number) => {
  const getPagesRange = useMemo(() => {
    const count = pagesCount >= 6 ? 6 : pagesCount;

    const getOffset = () => {
      if (currentPage - 2 < 1) return 1;
      else if (pagesCount - currentPage >= count) return currentPage - 2;
      else return currentPage - (count - 1);
    };

    const offset = getOffset();

    const pages: Array<number> = new Array(count)
      .fill(0)
      .map((_, index) => offset + index);

    return pages;
  }, [pagesCount, currentPage]);

  return getPagesRange;
};
