import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../styles/globals.css";
import "../styles/globals.css";
import AppWrapper from "../context/coffeeStoresContext";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
      <Footer />
    </AppWrapper>
  );
}

export default MyApp;
