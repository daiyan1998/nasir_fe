import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DataTable, Column } from '@/components/admin/DataTable'
import { Modal } from '@/components/ui/modal'
import { users as initialUsers, User } from '@/lib/mockData'
import { Plus, Users, UserCheck, UserX, Shield } from 'lucide-react'
import { format } from 'date-fns'
import { useToast } from '@/hooks/use-toast'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const { toast } = useToast()

  const getRoleBadge = (role: User['role']) => {
    return role === 'admin' ? (
      <Badge variant="default" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
        <Shield className="w-3 h-3 mr-1" />
        Admin
      </Badge>
    ) : (
      <Badge variant="secondary">Customer</Badge>
    )
  }

  const getStatusBadge = (status: User['status']) => {
    return status === 'active' ? (
      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
        Active
      </Badge>
    ) : (
      <Badge variant="destructive">Inactive</Badge>
    )
  }

  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'User',
      render: (user) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Role',
      render: (user) => getRoleBadge(user.role)
    },
    {
      key: 'registrationDate',
      header: 'Registration',
      render: (user) => (
        <div className="text-sm">
          {format(new Date(user.registrationDate), 'MMM dd, yyyy')}
        </div>
      )
    },
    {
      key: 'totalOrders',
      header: 'Orders',
      render: (user) => (
        <div className="text-center">
          <div className="font-medium">{user.totalOrders}</div>
          <div className="text-xs text-muted-foreground">${user.totalSpent.toFixed(2)}</div>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (user) => getStatusBadge(user.status)
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      render: (user) => (
        <div className="text-sm">
          {user.lastLogin ? format(new Date(user.lastLogin), 'MMM dd, yyyy') : 'Never'}
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions'
    }
  ]

  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesRole && matchesStatus && matchesSearch
  })

  const handleViewDetails = (user: User) => {
    setSelectedUser(user)
    setIsDetailsOpen(true)
  }

  const handleToggleStatus = (user: User) => {
    setUsers(prev => prev.map(u => 
      u.id === user.id 
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    ))
    toast({
      title: "User status updated",
      description: `${user.name} has been ${user.status === 'active' ? 'deactivated' : 'activated'}.`
    })
  }

  const handleToggleRole = (user: User) => {
    setUsers(prev => prev.map(u => 
      u.id === user.id 
        ? { ...u, role: u.role === 'admin' ? 'customer' : 'admin' }
        : u
    ))
    toast({
      title: "User role updated",
      description: `${user.name} is now ${user.role === 'admin' ? 'a customer' : 'an admin'}.`
    })
  }

  // Stats calculations
  const totalUsers = users.length
  const activeUsers = users.filter(user => user.status === 'active').length
  const adminUsers = users.filter(user => user.role === 'admin').length
  const totalRevenue = users.reduce((sum, user) => sum + user.totalSpent, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <Button className="bg-brand-orange hover:bg-brand-orange/90">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {activeUsers} active users
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((activeUsers / totalUsers) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminUsers}</div>
            <p className="text-xs text-muted-foreground">
              With admin access
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer LTV</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / (totalUsers - adminUsers)).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Average per customer
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                {filteredUsers.length} of {users.length} users
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
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
            data={filteredUsers}
            columns={columns}
            searchKey="name"
            onEdit={handleViewDetails}
            customActions={(user) => (
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(user)}
                >
                  {user.status === 'active' ? 'Deactivate' : 'Activate'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleRole(user)}
                >
                  Make {user.role === 'admin' ? 'Customer' : 'Admin'}
                </Button>
              </div>
            )}
          />
        </CardContent>
      </Card>

      {/* User Details Modal */}
      {selectedUser && (
        <Modal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          title="User Details"
          description={`View detailed information for ${selectedUser.name}`}
          className="max-w-2xl"
        >
          <div className="space-y-6">
            {/* User Info */}
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                <AvatarFallback>{selectedUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                <p className="text-muted-foreground">{selectedUser.email}</p>
                {selectedUser.phone && (
                  <p className="text-sm text-muted-foreground">{selectedUser.phone}</p>
                )}
                <div className="flex gap-2 mt-2">
                  {getRoleBadge(selectedUser.role)}
                  {getStatusBadge(selectedUser.status)}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold">{selectedUser.totalOrders}</div>
                <div className="text-sm text-muted-foreground">Total Orders</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold">${selectedUser.totalSpent.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold">
                  {selectedUser.totalOrders > 0 ? (selectedUser.totalSpent / selectedUser.totalOrders).toFixed(2) : '0.00'}
                </div>
                <div className="text-sm text-muted-foreground">Avg Order Value</div>
              </div>
            </div>

            {/* Account Info */}
            <div className="space-y-3">
              <h4 className="font-medium">Account Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Registration Date:</span>
                  <div>{format(new Date(selectedUser.registrationDate), 'MMMM dd, yyyy')}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Login:</span>
                  <div>{selectedUser.lastLogin ? format(new Date(selectedUser.lastLogin), 'MMMM dd, yyyy') : 'Never'}</div>
                </div>
              </div>
            </div>

            {/* Addresses */}
            {selectedUser.addresses.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Addresses</h4>
                <div className="space-y-2">
                  {selectedUser.addresses.map((address) => (
                    <div key={address.id} className="p-3 border rounded-lg text-sm">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{address.type}</Badge>
                        {address.isDefault && <Badge variant="default" className="text-xs">Default</Badge>}
                      </div>
                      <div>
                        <div>{address.street}</div>
                        <div>{address.city}, {address.state} {address.zipCode}</div>
                        <div>{address.country}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}