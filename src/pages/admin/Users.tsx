import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DataTable, Column } from '@/components/admin/DataTable'
import { Modal } from '@/components/ui/modal'
import { Plus, Users, UserCheck, UserX, Shield } from 'lucide-react'
import { format } from 'date-fns'
import { useToast } from '@/hooks/use-toast'
import { User } from '@/types/User.type'
import { useGetUsers } from '@/hooks/queries/useUserQuery'
import { AddressType } from '@/types/Address.type'
import { useUpdateUser } from '@/hooks/mutations/useUserMutation'

export default function UsersPage() {
  const {mutate: updateUser} = useUpdateUser()
  const { data: usersData, isLoading } = useGetUsers()
  const users = usersData?.data || []
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const { toast } = useToast()

  // Helper functions to calculate derived values
  const getUserName = (user: User) => `${user?.fullName}`
  // const getUserInitials = (user: User) => `${user?.firstName[0]}${user?.lastName[0]}`
  const getTotalOrders = (user: User) => user?.orders?.length || 0
  const getTotalSpent = (user: User) => {
    if (!user?.orders || user?.orders.length === 0) return 0
    return user?.orders.reduce((sum, order) => sum + parseFloat(order.totalAmount || '0'), 0)
  }
  const getRegistrationDate = (user: User) => {
    if (!user?.orders || user?.orders.length === 0) return null
    const dates = user?.orders.map(o => new Date(o.createdAt)).filter(d => !isNaN(d.getTime()))
    return dates.length > 0 ? new Date(Math.min(...dates.map(d => d.getTime()))) : null
  }

  const getRoleBadge = (role: string) => {
    return role === 'ADMIN' || role === 'ADMIN' ? (
      <Badge variant="default" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
        <Shield className="w-3 h-3 mr-1" />
        Admin
      </Badge>
    ) : (
      <Badge variant="secondary">Customer</Badge>
    )
  }

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
        Active
      </Badge>
    ) : (
      <Badge variant="destructive">Inactive</Badge>
    )
  }

  const columns: Column<User>[] = [
    {
      key: 'firstName',
      header: 'User',
      render: (user) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            {/* <AvatarFallback>{getUserInitials(user)}</AvatarFallback> */}
          </Avatar>
          <div>
            <div className="font-medium">{getUserName(user)}</div>
            <div className="text-sm text-muted-foreground">{user?.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Role',
      render: (user) => getRoleBadge(user?.role)
    },
    {
      key: 'email',
      header: 'Registration',
      render: (user) => {
        const regDate = getRegistrationDate(user)
        return (
          <div className="text-sm">
            {regDate ? format(regDate, 'MMM dd, yyyy') : 'N/A'}
          </div>
        )
      }
    },
    {
      key: 'id',
      header: 'Orders',
      render: (user) => {
        const totalOrders = getTotalOrders(user)
        const totalSpent = getTotalSpent(user)
        return (
          <div className="text-center">
            <div className="font-medium">{totalOrders}</div>
            <div className="text-xs text-muted-foreground">৳ {totalSpent.toFixed(2)}</div>
          </div>
        )
      }
    },
    {
      key: 'lastName',
      header: 'Status',
      render: (user) => getStatusBadge(user?.isActive)
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (user) => (
        <div className="text-sm">
          {user?.phone || 'N/A'}
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions'
    }
  ]

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const userName = getUserName(user).toLowerCase()
      const userRole = user?.role?.toLowerCase() || ''
      const matchesRole = roleFilter === 'all' || userRole === roleFilter.toLowerCase()
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'active' && user.isActive) ||
        (statusFilter === 'inactive' && !user.isActive)
      const matchesSearch = searchQuery === '' || 
        userName.includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesRole && matchesStatus && matchesSearch
    })
  }, [users, roleFilter, statusFilter, searchQuery])

  const handleViewDetails = (user: User) => {
    setSelectedUser(user)
    setIsDetailsOpen(true)
  }

  const handleToggleStatus = (user: User) => {
    const data = {
      isActive: !user.isActive
    }
    if(confirm(`Are you sure you want to ${user.isActive ? 'deactivate' : 'activate'} ${getUserName(user)}?`))
    updateUser({userId: user.id, profileData: data})
  }

  const handleToggleRole = (user: User) => {
   const data = {
      role: user.role === 'ADMIN' ? 'CUSTOMER' : 'ADMIN'
    }
    if(confirm(`Are you sure you want to ${user.role === 'admin' ? 'demote' : 'promote'} ${getUserName(user)}?`))
    updateUser({userId: user.id, profileData: data})
  }

  // Stats calculations
  const totalUsers = users.length
  const activeUsers = users.filter(user => user.isActive).length
  const adminUsers = users.filter(user => user.role?.toLowerCase() === 'admin').length
  const totalRevenue = users.reduce((sum, user) => sum + getTotalSpent(user), 0)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </div>
    )
  }

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
            <div className="text-2xl font-bold">
              ${totalUsers - adminUsers > 0 
                ? (totalRevenue / (totalUsers - adminUsers)).toFixed(2) 
                : '0.00'}
            </div>
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
            searchKey="email"
            onEdit={handleViewDetails}
            customActions={(user) => (
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(user)}
                >
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleRole(user)}
                >
                  Make {user.role?.toLowerCase() === 'admin' ? 'Customer' : 'Admin'}
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
          description={`View detailed information for ${getUserName(selectedUser)}`}
          className="max-w-2xl"
        >
          <div className="space-y-6">
            {/* User Info */}
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                {/* <AvatarFallback>{getUserInitials(selectedUser)}</AvatarFallback> */}
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{getUserName(selectedUser)}</h3>
                <p className="text-muted-foreground">{selectedUser.email}</p>
                {selectedUser.phone && (
                  <p className="text-sm text-muted-foreground">{selectedUser.phone}</p>
                )}
                <div className="flex gap-2 mt-2">
                  {getRoleBadge(selectedUser.role)}
                  {getStatusBadge(selectedUser.isActive)}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold">{getTotalOrders(selectedUser)}</div>
                <div className="text-sm text-muted-foreground">Total Orders</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold">৳ {getTotalSpent(selectedUser).toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold">
                  {getTotalOrders(selectedUser) > 0 
                    ? (getTotalSpent(selectedUser) / getTotalOrders(selectedUser)).toFixed(2) 
                    : '0.00'}
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
                  <div>
                    {getRegistrationDate(selectedUser) 
                      ? format(getRegistrationDate(selectedUser)!, 'MMMM dd, yyyy') 
                      : 'N/A'}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">User ID:</span>
                  <div className="font-mono text-xs">{selectedUser.id}</div>
                </div>
              </div>
            </div>

            {/* Addresses */}
            {selectedUser.addresses && selectedUser.addresses.length > 0 && (
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
                        <div className="font-medium">{address.fullName}</div>
                        {address.phone && <div className="text-xs text-muted-foreground">{address.phone}</div>}
                        <div className="mt-1">{address.address}</div>
                        <div>{address.city}, {address.state || ''} {address.zipCode}</div>
                        {address.country && <div>{address.country}</div>}
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