import {useMemo, range} from 'react';

export const UsePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
  }) => {
    const paginationRange = useMemo(() => {
      const totalPageCount = Math.ceil(totalCount / pageSize);
  
      const totalPageNumbers = siblingCount + 5;
  

      if (totalPageNumbers >= totalPageCount) {
        return range(1, totalPageCount);
      }
      
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPageCount
      );
  
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
  
      const firstPageIndex = 1;
      const lastPageIndex = totalPageCount;
  

    }, [totalCount, pageSize, siblingCount, currentPage]);
  
    return paginationRange;
  };