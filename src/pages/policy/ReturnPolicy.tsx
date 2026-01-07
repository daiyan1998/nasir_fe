import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ReturnPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      {/* Main Policy Section */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Return Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            If your product is defective, damaged, incorrect, or incomplete at
            the time of delivery, please contact us within the applicable return
            window. Your product may be eligible for refund or replacement
            depending on the category and condition.
          </p>
          <p>
            Some products are not eligible for a return if the reason is “No
            longer needed”.
          </p>
        </CardContent>
      </Card>

      {/* Conditions */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Conditions for Returns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <ul className="list-disc pl-6 space-y-2">
            <li>The product must be unused and without any flaws.</li>
            <li>
              The product must include original tags, manuals, warranty cards,
              and accessories.
            </li>
            <li>
              The product must be returned in original, undamaged manufacturer
              packaging. If a second packaging layer was provided, return it in
              the same condition.
            </li>
            <li>Standard return timeline is 7–10 working days.</li>
            <li>
              If a returned product is in inadequate condition, we reserve the
              right to send it back.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Reasons For Return */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Return Reasons</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <ul className="list-disc pl-6 space-y-2">
            <li>Product is damaged, broken, or defective.</li>
            <li>Product is incorrect or incomplete.</li>
            <li>Product is no longer needed or you changed your mind.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Refund Table */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Refund Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment Method</TableHead>
                <TableHead>Refund Option</TableHead>
                <TableHead>Refund Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Debit / Credit Card</TableCell>
                <TableCell>Payment Reversal</TableCell>
                <TableCell>10 working days</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>EMI</TableCell>
                <TableCell>Card Payment Reversal</TableCell>
                <TableCell>10 working days</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rocket Wallet</TableCell>
                <TableCell>Wallet Reversal</TableCell>
                <TableCell>7 working days</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>DBBL Nexus</TableCell>
                <TableCell>Card Reversal</TableCell>
                <TableCell>7 working days</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>bKash</TableCell>
                <TableCell>Wallet Reversal</TableCell>
                <TableCell>5 working days</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cash on Delivery</TableCell>
                <TableCell>Bank Deposit</TableCell>
                <TableCell>5 working days</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fluxford Cash</TableCell>
                <TableCell>Fluxford Cash</TableCell>
                <TableCell>1 working day</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-sm text-muted-foreground mt-4">
            Refunds for other payment methods will be processed through the
            original payment channel.
          </p>
        </CardContent>
      </Card>

      {/* Modes of Refund */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Modes of Refund</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Bank Deposit:</strong> Account details must be correct and
            active.
          </p>
          <p>
            <strong>Debit / Credit Card:</strong>
            If refund doesn’t appear even after notification, please contact
            your bank.
          </p>
          <p>
            <strong>bKash / Rocket:</strong> Refund will be sent to the same
            mobile wallet used for payment.
          </p>
        </CardContent>
      </Card>

      {/* Delivery Timeline */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Delivery Timeline</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          Inside Dhaka: 5 days
          <br />
          Outside Dhaka: 10 days
        </CardContent>
      </Card>
    </div>
  );
}
