import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      {/* <ScrollRestoration /> */}

      <Outlet />
      <Footer />
    </>
  );
}
