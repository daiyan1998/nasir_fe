import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import TrackOrder from "./pages/TrackOrder";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import Attributes from "./pages/admin/Attributes";
import Orders from "./pages/admin/Orders";
import OrderDetails from "./pages/admin/OrderDetails";
import Users from "./pages/admin/Users";
import Reviews from "./pages/admin/Reviews";
import Banners from "./pages/admin/Banners";
import Settings from "./pages/admin/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Tags from "./components/admin/Tags";
import AuthInitializer from "./components/auth/AuthInitializer";
import { ReturnPolicy } from "./pages/policy/ReturnPolicy";
import PrivacyPolicy from "./pages/policy/PrivacyPolicy";
import DeliveryTerms from "./pages/policy/DeliveryTerms";
import RootLayout from "./components/RootLayout";
import TermsAndConditions from "./pages/policy/TermsAndConditions";
import Brands from "./pages/admin/Brands";

const queryClient = new QueryClient();
// This code is only for TypeScript
// declare global {
//   interface Window {
//     __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
//   }
// }

// This code is for all users
// window.__TANSTACK_QUERY_CLIENT__ = queryClient;

const App = () => (
  <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          {/* <AuthInitializer> */}
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<RootLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/category/:categorySlug" element={<Shop />} />
                <Route path="/return-policy" element={<ReturnPolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/delivery-terms" element={<DeliveryTerms />} />
                <Route
                  path="/terms-and-conditions"
                  element={<TermsAndConditions />}
                />
                <Route path="*" element={<NotFound />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<Products />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="attributes" element={<Attributes />} />
                  <Route path="tags" element={<Tags />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="brands" element={<Brands />} />
                  <Route path="orders/:id" element={<OrderDetails />} />
                  <Route path="users" element={<Users />} />
                  <Route path="reviews" element={<Reviews />} />
                  <Route path="banners" element={<Banners />} />
                  {/* <Route path="settings" element={<Settings />} /> */}
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
          {/* </AuthInitializer> */}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </>
);

export default App;
