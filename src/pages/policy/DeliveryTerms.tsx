import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DeliveryTerms() {
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            Delivery Terms & Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed space-y-2">
          <p>Applicable for a limited time only.</p>
        </CardContent>
      </Card>

      {/* 1. Advance Payment Policy */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>1. Advance Payment Policy</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-3">
          <p>
            <strong>Orders up to BDT 1,000:</strong> Full payment in advance,
            including delivery charge.
          </p>
          <p>
            <strong>Orders above BDT 1,000:</strong> Up to 20% advance payment
            depending on product type.
          </p>
          <p>
            <strong>Store Pickup:</strong> Advance payment required based on
            product type and value.
          </p>
        </CardContent>
      </Card>

      {/* 2. Pre-Order Advance Payment */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>2. Pre-Order Advance Payment</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p>Advance amount is determined according to the specific product.</p>
        </CardContent>
      </Card>

      {/* 3. Pre-Order Delivery Timeline */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>3. Pre-Order Delivery Timeline</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>Standard delivery time: 7–10 working days.</p>
          <p>In some cases, delivery may take 15–20 working days.</p>
        </CardContent>
      </Card>

      {/* 4. Price Fluctuation */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>4. International Price Fluctuation Policy</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            If international market prices change, customers may be required to
            pay the difference.
          </p>
          <p>
            Alternatively, customers may request a refund of the advance
            payment.
          </p>
        </CardContent>
      </Card>

      {/* 5. Delivery Within Dhaka */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>5. Delivery Within Dhaka City (Selected Areas)</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>Cash on Delivery (COD) available for accessories.</p>
          <p>
            <strong>Delivery charge:</strong> BDT 60
          </p>
          <p>
            <strong>Delivery time:</strong> 24–72 hours (subject to courier
            policies)
          </p>
        </CardContent>
      </Card>

      {/* 6. Delivery Outside Dhaka — Devices */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>
            6. Delivery Outside Dhaka — Devices (Partial Payment)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            <strong>Delivery charge:</strong> Up to BDT 220
          </p>
          <p>Courier company condition charges apply.</p>
        </CardContent>
      </Card>

      {/* 7. Delivery Outside Dhaka — Accessories */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>
            7. Delivery Outside Dhaka — Accessories (Partial Payment)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            <strong>Delivery charge:</strong> Up to BDT 130
          </p>
          <p>Additional courier condition charges apply.</p>
        </CardContent>
      </Card>

      {/* 8. Delivery to Upazila/Thana */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>
            8. Delivery to Upazila/Thana Areas (Outside Dhaka)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>Full payment + delivery charge must be paid in advance.</p>
          <p>
            Couriers like Sundarban do not support cash handling at
            Upazila/Thana level.
          </p>
        </CardContent>
      </Card>

      {/* 9. Device Delivery Restrictions */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>9. Device Delivery Restrictions</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            Smartphones and tablets cannot be delivered to Upazila/Thana areas.
          </p>
          <p>Delivery is limited to district and divisional cities only.</p>
        </CardContent>
      </Card>

      {/* 10. Cut-off Time */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>10. Order Placement Cut-off Time</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>Orders must be placed before 5:00 PM.</p>
          <p>Orders placed after 5:00 PM will be processed the next day.</p>
        </CardContent>
      </Card>
    </div>
  );
}
