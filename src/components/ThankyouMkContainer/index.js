import React, { Component } from 'react';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import Heading from 'hometown-components/lib/Heading';
import Helmet from "react-helmet";
const mapIcon = require('../../../static/map-icon-primary.svg');
class ThankyouMkContainer extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    {/* Facebook Pixel Code  */}
                    <script>
                        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1024172491523922');
fbq('track', 'MKlead');
`}
                    </script>
                    <noscript>{`<img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=1024172491523922&ev=MKlead&noscript=1"
/>`}</noscript>
                    {/* End Facebook Pixel Code */}
                    {/* Facebook Pixel Code  */}
                    <script type="text/javascript">
                        {`
              window.addEventListener('load',function(){
                var x = 0;
                var myVar = setInterval(function(){
                  if(jQuery('h2:contains(Thank You For Your)').is(":visible")){
                    if(x == 0){
                      gtag('event', 'conversion', {'send_to': 'AW-832074530/h7wJCMXmzdcCEKLm4YwD'});
                      x = 1;
                    }
                    clearInterval(myVar);
                  }
                }, 1000);
              });
            `}
                    </script>
                    {/* End Facebook Pixel Code  */}
                </Helmet>
                <Div style={{ marginTop: '0px', marginBottom: '0px' }}>
                    <Div style={{ width: '100%', backgroundColor: '#f16333', padding: '30px', marginTop: '0px', marginBottom: '0px' }}>
                        <Heading style={{ fontSize: '28px', lineHeight: '40px', textAlign: 'center', color: 'white' }}>
                            THANK YOU <br /> FOR YOUR INTEREST
                        </Heading>
                    </Div>
                    <Div style={{ marginTop: '15px' }}>
                        <Text style={{ fontSize: '20px', lineHeight: '32px', textAlign: 'center', fontWeight: 'bold' }}>We are pleased to be part of creating <br /> your home interiors journey.</Text>
                        <Text style={{ fontSize: '18px', margin: '25px 40px', textAlign: 'center' }}>You can expect the following for your next steps in the process</Text>
                        <Div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '85%', margin: '0px 7.5%' }}>
                            <Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-50px' }}>
                                <Text style={{ fontSize: '110px', color: '#ababab' }}>1</Text>
                                <Text style={{ marginLeft: '10px', fontSize: '13px' }}>One of the experts from the team will be getting in touch with you to understand your needs better and guide you further.</Text>
                            </Div>
                            <Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-80px' }}>
                                <Text style={{ fontSize: '110px', color: '#ababab' }}>2</Text>
                                <Text style={{ marginLeft: '15px', fontSize: '13px' }}>The expert will help match you with the ideal designer and shedule a call with them for further consultation.</Text>
                            </Div>
                            <Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-80px' }}>
                                <Text style={{ fontSize: '110px', color: '#ababab' }}>3</Text>
                                <Text style={{ marginLeft: '15px', fontSize: '13px' }}>The designer will guide you through online consultation or you can walk in to your nearest HomeTown store and continue the journey.</Text>
                            </Div>
                        </Div>
                    </Div>
                    <Div style={{ width: '80%', marginLeft: '10%', marginBottom: '40px' }}>
                        <a
                            rel="noopener"
                            target="_blank"
                            href="https://www.hometown.in/store-locator"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "10px",
                                color: "rgba(51, 51, 51, 0.85)",
                                fontWeight: "bold"
                            }}
                        >
                            <img src={mapIcon} alt="Store Locator" />
                            <span>Find a HomeTown store near you.</span>
                        </a>
                    </Div>
                </Div>
            </div>
        );
    }
}
export default ThankyouMkContainer;