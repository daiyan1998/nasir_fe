import { Label } from "@/components/ui/label";
import {
  Truck,
  CreditCard,
  Wallet,
  MapPin,
  Phone,
  User,
  CloudCog,
} from "lucide-react";
import { CartItem as OrderItem } from "@/types/Cart.type";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOrder } from "@/hooks/mutations/useOrderMutation";
import { useGetProfile } from "@/hooks/queries/useProfileQuery";
import { useEffect, useState } from "react";
import { IMG_URL } from "@/utils/constants";
import { OrderSuccess } from "./OrderSuccess";
import { Spinner } from "../ui/spinner";
import { Link } from "react-router-dom";
import { Order } from "@/types/Order.type";

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  comingSoon?: boolean;
}

interface PaymentFormProps {
  items: OrderItem[];
  subtotal: number;
  total: number;
}

const checkoutSchema = z.object({
  userId: z.string().optional(),
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(6, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().optional(),
  notes: z.string().optional(),
  payment: z.string().min(1, "Select a payment method"),
});

export function PaymentForm({ items, subtotal, total }: PaymentFormProps) {
  const [orderResponse, setOrderResponse] = useState<Order | null>(null);

  const products = items.map((item) => item.id);
  const { data: user } = useGetProfile();

  const sanitizedItems = items.map((item) => ({
    selectedOptions: item.selectedOptions,
    productId: item.id,
    quantity: item.quantity,
  }));

  // hooks
  const {
    mutateAsync: createOrder,
    data: createOrderResponse,
    isPending: isCreatingOrder,
    isSuccess: isOrderSuccess,
  } = useCreateOrder();
  console.log(createOrderResponse);

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      userId: user?.data?.id,
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      // state: "",
      zipCode: "",
      notes: "",
      payment: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("userId", user.data.id);
      form.setValue("email", user.data.email);
      form.setValue("fullName", user.data.fullName);
    }
  }, [user, form]);

  const paymentMethods: PaymentMethod[] = [
    {
      id: "cod",
      name: "Cash on Delivery",
      description: "Pay when your order is delivered to your doorstep",
      icon: <Truck className="h-5 w-5" />,
      enabled: true,
    },
    // {
    //   id: 'card',
    //   name: 'Credit/Debit Card',
    //   description: 'Pay securely with your card',
    //   icon: <CreditCard className="h-5 w-5" />,
    //   enabled: false,
    //   comingSoon: true
    // },
    // {
    //   id: 'wallet',
    //   name: 'Digital Wallet',
    //   description: 'PayPal, Apple Pay, Google Pay',
    //   icon: <Wallet className="h-5 w-5" />,
    //   enabled: false,
    //   comingSoon: true
    // }
  ];

  async function handlePlaceOrder(values: z.infer<typeof checkoutSchema>) {
    const orderResponse = await createOrder({
      userId: values.userId,
      items: sanitizedItems,
      paymentMethod: values.payment,
      shippingAddress: {
        fullName: values.fullName,
        phone: values.phone,
        email: values.email,
        address: values.address,
        city: values.city,
        zipCode: values.zipCode,
        notes: values.notes,
      },
    });
    if (orderResponse) {
      setOrderResponse(orderResponse.data);
    }
  }

  // Show order success screen after order is placed
  if (isOrderSuccess) {
    return <OrderSuccess order={orderResponse} />;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Link to="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handlePlaceOrder)}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={`${IMG_URL}${item.images?.[0]}` || ""}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium">
                      ৳ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>৳ {subtotal.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>৳ {total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment & Shipping Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Information
                </CardTitle>
                <CardDescription>
                  Where should we deliver your order?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="3ePdD@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Main Street, Apt 4B"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input placeholder="Dhaka" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="1205" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Special delivery instructions..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
                <CardDescription>
                  Choose how you'd like to pay for your order
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="payment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="space-y-3"
                        >
                          {paymentMethods.map((method: any) => (
                            <div
                              key={method.id}
                              className="flex items-center space-x-3"
                            >
                              <RadioGroupItem
                                value={method.id}
                                id={method.id}
                                disabled={!method.enabled}
                              />
                              <Label
                                htmlFor={method.id}
                                className={`flex-1 flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                                  !method.enabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-muted/50"
                                } ${
                                  field.value === method.id
                                    ? "bg-muted border-primary"
                                    : ""
                                }`}
                              >
                                <div className="mt-0.5">{method.icon}</div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">
                                      {method.name}
                                    </span>
                                    {method.comingSoon && (
                                      <Badge
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        Coming Soon
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {method.description}
                                  </p>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("payment") === "cod" && (
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Truck className="h-5 w-5 mt-0.5 text-brand-orange" />
                      <div>
                        <h4 className="font-medium">Cash on Delivery</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          You'll pay in cash when your order is delivered.
                          Please have the exact amount ready:{" "}
                          <strong>৳ {total.toFixed(2)}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Place Order Button */}
            <Button
              size="lg"
              type="submit"
              className="w-full bg-brand-orange hover:bg-brand-orange/90"
            >
              {isCreatingOrder ? (
                <span className="flex items-center gap-2">
                  {" "}
                  <Spinner /> Placing order...
                </span>
              ) : (
                `Place Order - ৳ ${total.toFixed(2)}`
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
