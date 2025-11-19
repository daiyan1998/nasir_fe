import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationV1Props {
  page?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}
export function PaginationV1({page, totalPages, onPageChange} : PaginationV1Props) {
 const pages = Array.from({length: totalPages}, (_ , i) => i + 1)
  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(page - 1, 1))}
            aria-disabled={page === 1}
            type="button"
          />
        </PaginationItem>
        {pages.map((p) => (
        <PaginationItem key={p}>
          <PaginationLink onClick={() => onPageChange(p)} isActive ={p === page}>{p}</PaginationLink>
        </PaginationItem>
        ))}
          <PaginationEllipsis />
        <PaginationItem>
          <PaginationNext 
            onClick={() => onPageChange(Math.min(page + 1, totalPages))}
            aria-disabled={page === totalPages}
            type="button"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
