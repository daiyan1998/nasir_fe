import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Package, Truck, MapPin } from "lucide-react";
import { toast } from "sonner";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const handleTrackOrder = () => {
    if (!orderId.trim() || !phoneNumber.trim()) {
      toast.error("Both Order ID and Phone Number are required");
      return;
    }

    if (orderId.trim() !== "232090") {
      toast.error("Invalid Order ID or Phone Number");
      return;
    }

    setShowOrderDetails(true);
    toast.success("Order found successfully!");
  };

  const orderSteps = [
    { id: 1, title: "Order Confirmation", icon: CheckCircle, active: true },
    { id: 2, title: "Order Processing", icon: Package, active: false },
    { id: 3, title: "Shipping", icon: Truck, active: false },
    { id: 4, title: "Completed", icon: MapPin, active: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Track Your Order</h1>
            <p className="text-muted-foreground">Enter your order details to track your package</p>
          </div>

          {/* Search Section */}
          <Card>
            <CardHeader>
              <CardTitle>Search Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orderId">Order ID</Label>
                  <Input
                    id="orderId"
                    type="text"
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleTrackOrder} className="w-full md:w-auto">
                Track Order
              </Button>
            </CardContent>
          </Card>

          {/* Order Details Section */}
          {showOrderDetails && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Order Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-semibold">#232090</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expected Delivery Time</p>
                      <p className="font-semibold">3-5 days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Progress Bar */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Progress value={25} className="w-full" />
                    <div className="grid grid-cols-4 gap-4">
                      {orderSteps.map((step) => {
                        const IconComponent = step.icon;
                        return (
                          <div
                            key={step.id}
                            className="flex flex-col items-center text-center space-y-2 cursor-pointer"
                          >
                            <div
                              className={`p-3 rounded-full ${
                                step.active
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <p
                              className={`text-sm font-medium ${
                                step.active ? "text-primary" : "text-muted-foreground"
                              }`}
                            >
                              {step.title}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ordered Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Ordered Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <img
                        src="/placeholder.svg"
                        alt="Galaxy S25 5G"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Galaxy S25 5G</h3>
                      <p className="text-primary font-bold">৳77,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sub Total (1 item)</span>
                      <span>৳77,000.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <span>৳0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span>৳0.00</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Amount</span>
                        <span className="text-primary">৳77,000.00</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;