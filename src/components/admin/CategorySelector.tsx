import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Category } from '@/types/Category.type'
// import { Category } from '@/lib/mockData'

interface CategorySelectorProps {
  categories: Category[]
  value: string
  onChange: (categoryId: string) => void
  required?: boolean
  error?: string
}

export function CategorySelector({ categories, value, onChange, required = false, error }: CategorySelectorProps) {
  const flattenCategories = (cats: Category[], level = 0): Array<Category & { level: number }> => {
    const result: Array<Category & { level: number }> = []
    
    cats?.forEach(cat => {
      result.push({ ...cat, level })
      if (cat.children && cat.children.length > 0) {
        result.push(...flattenCategories(cat.children, level + 1))
      }
    })
    
    return result
  }

  const flatCategories = flattenCategories(categories)

  console.log(flatCategories(categories).map(c => c.id))

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-1">
        Category
        {required && <span className="text-destructive">*</span>}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={error ? 'border-destructive' : ''}>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {flatCategories?.map((category, index) => (
            <SelectItem key={`${ category.id }${index}`} value={category.id}>
              <div className="flex items-center">
                <span style={{ marginLeft: `${category.level * 16}px` }}>
                  {category.level > 0 && '↳ '}
                  {category.name}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}