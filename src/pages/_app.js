import Head from "next/head";
import { useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

/*all css import*/
import "../../styles/main.css";
import "devextreme/dist/css/dx.light.css";

import { AuthProvider } from "../context/AuthContext.js";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("../../public/assets/js/bootstrap.bundle.min.js");
  });
  return (
    <>
      <Head>
        <title>Azorel Hotel</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Câinele tău este pe mâini bune!" />
        <meta
          name="keywords"
          content="Azorel Hotel, azorel hotel, azorel hotel timisoara, Azorel Hotel Timisoara, plimba cainele, cazeaza cainele, lasa in grija cainele, caine, Hotel căței, hotel catei, Hotel catei, hotel canin, Hotel Caini, hotel pentru caini, hotel de caini, Hotel de caini, Hotel pentru Caini"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Azorel Hotel" />
        <meta
          property="og:description"
          content="Câinele tău este pe mâini bune!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://azorelhotel.ro/" />
        <meta
          property="og:image"
          content="http://azorelhotel.ro/assets/images/image2.jpeg"
        />

        {/* Optional: Facebook App ID */}
        <meta property="fb:app_id" content="your_facebook_app_id" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
