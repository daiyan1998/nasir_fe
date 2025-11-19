import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, ChevronDown, Edit, Trash2, Eye, EyeOff, FolderOpen, Folder, Plus } from 'lucide-react'
import { Category } from '@/types/Category.type'

interface TreeViewProps {
  data: Category[]
  onEdit: (category: Category) => void
  onDelete: (categoryId: string) => void
  onToggleActive: (categoryId: string) => void
  onReorder: (newOrder: Category[]) => void
  onSelect?: (categoryId: string) => void
}

interface TreeNodeProps {
  category: Category
  level: number
  onEdit: (category: Category) => void
  onDelete: (categoryId: string) => void
  onToggleActive: (categoryId: string) => void
  onSelect?: (categoryId: string) => void
}

function TreeNode({ category, level, onEdit, onDelete, onToggleActive, onSelect }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasChildren = category.children && category.children.length > 0

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm(`Are you sure you want to delete "${category.name}"? This will also delete all subcategories.`)) {
      onDelete(category.id)
    }
  }

  const handleToggleActive = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleActive(category.id)
  }

  return (
    <div className="select-none">
      <div 
        className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 group cursor-pointer"
        style={{ paddingLeft: `${level * 24 + 8}px` }}
        onClick={() => onSelect?.(category.id)}
      >
        {/* Expand/Collapse Button */}
        <div className="w-4 h-4 flex items-center justify-center">
          {hasChildren ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0"
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </Button>
          ) : (
            <div className="h-3 w-3" />
          )}
        </div>

        {/* Folder Icon */}
        <div className="flex items-center">
          {hasChildren ? (
            isExpanded ? (
              <FolderOpen className="h-4 w-4 text-blue-500" />
            ) : (
              <Folder className="h-4 w-4 text-blue-500" />
            )
          ) : (
            <div className="h-4 w-4 rounded bg-muted" />
          )}
        </div>

        {/* Category Info */}
        <div className="flex-1 flex items-center gap-2">
          <span className="font-medium">{category.name}</span>
          <Badge variant={category.isActive ? 'default' : 'secondary'} className="text-xs">
            {category.isActive ? 'Active' : 'Inactive'}
          </Badge>
          {hasChildren && (
            <Badge variant="outline" className="text-xs">
              {category.children?.length} items
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleToggleActive}
            title={category.isActive ? 'Deactivate' : 'Activate'}
          >
            {category.isActive ? (
              <EyeOff className="h-3 w-3" />
            ) : (
              <Eye className="h-3 w-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(category)
            }}
            title="Edit"
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            onClick={handleDelete}
            title="Delete"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {category.children?.map((child) => (
            <TreeNode
              key={child.id}
              category={child}
              level={level + 1}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleActive={onToggleActive}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function TreeView({ data, onEdit, onDelete, onToggleActive, onReorder, onSelect }: TreeViewProps) {
  return (
    <div className="space-y-1">
      {data.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Folder className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No categories created yet</p>
          <p className="text-sm">Create your first category to get started</p>
        </div>
      ) : (
        data.map((category) => (
          <TreeNode
            key={category.id}
            category={category}
            level={0}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleActive={onToggleActive}
            onSelect={onSelect}
          />
        ))
      )}
    </div>
  )
}