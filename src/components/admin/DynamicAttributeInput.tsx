import { useState } from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Attribute } from '@/types/Attribute.type'

interface DynamicAttributeInputProps {
  attribute: Attribute
  control: Control<any>
  name: string
  required?: boolean
  error?: FieldError
}

export function DynamicAttributeInput({ 
  attribute, 
  control,
  name,
  required = false, 
  error 
}: DynamicAttributeInputProps) {
  const [multiSelectInput, setMultiSelectInput] = useState('')

  const handleMultiSelectAdd = (currentValues: string[] = [], onChange: (value: any) => void) => {
    if (!multiSelectInput.trim()) return
    
    if (!currentValues.includes(multiSelectInput.trim())) {
      onChange([...currentValues, multiSelectInput.trim()])
    }
    setMultiSelectInput('')
  }

  const handleMultiSelectRemove = (item: string, currentValues: string[] = [], onChange: (value: any) => void) => {
    onChange(currentValues.filter((v: string) => v !== item))
  }

  const handlePredefinedValueToggle = (optionId: string, currentValues: string[] = [], onChange: (value: any) => void) => {
    if (currentValues.includes(optionId)) {
      onChange(currentValues.filter(v => v !== optionId))
    } else {
      onChange([...currentValues, optionId])
    }
  }

  const renderInput = () => {
    switch (attribute.type) {
      case 'TEXT':
        return (
          <Controller
            name={name}
            control={control}
            rules={{ required: required ? `${attribute.name} is required` : false }}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value || ''}
                placeholder={`Enter ${attribute.name.toLowerCase()}`}
                className={error ? 'border-destructive' : ''}
              />
            )}
          />
        )

      case 'NUMBER':
        return (
          <Controller
            name={name}
            control={control}
            rules={{ required: required ? `${attribute.name} is required` : false }}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || '')}
                  placeholder={`Enter ${attribute.name.toLowerCase()}`}
                  className={error ? 'border-destructive' : ''}
                />
                {attribute.unit && (
                  <span className="text-sm text-muted-foreground">{attribute.unit}</span>
                )}
              </div>
            )}
          />
        )

      case 'BOOLEAN':
        return (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Switch
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                />
                <Label>{field.value ? 'Yes' : 'No'}</Label>
              </div>
            )}
          />
        )

      case 'SELECT':
        return (
          <Controller
            name={name}
            control={control}
            rules={{ required: required ? `${attribute.name} is required` : false }}
            render={({ field }) => (
              <Select value={field.value || ''} onValueChange={field.onChange}>
                <SelectTrigger className={error ? 'border-destructive' : ''}>
                  <SelectValue placeholder={`Select ${attribute.name.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  {attribute.attributeValues?.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.value} {attribute.unit && `(${attribute.unit})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )

      case 'MULTI_SELECT':
        return (
          <Controller
            name={name}
            control={control}
            rules={{ 
              required: required ? `${attribute.name} is required` : false,
              validate: (value) => {
                if (required && (!Array.isArray(value) || value.length === 0)) {
                  return `${attribute.name} is required`
                }
                return true
              }
            }}
            render={({ field }) => {
              const currentValues = Array.isArray(field.value) ? field.value : []
              
              return (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={multiSelectInput}
                      onChange={(e) => setMultiSelectInput(e.target.value)}
                      placeholder={`Add ${attribute.name.toLowerCase()}`}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleMultiSelectAdd(currentValues, field.onChange)
                        }
                      }}
                      className={error ? 'border-destructive' : ''}
                    />
                    <Button 
                      type="button" 
                      onClick={() => handleMultiSelectAdd(currentValues, field.onChange)} 
                      size="sm"
                    >
                      Add
                    </Button>
                  </div>
                  
                  {attribute.attributeValues && attribute.attributeValues.length > 0 && (
                    <div>
                      <Label className="text-sm text-muted-foreground">Or select from predefined values:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {attribute.attributeValues.map((option) => (
                          <Badge
                            key={option.id}
                            variant={currentValues.includes(option.id) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => handlePredefinedValueToggle(option.id, currentValues, field.onChange)}
                          >
                            {option.value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {currentValues.length > 0 && (
                    <div>
                      <Label className="text-sm">Selected values:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {currentValues.map((item: string) => {
                          // Find the display value for predefined options
                          const predefinedOption = attribute.attributeValues?.find(opt => opt.id === item)
                          const displayValue = predefinedOption ? predefinedOption.value : item
                          
                          return (
                            <Badge key={item} variant="secondary" className="flex items-center gap-1">
                              {displayValue}
                              <X 
                                className="h-3 w-3 cursor-pointer" 
                                onClick={() => handleMultiSelectRemove(item, currentValues, field.onChange)}
                              />
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            }}
          />
        )

      default:
        return (
          <Controller
            name={name}
            control={control}
            rules={{ required: required ? `${attribute.name} is required` : false }}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value || ''}
                placeholder={`Enter ${attribute.name.toLowerCase()}`}
                className={error ? 'border-destructive' : ''}
              />
            )}
          />
        )
    }
  }

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-1">
        {attribute.name}
        {required && <span className="text-destructive">*</span>}
        {attribute.unit && !['boolean'].includes(attribute.type.toLowerCase()) && (
          <span className="text-sm text-muted-foreground">({attribute.unit})</span>
        )}
      </Label>
      {renderInput()}
      {error && (
        <p className="text-sm text-destructive">{error.message}</p>
      )}
    </div>
  )
}