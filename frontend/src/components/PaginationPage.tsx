import React from 'react'
import { PaginationContent,Pagination, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';

type Props ={
  page:number,
  pages:number,
  onPageChange:(page:number) => void
}

function PaginationPage({page,pages,onPageChange}:Props) {
  const pageNumbers=[];
  for(let i=1;i<=pages;i++){
    pageNumbers.push(i)
  }
  return (
    <Pagination>
      <PaginationContent>
        {pageNumbers.length ? <>
        {page !== 1 && <PaginationItem>
          <PaginationPrevious href="#" onClick={() => onPageChange(page-1) } />
        </PaginationItem>
        }
        {pageNumbers && pageNumbers.map(number => (
            <PaginationItem>
              <PaginationLink key={number} href="#" onClick={() =>onPageChange(number)} isActive={page === number}>
                {number}
              </PaginationLink>
          </PaginationItem>
        ))}
        {page !== pageNumbers.length && 
          <PaginationItem>
            <PaginationNext href="#" onClick={() =>onPageChange(page+1) } />
          </PaginationItem>
        }
        </>: 'No results found'}

      </PaginationContent>
    </Pagination>
  )
}


export default PaginationPage
