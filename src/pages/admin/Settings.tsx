import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { Settings, Globe, Mail, DollarSign, Clock, Image as ImageIcon } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ImageFile {
  id: string
  file: File
  preview: string
}

export default function SettingsPage() {
  const { toast } = useToast()
  const [logoImages, setLogoImages] = useState<ImageFile[]>([])
  const [faviconImages, setFaviconImages] = useState<ImageFile[]>([])

  // Site Configuration
  const [siteConfig, setSiteConfig] = useState({
    siteName: 'TechStore',
    tagline: 'Your one-stop shop for electronics',
    description: 'We offer the latest technology products with fast shipping and great customer service.',
    contactEmail: 'contact@techstore.com',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Tech Street, Digital City, DC 12345',
    socialMedia: {
      facebook: 'https://facebook.com/techstore',
      twitter: 'https://twitter.com/techstore',
      instagram: 'https://instagram.com/techstore'
    }
  })

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'noreply@techstore.com',
    smtpPassword: '',
    fromEmail: 'noreply@techstore.com',
    fromName: 'TechStore',
    enableNotifications: true,
    orderConfirmation: true,
    shipmentNotification: true,
    promotionalEmails: false
  })

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    currency: 'USD',
    currencySymbol: '$',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12',
    enableReviews: true,
    enableWishlist: true,
    enableGuestCheckout: true,
    requireEmailVerification: false,
    maintenanceMode: false,
    analyticsCode: '',
    seoMetaDescription: 'Shop the latest electronics and gadgets at TechStore.',
    seoKeywords: 'electronics, gadgets, phones, laptops, tech'
  })

  const handleSaveSiteConfig = () => {
    // In a real app, this would save to backend
    toast({
      title: "Site configuration saved",
      description: "Your site settings have been updated successfully."
    })
  }

  const handleSaveEmailSettings = () => {
    toast({
      title: "Email settings saved",
      description: "Your email configuration has been updated successfully."
    })
  }

  const handleSaveGeneralSettings = () => {
    toast({
      title: "General settings saved",
      description: "Your general settings have been updated successfully."
    })
  }

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney'
  ]

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Configure your store settings and preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="site" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="site" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Site Settings
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Settings
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        {/* Site Settings */}
        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle>Site Configuration</CardTitle>
              <CardDescription>
                Configure your store's basic information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name *</Label>
                  <Input
                    id="siteName"
                    value={siteConfig.siteName}
                    onChange={(e) => setSiteConfig(prev => ({ ...prev, siteName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={siteConfig.tagline}
                    onChange={(e) => setSiteConfig(prev => ({ ...prev, tagline: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={siteConfig.description}
                  onChange={(e) => setSiteConfig(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={siteConfig.contactEmail}
                      onChange={(e) => setSiteConfig(prev => ({ ...prev, contactEmail: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={siteConfig.contactPhone}
                      onChange={(e) => setSiteConfig(prev => ({ ...prev, contactPhone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={siteConfig.address}
                    onChange={(e) => setSiteConfig(prev => ({ ...prev, address: e.target.value }))}
                    rows={2}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Social Media</h3>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input
                      id="facebook"
                      value={siteConfig.socialMedia.facebook}
                      onChange={(e) => setSiteConfig(prev => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, facebook: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter URL</Label>
                    <Input
                      id="twitter"
                      value={siteConfig.socialMedia.twitter}
                      onChange={(e) => setSiteConfig(prev => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram URL</Label>
                    <Input
                      id="instagram"
                      value={siteConfig.socialMedia.instagram}
                      onChange={(e) => setSiteConfig(prev => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSiteConfig} className="bg-brand-orange hover:bg-brand-orange/90">
                  Save Site Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>
                Configure SMTP settings and email notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">SMTP Configuration</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">SMTP Username</Label>
                    <Input
                      id="smtpUsername"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUsername: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromName">From Name</Label>
                    <Input
                      id="fromName"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableNotifications">Enable Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Master switch for all email notifications</p>
                    </div>
                    <Switch
                      id="enableNotifications"
                      checked={emailSettings.enableNotifications}
                      onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, enableNotifications: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="orderConfirmation">Order Confirmation</Label>
                      <p className="text-sm text-muted-foreground">Send confirmation emails for new orders</p>
                    </div>
                    <Switch
                      id="orderConfirmation"
                      checked={emailSettings.orderConfirmation}
                      onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, orderConfirmation: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="shipmentNotification">Shipment Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send emails when orders are shipped</p>
                    </div>
                    <Switch
                      id="shipmentNotification"
                      checked={emailSettings.shipmentNotification}
                      onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, shipmentNotification: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="promotionalEmails">Promotional Emails</Label>
                      <p className="text-sm text-muted-foreground">Send marketing and promotional emails</p>
                    </div>
                    <Switch
                      id="promotionalEmails"
                      checked={emailSettings.promotionalEmails}
                      onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, promotionalEmails: checked }))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveEmailSettings} className="bg-brand-orange hover:bg-brand-orange/90">
                  Save Email Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure store-wide settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Localization</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={generalSettings.currency}
                      onValueChange={(value) => {
                        const currency = currencies.find(c => c.code === value)
                        setGeneralSettings(prev => ({ 
                          ...prev, 
                          currency: value,
                          currencySymbol: currency?.symbol || '$'
                        }))
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.name} ({currency.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={generalSettings.timezone}
                      onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, timezone: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timezones.map((tz) => (
                          <SelectItem key={tz} value={tz}>
                            {tz}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select
                      value={generalSettings.dateFormat}
                      onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, dateFormat: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeFormat">Time Format</Label>
                    <Select
                      value={generalSettings.timeFormat}
                      onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, timeFormat: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12 Hour (AM/PM)</SelectItem>
                        <SelectItem value="24">24 Hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Store Features</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableReviews">Product Reviews</Label>
                      <p className="text-sm text-muted-foreground">Allow customers to review products</p>
                    </div>
                    <Switch
                      id="enableReviews"
                      checked={generalSettings.enableReviews}
                      onCheckedChange={(checked) => setGeneralSettings(prev => ({ ...prev, enableReviews: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableWishlist">Wishlist Feature</Label>
                      <p className="text-sm text-muted-foreground">Allow customers to save products for later</p>
                    </div>
                    <Switch
                      id="enableWishlist"
                      checked={generalSettings.enableWishlist}
                      onCheckedChange={(checked) => setGeneralSettings(prev => ({ ...prev, enableWishlist: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableGuestCheckout">Guest Checkout</Label>
                      <p className="text-sm text-muted-foreground">Allow purchases without account creation</p>
                    </div>
                    <Switch
                      id="enableGuestCheckout"
                      checked={generalSettings.enableGuestCheckout}
                      onCheckedChange={(checked) => setGeneralSettings(prev => ({ ...prev, enableGuestCheckout: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="requireEmailVerification">Email Verification</Label>
                      <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                    </div>
                    <Switch
                      id="requireEmailVerification"
                      checked={generalSettings.requireEmailVerification}
                      onCheckedChange={(checked) => setGeneralSettings(prev => ({ ...prev, requireEmailVerification: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Put the store in maintenance mode</p>
                    </div>
                    <Switch
                      id="maintenanceMode"
                      checked={generalSettings.maintenanceMode}
                      onCheckedChange={(checked) => setGeneralSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">SEO & Analytics</h3>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="seoMetaDescription">Meta Description</Label>
                    <Textarea
                      id="seoMetaDescription"
                      value={generalSettings.seoMetaDescription}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, seoMetaDescription: e.target.value }))}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seoKeywords">Keywords</Label>
                    <Input
                      id="seoKeywords"
                      value={generalSettings.seoKeywords}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, seoKeywords: e.target.value }))}
                      placeholder="electronics, gadgets, phones"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="analyticsCode">Analytics Code</Label>
                    <Textarea
                      id="analyticsCode"
                      value={generalSettings.analyticsCode}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, analyticsCode: e.target.value }))}
                      placeholder="Google Analytics tracking code"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveGeneralSettings} className="bg-brand-orange hover:bg-brand-orange/90">
                  Save General Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize your store's visual appearance and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Brand Assets</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Logo</Label>
                    <p className="text-sm text-muted-foreground">Upload your store logo (recommended: 200x50px)</p>
                    {/* TODO : Fix Image Uploader */}
                    {/* <ImageUploader
                      images={logoImages}
                      onImagesChange={setLogoImages}
                      maxImages={1}
                    /> */}
                  </div>

                  <div className="space-y-2">
                    <Label>Favicon</Label>
                    <p className="text-sm text-muted-foreground">Upload your favicon (recommended: 32x32px)</p>
                    {/* TODO : Fix Image Uploader */}
                    {/* <ImageUploader
                      images={faviconImages}
                      onImagesChange={setFaviconImages}
                      maxImages={1}
                    /> */}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-brand-orange hover:bg-brand-orange/90">
                  Save Appearance Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}