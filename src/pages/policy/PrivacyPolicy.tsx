import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <>
      <div className="max-w-4xl mx-auto py-10 space-y-8">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed space-y-4">
            <p>
              This Privacy Policy describes how we collect, use, and protect
              your information when you interact with our website.
            </p>
          </CardContent>
        </Card>

        {/* Information Collection */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>What Information Do We Collect?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>
              We collect information from you when you register a product, place
              an order, or subscribe to our newsletter. You may be asked to
              enter your name, email address, mailing address, or phone number.
              You may also visit our site anonymously.
            </p>
          </CardContent>
        </Card>

        {/* Information Usage */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>How Do We Use Your Information?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>Your information may be used to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process transactions.</li>
              <li>
                Ensure successful delivery of purchased products or services.
              </li>
              <li>
                Send periodic emails related to your order, updates, or company
                news. You may unsubscribe using instructions included in each
                email.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Protection Measures */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>How Do We Protect Your Information?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>
              We implement security measures to maintain safety of your personal
              data. All sensitive information is transmitted via Secure Socket
              Layer (SSL) and encrypted into our payment gateway provider’s
              database.
            </p>
            <p>
              Your financial information (credit cards, social security numbers,
              etc.) is not stored on our servers after a transaction.
            </p>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Do We Use Cookies?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>
              Yes. Cookies help us remember items in your cart, save
              preferences, track advertisements, and analyze site traffic in
              order to improve the website experience.
            </p>
          </CardContent>
        </Card>

        {/* Disclosure */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>
              Do We Disclose Information to Outside Parties?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>
              We do not sell, trade, or transfer your personally identifiable
              information to outside parties, except trusted service providers
              who assist in website operations and agree to keep your
              information confidential.
            </p>
            <p>
              We may release information to comply with the law or protect
              rights, property, or safety.
            </p>
            <p>
              Non-personally identifiable visitor information may be used for
              marketing or advertising.
            </p>
          </CardContent>
        </Card>

        {/* Third Party Links */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Third-Party Links</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>
              Occasionally, third-party products or services may appear on our
              site. These sites have independent privacy policies and we are not
              responsible for their content or actions.
            </p>
          </CardContent>
        </Card>

        {/* Online Policy Scope */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Online Privacy Policy Only</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>
              This Privacy Policy applies only to information collected online
              and not to information collected offline.
            </p>
          </CardContent>
        </Card>

        {/* Terms */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Terms of Use</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p>
              Please read our Terms of Use for guidelines on proper use of this
              website.
            </p>
          </CardContent>
        </Card>

        {/* Consent */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Your Consent</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p>By using our site, you consent to our Privacy Policy.</p>
          </CardContent>
        </Card>

        {/* Changes */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>
              Changes to this Privacy Policy will be reflected on this page.
            </p>
            <p className="text-muted-foreground">Last modified: 25/11/2025</p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p>
              If you have any questions, contact us at
              <span className="font-medium"> info.fluxfords@gmail.com</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
