import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const customerSupport = [
    {
      title: "Customer Support",
      links: [
        { label: "Delivery Terms", href: "/delivery-terms" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
        { label: "Return Policy", href: "/return-policy" },
      ],
    },
  ];
  return (
    <footer className="bg-brand-dark text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-brand-orange mb-4">
              Gadgets
            </h3>
            <p className="text-gray-300 mb-4">
              Your trusted partner for the latest technology and electronics. We
              bring you premium quality products at the best prices.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-brand-orange" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-brand-orange" />
                <span>support@gadgets.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-brand-orange" />
                <span>123 Tech Street, Digital City, DC 12345</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="#"
                  className="hover:text-brand-orange transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-orange transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-orange transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-orange transition-colors"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-orange transition-colors"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-orange transition-colors"
                >
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            {customerSupport.map((item) => (
              <div key={item.title}>
                <h4 className="font-semibold mb-4">{item.title}</h4>
                <ul className="space-y-2 text-gray-300">
                  {item.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="hover:text-brand-orange transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          {/* <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest deals and product
              updates.
            </p>
            <div className="flex space-x-2 mb-4">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button className="bg-brand-orange hover:bg-brand-orange-light">
                Subscribe
              </Button>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-brand-orange transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-brand-orange transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-brand-orange transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-brand-orange transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div> */}
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
          <p>&copy; 2024 Gadgets. All rights reserved.</p>
          {/* <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-orange transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-brand-orange transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-brand-orange transition-colors">
              Cookie Policy
            </a>
          </div> */}
        </div>
        <div className="p-4 bg-white mt-10">
          <img src="/payment.png" alt="" className="aspect-auto" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
