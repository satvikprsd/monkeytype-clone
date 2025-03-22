import Image from "next/image";
import Header from "./pages/Header";
import Main from "./pages/Main";
import Footer from "./pages/Footer";
import "@fontsource/lexend-deca"; // Defaults to weight 400
import "@fontsource/lexend-deca/400.css"; // Specify weight

export default function Home() {
  return (
    <div className="app">
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet"></link>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
