import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CloudCog, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Order, OrderItem } from "@/types/Order.type";

export function OrderSuccess({ order }: { order: Order }) {
  const navigate = useNavigate();

  if (!order) {
    return <div>Order not found</div>;
  }
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-none shadow-lg">
        <CardContent className="pt-12 pb-8 px-8">
          {/* Success Icon */}
          <div className="flex justify-center mb-6"></div>

          {/* Congratulations Message */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Congratulations {order?.shippingAddress.fullName}
            </h1>
            <p className="text-muted-foreground mb-2">
              Your order is received. Your order id:{" "}
              <span className="font-semibold text-brand-orange">
                {order.orderNumber}
              </span>
            </p>
            {/* <p className="text-muted-foreground">
              Your expected delivery time:{" "}
              <span className="font-semibold">{deliveryDays} days</span>
            </p> */}
          </div>

          {/* Order Items */}
          <div className="mb-6 space-y-4">
            {order.items?.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg"
              >
                <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                  <Package className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  {/* {item.variant && (
                    <p className="text-sm text-muted-foreground">
                      {item.variant}
                    </p>
                  )} */}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-muted-foreground">
                <span>
                  Total ({order.items?.length}{" "}
                  {order.items?.length === 1 ? "item" : "items"})
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span className="font-semibold">
                  {order.shippingAddress.address} {order.shippingAddress.city}{" "}
                  {order.shippingAddress.zipCode}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Discount</span>
                <span className="font-semibold text-foreground">
                  ৳ {order.discountAmount}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span> ৳ {order.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => navigate("/track-order")}
            >
              Track Your Order
            </Button>
            <Button
              size="lg"
              className="flex-1 bg-brand-orange hover:bg-brand-orange/90"
              onClick={() => navigate("/shop")}
            >
              Explore Product
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
