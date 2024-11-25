import React from "react";
import { Helmet } from "react-helmet";

const MetaPixel = ({ event = "PageView", eventData = {} }) => {
  const eventScript =
    event === "PageView"
      ? "fbq('track', 'PageView');"
      : `fbq('track', '${event}', ${JSON.stringify(eventData)});`;

  return (
    <Helmet>
      <script id="facebook-pixel-script">
        {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        window.fbq('init', '7553369394757926');
        ${eventScript}`
        }
      </script>
      <noscript id="facebook-pixel-image">
        {`<img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=7553369394757926&ev=PageView&noscript=1"
        />`}
      </noscript>
    </Helmet>
  );
};

export default MetaPixel;
