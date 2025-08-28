import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Attribute, CategoryAttribute } from '@/lib/mockData'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { GripVertical, Plus, X } from 'lucide-react'
import { useGetCategories} from '@/hooks/queries/useCategoryQuery'

interface CategoryAttributeAssignmentProps {
  attributes: Attribute[]
  categoryAttributes: CategoryAttribute[]
  onSave: (categoryAttributes: CategoryAttribute[]) => void
  onCancel: () => void
}

export function CategoryAttributeAssignment({ 
  attributes, 
  categoryAttributes, 
  onSave, 
  onCancel 
}: CategoryAttributeAssignmentProps) {
  const [assignments, setAssignments] = useState<CategoryAttribute[]>(categoryAttributes)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  // hooks
  const {data: categories = []} = useGetCategories()


  // Flatten categories for easier access
  const flatCategories = categories.flatMap(cat => 
    cat.children && cat.children.length > 0? cat.children.map(child => ({ ...child, parentName: cat.name })) : [{ ...cat, parentName: undefined }]
  )
  useEffect(() => {
    if (flatCategories.length > 0 && !selectedCategory) {
      setSelectedCategory(flatCategories[0].id)
    }
  }, [flatCategories, selectedCategory])

  const getCategoryAssignments = (categoryId: string) => {
    return assignments
      .filter(ca => ca.categoryId === categoryId)
      .sort((a, b) => a.sortOrder - b.sortOrder)
  }


  const addAttributeToCategory = (categoryId: string, attributeId: string) => {
    const existingOrder = getCategoryAssignments(categoryId)
    const newAssignment: CategoryAttribute = {
      categoryId,
      attributeId,
      isRequired: false,
      sortOrder: existingOrder.length + 1
    }
    setAssignments(prev => [...prev, newAssignment])
  }

  const removeAttributeFromCategory = (categoryId: string, attributeId: string) => {
    setAssignments(prev => prev.filter(ca => 
      !(ca.categoryId === categoryId && ca.attributeId === attributeId)
    ))
  }

  const toggleRequired = (categoryId: string, attributeId: string) => {
    setAssignments(prev => prev.map(ca => 
      ca.categoryId === categoryId && ca.attributeId === attributeId
        ? { ...ca, isRequired: !ca.isRequired }
        : ca
    ))
  }

  const reorderAttributes = (categoryId: string, startIndex: number, endIndex: number) => {
    const categoryAssignments = getCategoryAssignments(categoryId)
    const [removed] = categoryAssignments.splice(startIndex, 1)
    categoryAssignments.splice(endIndex, 0, removed)
    
    // Update order
    const updatedAssignments = categoryAssignments.map((ca, index) => ({
      ...ca,
      order: index + 1
    }))
    
    setAssignments(prev => prev.map(ca => {
      const updated = updatedAssignments.find(ua => 
        ua.categoryId === ca.categoryId && ua.attributeId === ca.attributeId
      )
      return updated || ca
    }))
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return
    
    const categoryId = result.source.droppableId
    reorderAttributes(categoryId, result.source.index, result.destination.index)
  }

  const isAttributeAssigned = (categoryId: string, attributeId: string) => {
    return assignments.some(ca => ca.categoryId === categoryId && ca.attributeId === attributeId)
  }

  const getAvailableAttributes = (categoryId: string) => {
    return attributes.filter(attr => !isAttributeAssigned(categoryId, attr.id))
  }

  const handleSave = () => {
    onSave(assignments)
  }

  return (
    <div className="space-y-6">
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-4">
          {flatCategories.slice(0, 4).map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs">
              {category.parentName ? `${category.parentName} / ${category.name}` : category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {flatCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.parentName && `${category.parentName} / `}
                  Configure attributes for this category
                </p>
              </div>
              <Badge variant="outline">
                {getCategoryAssignments(category.id).length} attributes
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Assigned Attributes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Assigned Attributes</CardTitle>
                </CardHeader>
                <CardContent>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={category.id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="space-y-2 min-h-[200px]"
                        >
                          {getCategoryAssignments(category.id).map((assignment, index) => {
                            const attribute = attributes.find(a => a.id === assignment.attributeId)
                            if (!attribute) return null

                            return (
                              <Draggable
                                key={assignment.attributeId}
                                draggableId={assignment.attributeId}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className="flex items-center gap-2 p-3 border rounded-md bg-background"
                                  >
                                    <div {...provided.dragHandleProps}>
                                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium text-sm">{attribute.name}</span>
                                        <Badge variant="outline" className="text-xs">
                                          {attribute.type}
                                        </Badge>
                                        {assignment.isRequired && (
                                          <Badge variant="destructive" className="text-xs">
                                            Required
                                          </Badge>
                                        )}
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                      <Switch
                                        checked={assignment.isRequired}
                                        onCheckedChange={() => toggleRequired(category.id, attribute.id)}
                                        title="Required"
                                      />
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        onClick={() => removeAttributeFromCategory(category.id, attribute.id)}
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            )
                          })}
                          {provided.placeholder}
                          
                          {getCategoryAssignments(category.id).length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                              <p className="text-sm">No attributes assigned</p>
                              <p className="text-xs">Add attributes from the available list</p>
                            </div>
                          )}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </CardContent>
              </Card>

              {/* Available Attributes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Available Attributes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {getAvailableAttributes(category.id).map((attribute) => (
                      <div
                        key={attribute.id}
                        className="flex items-center gap-2 p-3 border rounded-md hover:bg-muted/50"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{attribute.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {attribute.type}
                            </Badge>
                            {attribute.isFilterable && (
                              <Badge variant="secondary" className="text-xs">
                                Filterable
                              </Badge>
                            )}
                          </div>
                          {attribute.unit && (
                            <p className="text-xs text-muted-foreground">Unit: {attribute.unit}</p>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addAttributeToCategory(category.id, attribute.id)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    ))}
                    
                    {getAvailableAttributes(category.id).length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p className="text-sm">All attributes assigned</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-brand-orange hover:bg-brand-orange/90">
          Save Assignments
        </Button>
      </div>
    </div>
  )
}