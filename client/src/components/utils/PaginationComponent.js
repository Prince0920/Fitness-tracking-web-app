import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = ({ page, pages, setPage }) => {
  const showBlocks = 5; // number of blocks we want to show in pagination tab.
  const skipBlocks = Math.floor((page - 1) / showBlocks) * showBlocks; // used to show blocks in group of {showBlocks} number.
  const blockElementArray = []; // store page number for the pagination blocks that we want to show.

  const totalBlocks = pages; // total blocks number of blocks in equals to number of pages.

  /*
    Let showBlocks = 5
    Bellow condition is used to check
    weather we have to show 5 blocks of less blocks
    like if we have 13 blocks then at end
    we have to show 11, 12, 13 block only.
    */
  const condition = totalBlocks - skipBlocks > showBlocks ? showBlocks : totalBlocks - skipBlocks;
  for (let i = 1; i <= condition; i++) {
    blockElementArray.push(skipBlocks + i);
  }

  return (
    <div className='my-4'>
      <Pagination>
        {/* First page button*/}
        <Pagination.First
          onClick={() => {
            setPage(1);
          }}
          disabled={page === 1}
        />

        {/* Previous page button*/}
        <Pagination.Prev
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page === 1}
        />

        {/* Initial ellipsis and page 1 block*/}
        {page > showBlocks && (
          <>
            <Pagination.Item onClick={() => setPage(1)}>{1}</Pagination.Item>
            <Pagination.Ellipsis />
          </>
        )}

        {/* Dynamic pagination blocks */}
        {blockElementArray.map((page_no, index) => {
          return (
            <Pagination.Item
              key={page_no}
              onClick={() => setPage(page_no)}
              active={page === page_no}>
              {page_no}
            </Pagination.Item>
          );
        })}

        {/* End ellipsis and last page number */}
        {totalBlocks - skipBlocks > showBlocks && (
          <>
            <Pagination.Ellipsis />
            <Pagination.Item onClick={() => setPage(pages)}>{pages}</Pagination.Item>
          </>
        )}

        {/* Next button */}
        <Pagination.Next
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page === pages}
        />

        {/* Last page button */}
        <Pagination.Last
          onClick={() => {
            setPage(pages);
          }}
          disabled={page === pages}
        />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
