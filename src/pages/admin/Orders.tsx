import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DataTable, Column } from '@/components/admin/DataTable'
import { orders as initialOrders, Order } from '@/lib/mockData'
import { Plus, Download, Calendar, DollarSign, Package, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const getStatusBadge = (status: Order['status']) => {
    const variants = {
      pending: 'secondary',
      confirmed: 'outline',
      shipped: 'default',
      delivered: 'default',
      cancelled: 'destructive'
    }
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      confirmed: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      shipped: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
      delivered: 'bg-green-100 text-green-800 hover:bg-green-100',
      cancelled: 'bg-red-100 text-red-800 hover:bg-red-100'
    }
    
    return (
      <Badge variant={variants[status] as any} className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getPaymentStatusBadge = (status: Order['paymentStatus']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      paid: 'bg-green-100 text-green-800 hover:bg-green-100',
      failed: 'bg-red-100 text-red-800 hover:bg-red-100',
      refunded: 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
    
    return (
      <Badge variant="outline" className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const columns: Column<Order>[] = [
    {
      key: 'orderNumber',
      header: 'Order #',
      render: (order) => (
        <div>
          <div className="font-medium text-brand-orange cursor-pointer hover:underline"
               onClick={() => navigate(`/admin/orders/${order.id}`)}>
            {order.orderNumber}
          </div>
          <div className="text-sm text-muted-foreground">
            {format(new Date(order.orderDate), 'MMM dd, yyyy')}
          </div>
        </div>
      )
    },
    {
      key: 'customerName',
      header: 'Customer',
      render: (order) => (
        <div>
          <div className="font-medium">{order.customerName}</div>
          <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (order) => getStatusBadge(order.status)
    },
    {
      key: 'total',
      header: 'Total',
      render: (order) => (
        <div className="font-medium">${order.total.toFixed(2)}</div>
      )
    },
    {
      key: 'paymentStatus',
      header: 'Payment',
      render: (order) => getPaymentStatusBadge(order.paymentStatus)
    },
    {
      key: 'items',
      header: 'Items',
      render: (order) => (
        <div className="text-sm">
          {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions'
    }
  ]

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesSearch = searchQuery === '' || 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesStatus && matchesSearch
  })

  const handleExportCSV = () => {
    const csvData = filteredOrders.map(order => ({
      'Order Number': order.orderNumber,
      'Customer Name': order.customerName,
      'Customer Email': order.customerEmail,
      'Order Date': order.orderDate,
      'Status': order.status,
      'Payment Status': order.paymentStatus,
      'Total': order.total.toFixed(2),
      'Items Count': order.items.reduce((sum, item) => sum + item.quantity, 0)
    }))

    const headers = Object.keys(csvData[0]).join(',')
    const rows = csvData.map(row => Object.values(row).join(','))
    const csv = [headers, ...rows].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orders-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleViewOrder = (order: Order) => {
    navigate(`/admin/orders/${order.id}`)
  }

  // Stats calculations
  const totalRevenue = orders.reduce((sum, order) => 
    order.paymentStatus === 'paid' ? sum + order.total : sum, 0
  )
  const pendingOrders = orders.filter(order => order.status === 'pending').length
  const completedOrders = orders.filter(order => order.status === 'delivered').length
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track customer orders
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button className="bg-brand-orange hover:bg-brand-orange/90">
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              From {orders.filter(o => o.paymentStatus === 'paid').length} paid orders
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              Need processing
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders}</div>
            <p className="text-xs text-muted-foreground">
              Successfully delivered
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Per order
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>
                {filteredOrders.length} of {orders.length} orders
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredOrders}
            columns={columns}
            searchKey="orderNumber"
            onEdit={handleViewOrder}
          />
        </CardContent>
      </Card>
    </div>
  )
}