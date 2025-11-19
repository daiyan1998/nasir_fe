import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface DataTableSkeletonProps {
  columns: number
  rows?: number
  searchable?: boolean
  filterable?: boolean
  withPagination?: boolean
  withBulkActions?: boolean
}

export function DataTableSkeleton({
  columns,
  rows = 5,
  searchable = true,
  filterable = true,
  withPagination = true,
  withBulkActions = true,
}: DataTableSkeletonProps) {
  return (
    <div className="space-y-4">
      {/* Search and Filters Skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {searchable && (
          <div className="relative flex-1">
            <Skeleton className="h-10 w-full" />
          </div>
        )}
        
        {filterable && (
          <div className="flex gap-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-40" />
            ))}
          </div>
        )}
      </div>

      {/* Bulk Actions Skeleton */}
      {withBulkActions && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      )}

      {/* Table Skeleton */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {withBulkActions && (
                <TableHead className="w-12">
                  <Skeleton className="h-4 w-4" />
                </TableHead>
              )}
              {Array.from({ length: columns }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {withBulkActions && (
                  <TableCell>
                    <Skeleton className="h-4 w-4" />
                  </TableCell>
                )}
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-4 w-full max-w-[200px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton */}
      {withPagination && (
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      )}
    </div>
  )
}