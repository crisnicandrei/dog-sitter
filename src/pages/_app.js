import Head from "next/head";
import { useEffect } from "react";

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
        <meta name="description" content="Câinele tău îi pe mâini bune!" />
        <meta name="keywords" content="Next.js, SEO, Example" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Azorel Hotel" />
        <meta
          property="og:description"
          content="Câinele tău îi pe mâini bune!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://example.com/" />
        <meta
          property="og:image"
          content="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
