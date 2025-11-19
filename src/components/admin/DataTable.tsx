import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'

export interface Column<T> {
  key: keyof T | 'actions'
  header: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchKey?: keyof T
  filters?: {
    key: keyof T
    label: string
    options: { label: string; value: string }[]
  }[]
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  customActions?: (item: T) => React.ReactNode
  onBulkDelete?: (items: T[]) => void
  onBulkAction?: (action: string, items: T[]) => void
  itemsPerPage?: number
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchKey,
  filters,
  onEdit,
  onDelete,
  customActions,
  onBulkDelete,
  onBulkAction,
  itemsPerPage = 10
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)

  // Filter and search data
  const filteredData = data?.filter(item => {
    // Search filter
    if (search && searchKey) {
      const searchValue = String(item[searchKey]).toLowerCase()
      if (!searchValue.includes(search.toLowerCase())) {
        return false
      }
    }

    // Active filters
    for (const [key, value] of Object.entries(activeFilters)) {
      if (value && value !== "all" && String(item[key as keyof T]) !== value) {
        return false
      }
    }

    return true
  })

  // Pagination
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData?.slice(startIndex, startIndex + itemsPerPage)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(paginatedData?.map(item => item.id)))
    } else {
      setSelectedItems(new Set())
    }
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedItems)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedItems(newSelected)
  }

  const isAllSelected = paginatedData?.length > 0 && paginatedData.every(item => selectedItems.has(item.id))
  const isSomeSelected = paginatedData?.some(item => selectedItems.has(item.id))
 
  if(data?.length === 0 || data === undefined) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No data found</p>
      </div>
    )
  }


  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {searchKey && (
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        {filters && (
          <div className="flex gap-2">
            {filters?.map((filter) => (
              <Select
                key={String(filter.key)}
                value={activeFilters[String(filter.key)] || ''}
                onValueChange={(value) => 
                  setActiveFilters(prev => ({ ...prev, [String(filter.key)]: value }))
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All {filter.label}</SelectItem>
                  {filter.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedItems.size > 0 && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
          <span className="text-sm text-muted-foreground">
            {selectedItems.size} selected
          </span>
          {onBulkDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                const selectedData = data.filter(item => selectedItems.has(item.id))
                onBulkDelete(selectedData)
                setSelectedItems(new Set())
              }}
            >
              Delete
            </Button>
          )}
          {onBulkAction && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const selectedData = data.filter(item => selectedItems.has(item.id))
                onBulkAction('activate', selectedData)
                setSelectedItems(new Set())
              }}
            >
              Activate
            </Button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  className={isSomeSelected && !isAllSelected ? "data-[state=checked]:bg-background" : ""}
                />
              </TableHead>
              {columns?.map((column) => (
                <TableHead key={String(column.key)}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.has(item.id)}
                    onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                  />
                </TableCell>
                {columns?.map((column) => (
                  <TableCell key={String(column.key)}>
                    {column.key === 'actions' ? (
                      customActions ? (
                        customActions(item)
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {onEdit && (
                              <DropdownMenuItem onClick={() => onEdit(item)}>
                                Edit
                              </DropdownMenuItem>
                            )}
                            {onDelete && (
                              <DropdownMenuItem 
                                onClick={() => onDelete(item)}
                                className="text-destructive"
                              >
                                Delete
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )
                    ) : column.render ? (
                      column.render(item)
                    ) : (
                      String(item[column.key])
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData?.length)} of{' '}
            {filteredData?.length} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}