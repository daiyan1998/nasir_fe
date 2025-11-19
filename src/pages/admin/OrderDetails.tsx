import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Printer,
  Mail,
  Package,
  CreditCard,
  MapPin,
  User,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useGetOrderById } from "@/hooks/queries/useOrderQuery";
import { Order } from "@/types/Order.type";
import { useUpdateOrderStatus } from "@/hooks/mutations/useOrderMutation";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  // const order = orders.find(o => o.id === id)

  // hooks
  const { mutate: updateOrderStatus } = useUpdateOrderStatus();
  const { data: orderResponse } = useGetOrderById(id);
  const order = orderResponse?.data;

  const [currentStatus, setCurrentStatus] = useState<Order["status"]>(
    order?.status || "PENDING"
  );
  const [emailNotifications, setEmailNotifications] = useState(true);

  const subTotal = order?.items.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  if (!order) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/admin/orders")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Order not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: Order["status"]) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      confirmed: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      shipped: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      delivered: "bg-green-100 text-green-800 hover:bg-green-100",
      cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
    };

    return (
      <Badge variant="outline" className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: Order["paymentStatus"]) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      paid: "bg-green-100 text-green-800 hover:bg-green-100",
      failed: "bg-red-100 text-red-800 hover:bg-red-100",
      refunded: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    };

    return (
      <Badge variant="outline" className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleStatusUpdate = () => {
    // In a real app, this would update the order in the database
    updateOrderStatus({ id: order.id, status: currentStatus });
  };

  const handlePrint = () => {
    window.print();
  };

  const statusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "CONFIRMED", label: "Confirmed" },
    { value: "SHIPPED", label: "Shipped" },
    { value: "DELIVERED", label: "Delivered" },
    { value: "CANCELLED", label: "Cancelled" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/admin/orders")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{order.orderNumber}</h1>
            <p className="text-muted-foreground">
              Placed on {format(new Date(order.createdAt), "MMMM dd, yyyy")}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print Order
          </Button>
          {getStatusBadge(order.status)}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    {/* <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-md"
                    /> */}
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                      <div>
                        {item.selectedOptions !== null && Object.entries(item.selectedOptions).map(
                          ([key, value], index) => (
                            <div key={index}>
                              {key}: {value as string}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ৳{parseFloat(item.price) * item.quantity}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ৳ {item.price} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>৳ {subTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>৳ {order.taxAmount || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>৳ {order.shippingCost}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total:</span>
                  <span>৳ {order.totalAmount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Timeline */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Order Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.statusHistory.map((history, index) => (
                  <div key={history.id} className="flex items-start gap-4">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      index === 0 ? 'bg-brand-orange' : 'bg-muted-foreground'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(history.status)}
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(history.timestamp), 'MMM dd, yyyy HH:mm')}
                        </span>
                      </div>
                      {history.notes && (
                        <p className="text-sm text-muted-foreground mt-1">{history.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Management */}
          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Order Status</Label>
                <Select
                  defaultValue={order?.status}
                  onValueChange={(value: Order["status"]) =>
                    setCurrentStatus(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
                <Label htmlFor="email-notifications" className="text-sm">
                  Send email notification
                </Label>
              </div>

              <Button
                onClick={handleStatusUpdate}
                className="w-full bg-brand-orange hover:bg-brand-orange/90"
                disabled={currentStatus === order.status}
              >
                Update Status
              </Button>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p className="text-sm text-muted-foreground">
                  {order.shippingAddress.phone || "N/A"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {order.shippingAddress?.email || "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            {/* <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Payment Method:</span>
                <span className="text-sm font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Status:</span>
                {getPaymentStatusBadge(order.paymentStatus)}
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Transaction ID:</span>
                <span className="text-sm font-mono">{order.transactionId}</span>
              </div>
              
              {order.paymentStatus === 'paid' && (
                <Button variant="outline" className="w-full mt-4">
                  <Mail className="mr-2 h-4 w-4" />
                  Issue Refund
                </Button>
              )}
            </CardContent> */}
          </Card>
        </div>
      </div>
    </div>
  );
}
