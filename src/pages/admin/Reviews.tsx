import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { DataTable, Column } from '@/components/admin/DataTable'
import { Modal } from '@/components/ui/modal'
import { reviews as initialReviews, Review } from '@/lib/mockData'
import { Star, MessageSquare, Shield, CheckCircle, XCircle, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { useToast } from '@/hooks/use-toast'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [ratingFilter, setRatingFilter] = useState<string>('all')
  const [verificationFilter, setVerificationFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const { toast } = useToast()

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-muted-foreground ml-1">({rating})</span>
      </div>
    )
  }

  const getStatusBadge = (status: Review['status']) => {
    const variants = {
      pending: { variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100', icon: Clock },
      approved: { variant: 'default' as const, color: 'bg-green-100 text-green-800 hover:bg-green-100', icon: CheckCircle },
      rejected: { variant: 'destructive' as const, color: 'bg-red-100 text-red-800 hover:bg-red-100', icon: XCircle }
    }
    
    const config = variants[status]
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const columns: Column<Review>[] = [
    {
      key: 'productName',
      header: 'Product',
      render: (review) => (
        <div>
          <div className="font-medium">{review.productName}</div>
          <div className="text-sm text-muted-foreground">{review.title}</div>
        </div>
      )
    },
    {
      key: 'customerName',
      header: 'Customer',
      render: (review) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={review.customerAvatar} alt={review.customerName} />
            <AvatarFallback>{review.customerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">{review.customerName}</div>
            {review.isVerifiedPurchase && (
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'rating',
      header: 'Rating',
      render: (review) => renderStars(review.rating)
    },
    {
      key: 'reviewDate',
      header: 'Date',
      render: (review) => (
        <div className="text-sm">
          {format(new Date(review.reviewDate), 'MMM dd, yyyy')}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (review) => getStatusBadge(review.status)
    },
    {
      key: 'helpful',
      header: 'Helpful',
      render: (review) => (
        <div className="text-center text-sm font-medium">
          {review.helpful}
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions'
    }
  ]

  const filteredReviews = reviews.filter(review => {
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter
    const matchesVerification = verificationFilter === 'all' || 
      (verificationFilter === 'verified' && review.isVerifiedPurchase) ||
      (verificationFilter === 'unverified' && !review.isVerifiedPurchase)
    const matchesSearch = searchQuery === '' || 
      review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesStatus && matchesRating && matchesVerification && matchesSearch
  })

  const handleViewDetails = (review: Review) => {
    setSelectedReview(review)
    setIsDetailsOpen(true)
  }

  const handleUpdateStatus = (reviewId: string, newStatus: Review['status']) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, status: newStatus }
        : review
    ))
    
    const review = reviews.find(r => r.id === reviewId)
    toast({
      title: "Review status updated",
      description: `Review by ${review?.customerName} has been ${newStatus}.`
    })
  }

  const handleToggleVerification = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, isVerifiedPurchase: !review.isVerifiedPurchase }
        : review
    ))
    
    const review = reviews.find(r => r.id === reviewId)
    toast({
      title: "Verification status updated",
      description: `Review by ${review?.customerName} verification status changed.`
    })
  }

  // Stats calculations
  const totalReviews = reviews.length
  const pendingReviews = reviews.filter(review => review.status === 'pending').length
  const approvedReviews = reviews.filter(review => review.status === 'approved').length
  const averageRating = reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : '0.0'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reviews</h1>
          <p className="text-muted-foreground">
            Manage customer reviews and ratings
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviews}</div>
            <p className="text-xs text-muted-foreground">
              Customer feedback
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReviews}</div>
            <p className="text-xs text-muted-foreground">
              Need moderation
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Reviews</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedReviews}</div>
            <p className="text-xs text-muted-foreground">
              Published reviews
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating}</div>
            <p className="text-xs text-muted-foreground">
              Out of 5 stars
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Reviews</CardTitle>
              <CardDescription>
                {filteredReviews.length} of {reviews.length} reviews
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
              <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredReviews}
            columns={columns}
            searchKey="productName"
            onEdit={handleViewDetails}
            customActions={(review) => (
              <div className="flex gap-1">
                {review.status === 'pending' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStatus(review.id, 'approved')}
                      className="text-green-600 hover:text-green-700"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStatus(review.id, 'rejected')}
                      className="text-red-600 hover:text-red-700"
                    >
                      Reject
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleVerification(review.id)}
                >
                  {review.isVerifiedPurchase ? 'Unverify' : 'Verify'}
                </Button>
              </div>
            )}
          />
        </CardContent>
      </Card>

      {/* Review Details Modal */}
      {selectedReview && (
        <Modal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          title="Review Details"
          description="View and manage review information"
          className="max-w-2xl"
        >
          <div className="space-y-6">
            {/* Product & Customer Info */}
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={selectedReview.customerAvatar} alt={selectedReview.customerName} />
                <AvatarFallback>{selectedReview.customerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{selectedReview.productName}</h3>
                <p className="text-sm text-muted-foreground">Reviewed by {selectedReview.customerName}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(selectedReview.reviewDate), 'MMMM dd, yyyy')}
                </p>
                <div className="flex gap-2 mt-2">
                  {getStatusBadge(selectedReview.status)}
                  {selectedReview.isVerifiedPurchase && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified Purchase
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Rating & Title */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {renderStars(selectedReview.rating)}
                <span className="font-medium text-lg">{selectedReview.title}</span>
              </div>
            </div>

            {/* Review Content */}
            <div className="space-y-3">
              <h4 className="font-medium">Review</h4>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm leading-relaxed">{selectedReview.comment}</p>
              </div>
            </div>

            {/* Helpfulness */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {selectedReview.helpful} people found this helpful
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t">
              {selectedReview.status === 'pending' && (
                <>
                  <Button
                    onClick={() => handleUpdateStatus(selectedReview.id, 'approved')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Approve Review
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleUpdateStatus(selectedReview.id, 'rejected')}
                  >
                    Reject Review
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                onClick={() => handleToggleVerification(selectedReview.id)}
              >
                {selectedReview.isVerifiedPurchase ? 'Mark as Unverified' : 'Mark as Verified'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}