import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DataTable, Column } from '@/components/admin/DataTable'
import { Modal } from '@/components/ui/modal'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { banners as initialBanners, Banner, categories } from '@/lib/mockData'
import { Plus, Image as ImageIcon, Calendar as CalendarIcon, Layout, Eye, EyeOff } from 'lucide-react'
import { format } from 'date-fns'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

interface ImageFile {
  id: string
  file: File
  preview: string
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>(initialBanners)
  const [positionFilter, setPositionFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [images, setImages] = useState<ImageFile[]>([])
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    linkUrl: '',
    buttonText: '',
    position: 'hero' as Banner['position'],
    categoryId: '',
    active: true
  })

  const getPositionBadge = (position: Banner['position']) => {
    const colors = {
      hero: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
      'category-top': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      'category-side': 'bg-green-100 text-green-800 hover:bg-green-100',
      footer: 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
    
    return (
      <Badge variant="outline" className={colors[position]}>
        {position.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </Badge>
    )
  }

  const getStatusBadge = (banner: Banner) => {
    if (!banner.active) {
      return <Badge variant="secondary">Inactive</Badge>
    }
    
    const now = new Date()
    const start = banner.startDate ? new Date(banner.startDate) : null
    const end = banner.endDate ? new Date(banner.endDate) : null
    
    if (start && now < start) {
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Scheduled</Badge>
    }
    
    if (end && now > end) {
      return <Badge variant="secondary">Expired</Badge>
    }
    
    return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
  }

  const columns: Column<Banner>[] = [
    {
      key: 'title',
      header: 'Banner',
      render: (banner) => (
        <div className="flex items-center gap-3">
          <img
            src={banner.image}
            alt={banner.title}
            className="w-16 h-10 object-cover rounded border"
          />
          <div>
            <div className="font-medium">{banner.title}</div>
            {banner.subtitle && (
              <div className="text-sm text-muted-foreground">{banner.subtitle}</div>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'position',
      header: 'Position',
      render: (banner) => getPositionBadge(banner.position)
    },
    {
      key: 'categoryId',
      header: 'Category',
      render: (banner) => {
        if (!banner.categoryId) return <span className="text-muted-foreground">—</span>
        const category = categories.find(c => c.id === banner.categoryId)
        return <span className="text-sm">{category?.name || 'Unknown'}</span>
      }
    },
    {
      key: 'active',
      header: 'Status',
      render: (banner) => getStatusBadge(banner)
    },
    {
      key: 'startDate',
      header: 'Schedule',
      render: (banner) => (
        <div className="text-sm">
          {banner.startDate && (
            <div>Start: {format(new Date(banner.startDate), 'MMM dd')}</div>
          )}
          {banner.endDate && (
            <div>End: {format(new Date(banner.endDate), 'MMM dd')}</div>
          )}
          {!banner.startDate && !banner.endDate && (
            <span className="text-muted-foreground">No schedule</span>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions'
    }
  ]

  const filteredBanners = banners.filter(banner => {
    const matchesPosition = positionFilter === 'all' || banner.position === positionFilter
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && banner.active) ||
      (statusFilter === 'inactive' && !banner.active)
    
    return matchesPosition && matchesStatus
  })

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner)
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || '',
      description: banner.description || '',
      linkUrl: banner.linkUrl || '',
      buttonText: banner.buttonText || '',
      position: banner.position,
      categoryId: banner.categoryId || '',
      active: banner.active
    })
    setImages([{
      id: '1',
      file: new File([''], 'existing'),
      preview: banner.image
    }])
    setStartDate(banner.startDate ? new Date(banner.startDate) : undefined)
    setEndDate(banner.endDate ? new Date(banner.endDate) : undefined)
    setIsFormOpen(true)
  }

  const handleDelete = (banner: Banner) => {
    setBanners(prev => prev.filter(b => b.id !== banner.id))
    toast({
      title: "Banner deleted",
      description: `${banner.title} has been deleted successfully.`
    })
  }

  const handleSave = () => {
    const bannerData: Partial<Banner> = {
      ...formData,
      image: images[0]?.preview || '',
      startDate: startDate?.toISOString().split('T')[0],
      endDate: endDate?.toISOString().split('T')[0],
      order: editingBanner?.order || banners.length + 1,
      createdAt: editingBanner?.createdAt || new Date().toISOString().split('T')[0]
    }

    if (editingBanner) {
      setBanners(prev => prev.map(b => 
        b.id === editingBanner.id 
          ? { ...b, ...bannerData } as Banner
          : b
      ))
      toast({
        title: "Banner updated",
        description: `${formData.title} has been updated successfully.`
      })
    } else {
      const newBanner: Banner = {
        id: Math.random().toString(36).substring(7),
        ...bannerData
      } as Banner
      
      setBanners(prev => [newBanner, ...prev])
      toast({
        title: "Banner created",
        description: `${formData.title} has been created successfully.`
      })
    }
    
    handleCloseForm()
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingBanner(null)
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      linkUrl: '',
      buttonText: '',
      position: 'hero',
      categoryId: '',
      active: true
    })
    setImages([])
    setStartDate(undefined)
    setEndDate(undefined)
  }

  const toggleBannerStatus = (banner: Banner) => {
    setBanners(prev => prev.map(b => 
      b.id === banner.id 
        ? { ...b, active: !b.active }
        : b
    ))
    toast({
      title: "Banner status updated",
      description: `${banner.title} has been ${banner.active ? 'deactivated' : 'activated'}.`
    })
  }

  // Stats calculations
  const totalBanners = banners.length
  const activeBanners = banners.filter(banner => banner.active).length
  const scheduledBanners = banners.filter(banner => {
    const now = new Date()
    const start = banner.startDate ? new Date(banner.startDate) : null
    return start && now < start
  }).length

  const allCategories = categories.flatMap(cat => 
    cat.children ? cat.children : [cat]
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Banners</h1>
          <p className="text-muted-foreground">
            Manage promotional banners and advertisements
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-brand-orange hover:bg-brand-orange/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Banner
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Banners</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBanners}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Banners</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeBanners}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledBanners}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Positions</CardTitle>
            <Layout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Available positions</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Banners</CardTitle>
              <CardDescription>
                {filteredBanners.length} of {banners.length} banners
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="hero">Hero</SelectItem>
                  <SelectItem value="category-top">Category Top</SelectItem>
                  <SelectItem value="category-side">Category Side</SelectItem>
                  <SelectItem value="footer">Footer</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredBanners}
            columns={columns}
            searchKey="title"
            onEdit={handleEdit}
            onDelete={handleDelete}
            customActions={(banner) => (
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleBannerStatus(banner)}
              >
                {banner.active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            )}
          />
        </CardContent>
      </Card>

      {/* Banner Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingBanner ? 'Edit Banner' : 'Add New Banner'}
        description={editingBanner ? 'Update banner information' : 'Create a new promotional banner'}
        className="max-w-4xl"
      >
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter banner title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Enter subtitle (optional)"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter banner description"
                rows={3}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Banner Image</h3>
            <ImageUploader
              images={images}
              onImagesChange={setImages}
              maxImages={1}
            />
          </div>

          {/* Link & Button */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Call to Action</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkUrl">Link URL</Label>
                <Input
                  id="linkUrl"
                  value={formData.linkUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkUrl: e.target.value }))}
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  value={formData.buttonText}
                  onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
                  placeholder="Shop Now"
                />
              </div>
            </div>
          </div>

          {/* Position & Category */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Placement</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Select
                  value={formData.position}
                  onValueChange={(value: Banner['position']) => setFormData(prev => ({ ...prev, position: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Hero Section</SelectItem>
                    <SelectItem value="category-top">Category Top</SelectItem>
                    <SelectItem value="category-side">Category Sidebar</SelectItem>
                    <SelectItem value="footer">Footer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category (Optional)</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {allCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Schedule (Optional)</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
            />
            <Label htmlFor="active">Active (banner will be visible)</Label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={handleCloseForm}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-brand-orange hover:bg-brand-orange/90">
              {editingBanner ? 'Update Banner' : 'Create Banner'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}