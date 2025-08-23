import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X, Upload, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageFile {
  id: string
  file: File
  preview: string
  isPrimary?: boolean
}

interface ImageUploaderProps {
  images: ImageFile[]
  onImagesChange: (images: ImageFile[]) => void
  maxImages?: number
  acceptedTypes?: string[]
}

export function ImageUploader({ 
  images, 
  onImagesChange, 
  maxImages = 10,
  acceptedTypes = ['image/*']
}: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages: ImageFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      isPrimary: images.length === 0 // First image is primary by default
    }))

    const updatedImages = [...images, ...newImages].slice(0, maxImages)
    onImagesChange(updatedImages)
  }, [images, maxImages, onImagesChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles: maxImages - images.length,
    disabled: images.length >= maxImages
  })

  const removeImage = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id)
    
    // If we removed the primary image, make the first remaining image primary
    if (updatedImages.length > 0 && !updatedImages.some(img => img.isPrimary)) {
      updatedImages[0].isPrimary = true
    }
    
    onImagesChange(updatedImages)
  }

  const setPrimaryImage = (id: string) => {
    const updatedImages = images.map(img => ({
      ...img,
      isPrimary: img.id === id
    }))
    onImagesChange(updatedImages)
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive 
              ? "border-brand-orange bg-brand-orange/5" 
              : "border-muted-foreground/25 hover:border-brand-orange/50"
          )}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          {isDragActive ? (
            <p className="text-lg font-medium">Drop the files here...</p>
          ) : (
            <div>
              <p className="text-lg font-medium mb-2">Drag & drop images here</p>
              <p className="text-muted-foreground mb-4">or click to select files</p>
              <Button type="button" variant="outline">
                Choose Files
              </Button>
            </div>
          )}
          <p className="text-sm text-muted-foreground mt-2">
            {maxImages - images.length} more images allowed
          </p>
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="relative overflow-hidden">
              <div className="aspect-square relative group">
                <img
                  src={image.preview}
                  alt="Upload preview"
                  className="w-full h-full object-cover"
                />
                
                {/* Primary Badge */}
                {image.isPrimary && (
                  <div className="absolute top-2 left-2 bg-brand-orange text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Primary
                  </div>
                )}

                {/* Actions Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {!image.isPrimary && (
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => setPrimaryImage(image.id)}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => removeImage(image.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {images.length} of {maxImages} images uploaded. 
          {images.find(img => img.isPrimary) && ' Click the star to set a different primary image.'}
        </p>
      )}
    </div>
  )
}