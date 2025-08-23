import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Package, ShoppingCart, DollarSign, Users, Plus, Eye } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const metrics = [
  {
    title: 'Total Products',
    value: '1,234',
    description: '+20.1% from last month',
    icon: Package,
    trend: 'up'
  },
  {
    title: 'Total Orders',
    value: '892',
    description: '+15.3% from last month',
    icon: ShoppingCart,
    trend: 'up'
  },
  {
    title: 'Revenue This Month',
    value: '$45,678',
    description: '+25.7% from last month',
    icon: DollarSign,
    trend: 'up'
  },
  {
    title: 'Active Users',
    value: '2,345',
    description: '+8.4% from last month',
    icon: Users,
    trend: 'up'
  }
]

const recentOrders = [
  {
    id: '#12345',
    customer: 'John Doe',
    date: '2024-01-15',
    status: 'completed',
    total: '$299.99'
  },
  {
    id: '#12344',
    customer: 'Jane Smith',
    date: '2024-01-15',
    status: 'processing',
    total: '$149.50'
  },
  {
    id: '#12343',
    customer: 'Mike Johnson',
    date: '2024-01-14',
    status: 'pending',
    total: '$789.00'
  },
  {
    id: '#12342',
    customer: 'Sarah Wilson',
    date: '2024-01-14',
    status: 'completed',
    total: '$99.99'
  },
  {
    id: '#12341',
    customer: 'Tom Brown',
    date: '2024-01-13',
    status: 'cancelled',
    total: '$399.99'
  }
]

const chartData = [
  { month: 'Jan', revenue: 25000 },
  { month: 'Feb', revenue: 28000 },
  { month: 'Mar', revenue: 32000 },
  { month: 'Apr', revenue: 29000 },
  { month: 'May', revenue: 35000 },
  { month: 'Jun', revenue: 42000 },
]

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'completed':
      return 'default'
    case 'processing':
      return 'secondary'
    case 'pending':
      return 'outline'
    case 'cancelled':
      return 'destructive'
    default:
      return 'outline'
  }
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, Admin!</h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>
              Revenue overview for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="hsl(var(--brand-orange))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest orders from your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{order.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to manage your store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button className="bg-brand-orange hover:bg-brand-orange/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              View Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}