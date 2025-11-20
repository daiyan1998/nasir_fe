import { useState } from "react";
import {
  User,
  Package,
  MapPin,
  Plus,
  Edit,
  Trash2,
  KeyRound,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetProfile } from "@/hooks/queries/useProfileQuery";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateProfilePassword } from "@/hooks/mutations/useProfileMutation";
import { useLogout } from "@/hooks/mutations/useAuthMutation";
import { Navigate } from "react-router-dom";
import { Order } from "@/types/Order.type";
import { Modal } from "@/components/ui/modal";
import { IMG_URL } from "@/utils/constants";

const Profile = () => {
  //   const [user, setUser] = useState(mockUser);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
   const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Filter orders for current user
  //   const userOrders = orders.filter(order => order.customerEmail === user.email);

  // hooks
  const {mutate: updatePassword} = useUpdateProfilePassword()
  const { data: userData, isLoading: isUserLoading } = useGetProfile();
  const {mutate: logout} = useLogout()

  const user = userData?.data;
  const userOrders = userData?.data?.orders;

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const changePasswordHandler = (data) => {
    updatePassword(data)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "default";
      case "PENDING":
        return "secondary";
      case "CONFIRMED":
        return "secondary";
      case "SHIPPED":
        return "outline";
      case "CANCELLED":
        return "destructive";
      default:
        return "secondary";
    }
  };

  if (isUserLoading) return <div>Loading...</div>;

  if(!user) return <Navigate to="/login" replace />

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            My Account
          </h1>

          <Button className="mb-4" onClick={() => logout()}>Logout</Button>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="addresses"
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                Addresses
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="change-password" className="flex items-center gap-2">
                <KeyRound className="h-4 w-4" />
                Change Password
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Manage your personal details
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditingProfile ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={user.fullName}
                        disabled={!isEditingProfile}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        disabled={!isEditingProfile}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={user.phone || ""}
                        disabled={!isEditingProfile}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Account Status</Label>
                      <div>
                        <Badge
                          variant={
                            user.isActive === true ? "default" : "secondary"
                          }
                        >
                          {user.isActive === true ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* <Separator />
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-foreground">{user.totalOrders}</div>
                      <div className="text-sm text-muted-foreground">Total Orders</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-foreground">${user.totalSpent.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Total Spent</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-foreground">{user.addresses.length}</div>
                      <div className="text-sm text-muted-foreground">Addresses</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">Member Since</div>
                      <div className="text-sm font-medium text-foreground">{new Date(user.registrationDate).toLocaleDateString()}</div>
                    </div>
                  </div> */}

                  {isEditingProfile && (
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditingProfile(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => setIsEditingProfile(false)}>
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Saved Addresses</CardTitle>
                      <CardDescription>
                        Manage your delivery addresses
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => setIsAddingAddress(!isAddingAddress)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Address
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isAddingAddress && (
                    <Card className="mb-6 border-primary">
                      <CardHeader>
                        <CardTitle className="text-lg">New Address</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="new-street">Street Address</Label>
                            <Input id="new-street" placeholder="123 Main St" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-city">City</Label>
                            <Input id="new-city" placeholder="New York" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-state">State</Label>
                            <Input id="new-state" placeholder="NY" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-zip">ZIP Code</Label>
                            <Input id="new-zip" placeholder="10001" />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="new-country">Country</Label>
                            <Input
                              id="new-country"
                              placeholder="United States"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setIsAddingAddress(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={() => setIsAddingAddress(false)}>
                            Save Address
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.addresses?.map((address) => (
                      <Card
                        key={address.id}
                        className={address.isDefault ? "border-primary" : ""}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-base capitalize">
                                {address.type}
                              </CardTitle>
                              {address.isDefault && (
                                <Badge variant="default">Default</Badge>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                            <p>{address.country}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View and track your orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userOrders?.map((order) => (
                      <Card key={order.id}>
                        <CardHeader>
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <CardTitle className="text-base">
                                  Order #{order.orderNumber}
                                </CardTitle>
                                <Badge variant={getStatusColor(order.status)}>
                                  {order.status}
                                </Badge>
                              </div>
                              <CardDescription>
                                Placed on{" "}
                                {new Date(order.createdAt).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-foreground">
                                ৳ {order.totalAmount}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {order.items.length} item(s)
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {/* <div className="space-y-3">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-4 py-2">
                                <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                                  {item.productImage ? (
                                    <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                                  ) : (
                                    <Package className="h-6 w-6 text-muted-foreground" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-foreground">{item.productName}</div>
                                  <div className="text-sm text-muted-foreground">
                                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                                  </div>
                                </div>
                                <div className="font-medium text-foreground">
                                  ${item.subtotal.toFixed(2)}
                                </div>
                              </div>
                            ))}
                          </div> */}
                          <Separator className="my-4" />
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                              Shipping to: {order.shippingAddress.city},{" "}
                              {order.shippingAddress.state}
                            </div>
                            <Button variant="outline" onClick={() => {
                                setSelectedOrder(order);
                                setIsOrderModalOpen(true);
                              }}>View Details</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Change Password Tab */}
            <TabsContent value="change-password">
              <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your account password below.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(changePasswordHandler)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter current password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter new password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Confirm new password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">
                        Change Password
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />

      {/* Order Details Modal */}
      <Modal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        title={selectedOrder ? `Order #${selectedOrder.orderNumber}` : "Order Details"}
        className="max-w-3xl"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Order Status and Date */}
            <div className="flex items-center justify-between">
              <div>
                <Badge variant={getStatusColor(selectedOrder.status)} className="mb-2">
                  {selectedOrder.status}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">
                  ৳ {selectedOrder.totalAmount}
                </div>
              </div>
            </div>

            <Separator />

            {/* Order Items */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Order Items</h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                    <div className="h-20 w-20 bg-background rounded-md flex items-center justify-center overflow-hidden">
                      {item.product.images && item.product.images.length > 0 ? (
                        <img src={`${IMG_URL}${item.product.images[0]}`} alt={item.product.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{item.product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Quantity: {item.quantity} × ৳ {item.price}
                      </div>
                    </div>
                    <div className="font-semibold text-foreground">
                      {/* ${item} */}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Shipping Address */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Shipping Address</h3>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium text-foreground">{selectedOrder.shippingAddress.fullName}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedOrder.shippingAddress.address}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedOrder.shippingAddress.country}
                </p>
              </div>
            </div>

            {/* Payment Information */}
            {/* <div>
              <h3 className="font-semibold text-foreground mb-3">Payment Method</h3>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-foreground capitalize">{selectedOrder.paymentMethod}</p>
              </div>
            </div> */}

            {/* Order Summary */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">৳ {selectedOrder.totalAmount}</span>
                </div>
                {/* <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">Free</span>
                </div> */}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">৳ {selectedOrder.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Profile;
