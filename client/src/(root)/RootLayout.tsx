import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main className="h-screen flex flex-col justify-between antialiased">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default RootLayout;
