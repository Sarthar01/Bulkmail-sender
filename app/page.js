import "./globals.css";
import MainContent from "./components/email-sender";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <MainContent/>
      <Footer />
    </div>
  );
}