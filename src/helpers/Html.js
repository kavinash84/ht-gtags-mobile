import React, { Component } from "react";
import PropTypes from "prop-types";
import serialize from "serialize-javascript";
import Helmet from "react-helmet";
import config from "config";

import { admitad, admitadSetCookie } from "utils/tracking";

import shell from "./shell";

// const ONESIGNALID = 'c84b6b57-cadf-4c15-ad82-82e4e5430382';
const { version } = require("../../package.json");

// const LogoIcon = require('../../static/logo.png');

// import { ga } from 'utils/tracking';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.shape({
      styles: PropTypes.object,
      javascript: PropTypes.object
    }),
    bundles: PropTypes.arrayOf(PropTypes.any),
    content: PropTypes.string,
    store: PropTypes.shape({
      getState: PropTypes.func
    }).isRequired,
    styleTags: PropTypes.array
  };

  static defaultProps = {
    assets: {},
    bundles: [],
    content: "",
    styleTags: []
  };

  render() {
    const { assets, store, content, bundles, styleTags } = this.props;
    let SF_CHAT = {
      url: "https://praxisretail.my.salesforce.com",
      liveAgentUrl: "https://praxisretail.secure.force.com/LiveAgent",
      version: "00D7F000006O16S",
      baseLiveAgentContentURL:
        "https://c.la2-c2-ukb.salesforceliveagent.com/content",
      deploymentId: "5727F0000009ARB",
      buttonId: "5732y000000PHDP",
      baseLiveAgentURL: "https://d.la2-c2-ukb.salesforceliveagent.com/chat",
      eswLiveAgentDevName:
        "EmbeddedServiceLiveAgent_Parent04I7F0000004DjiUAE_16c51bfeb82",
      jsUrl:
        "https://praxisretail.my.salesforce.com/embeddedservice/5.0/esw.min.js"
    };

    if (process.env.SF_ENV && process.env.SF_ENV !== "production") {
      SF_CHAT = {
        url: "https://praxisretail--produat.my.salesforce.com",
        liveAgentUrl: "https://produat-praxisretail.cs6.force.com/LiveAgent",
        version: "00DN0000000FXR7",
        baseLiveAgentContentURL:
          "https://c.la1-c1cs-hnd.salesforceliveagent.com/content",
        deploymentId: "5727F0000009ARB",
        buttonId: "573N000000000sa",
        baseLiveAgentURL: "https://d.la1-c1cs-hnd.salesforceliveagent.com/chat",
        eswLiveAgentDevName:
          "EmbeddedServiceLiveAgent_Parent04I7F0000004DjiUAE_16c51bfeb82",
        jsUrl:
          "https://praxisretail--produat.my.salesforce.com/embeddedservice/5.0/esw.min.js"
      };
    }

    let unbxdScripts = {};
    if (process.env.UNBXD && process.env.UNBXD === "production") {
      unbxdScripts = {
        autosuggestJs:
          "https://libraries.unbxdapi.com/prod-hometown808961566375586_autosuggest_mobile.js",
        autosuggestCss:
          "https://libraries.unbxdapi.com/prod-hometown808961566375586_autosuggest_mobile.css",
        searchJs:
          "https://libraries.unbxdapi.com/prod-hometown808961566375586_search_mobile.js",
        searchCss:
          "https://libraries.unbxdapi.com/prod-hometown808961566375586_search_mobile.css",
        noUiSliderJs:
          "https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.7.0/nouislider.min.js",
        noUiSliderCss:
          "https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.7.0/nouislider.css"
      };
    } else if (process.env.UNBXD && process.env.UNBXD === "beta") {
      unbxdScripts = {
        autosuggestJs:
          "https://sandbox.unbxd.io/dev-hometown808961566375617_autosuggest_mobile.js",
        autosuggestCss:
          "https://sandbox.unbxd.io/dev-hometown808961566375617_autosuggest_mobile.css",
        searchJs:
          "https://sandbox.unbxd.io/dev-hometown808961566375617_search_mobile.js",
        searchCss:
          "https://sandbox.unbxd.io/dev-hometown808961566375617_search_mobile.css",
        noUiSliderJs:
          "https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.7.0/nouislider.min.js",
        noUiSliderCss:
          "https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.7.0/nouislider.css"
      };
    } else {
      unbxdScripts = {
        autosuggestJs:
          "https://sandbox.unbxd.io/stage-hometown808961566375562_search_mobile.js",
        autosuggestCss:
          "https://sandbox.unbxd.io/stage-hometown808961566375562_search_mobile.css",
        searchJs:
          "https://sandbox.unbxd.io/stage-hometown808961566375562_autosuggest_mobile.js",
        searchCss:
          "https://sandbox.unbxd.io/stage-hometown808961566375562_autosuggest_mobile.css",
        noUiSliderJs:
          "https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.7.0/nouislider.min.js",
        noUiSliderCss:
          "https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.7.0/nouislider.css"
      };
    }

    const head = Helmet.renderStatic();
    /* eslint-disable react/no-danger */
    return (
      <html lang="en-US">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.ico" />

          <meta
            name="viewport"
            content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes"
          />
          <meta charSet="utf-8" />
          <link rel="manifest" href="/manifest.json" />

          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="HomeTown Mobile" />
          <meta name="apple-mobile-web-app-title" content="HomeTown Mobile" />
          <meta name="theme-color" content="#3677dd" />
          <meta name="msapplication-navbutton-color" content="#3677dd" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta
            name="msapplication-starturl"
            content={`/m-dist/${version}/index.html`}
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="facebook-domain-verification"
            content="zcpr8ig8hh8z1idybyhitvi7j4nic4"
          />
          {/* eslint-disable */}
          <link
            rel="preconnect"
            href="https://connect.facebook.net"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://bid.g.doubleclick.net"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://googleads.g.doubleclick.net"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://api.hometown.in"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://www.google-analytics.com"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://www.googleadservices.com"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://www.googletagmanager.com"
            crossOrigin=""
          />
          <link rel="preconnect" href="https://www.google.com" crossOrigin="" />
          <link
            rel="preconnect"
            href="https://www.google.co.in"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://service.force.com"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://c.la1-c1-hnd.salesforceliveagent.com"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://d.la1-c1-hnd.salesforceliveagent.com"
            crossOrigin=""
          />
          <link rel="preconnect" href="https://bat.bing.com" crossOrigin="" />
          <link
            rel="preconnect"
            href="https://static.criteo.net"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="http://static.criteo.net"
            crossOrigin=""
          />
          <link rel="preconnect" href="http://m.hometown.in" crossOrigin="" />
          {/* eslint-disable */}
          {styleTags}
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {assets.styles &&
            Object.keys(assets.styles).map(style => (
              <link
                as="style"
                href={assets.styles[style]}
                key={style}
                media="screen, projection"
                rel="stylesheet"
                type="text/css"
                charSet="UTF-8"
              />
            ))}

          {/* (will be present only in development mode) */}
          {assets.styles && Object.keys(assets.styles).length === 0 ? (
            <style
              dangerouslySetInnerHTML={{ __html: "#content{display:none}" }}
            />
          ) : null}
          {/* <script dangerouslySetInnerHTML={{ __html: newRelic }} /> */}
          {/* eslint-disable */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                .embeddedServiceHelpButton {
                  z-index: 16000001;
                }
                .embeddedServiceHelpButton .helpButton {
                  bottom: 0 !important;
                  right: 0 !important;
                  height: 38px !important;
                }
                .embeddedServiceHelpButton .helpButton .uiButton {
                  background-color: #515151;
                  background: #515151!important;
                  font-family: "Salesforce Sans", sans-serif;
                  box-sizing: content-box;
                  font-weight: bold;
                  font-size: 16px;
                  border-radius: 8px 8px 0 0 !important;
                  height: 38px !important;
                }
                .embeddedServiceHelpButton .embeddedServiceIcon::before {
                  color: #FFF !important;
                }
                .embeddedServiceHelpButton .helpButton .uiButton:focus {
                  outline: 1px solid #555555;
                }
                .embeddedServiceSidebarForm .backgroundImg, .embeddedServiceSidebarForm .backgroundImgColorMask {
                  height: 45px!important;
                  background-size: auto !important;
                }
                .embeddedServiceSidebarExtendedHeader {
                  margin: 0 12px !important;
                }
                span#headerTextLabel {
                  color: #ffffff;
                }
                .message {
                  border-style: hidden;
                  border-width: 1px;
                  color: white;
                  padding: 6px 8px 6px 6px;
                  margin: 0px !important;
                }
                .embeddedServiceLiveAgentStateChatHeader:not(.alert) .message {
                  white-space: normal !important;
                }
                .embeddedServiceLiveAgentStateChatHeader .content {
                  height: 168px;
                }
                @font-face {
                  font-family: 'Salesforce Sans';
                  src: url('https://www.sfdcstatic.com/system/shared/common/assets/fonts/SalesforceSans/SalesforceSans-Regular.woff') format('woff'),
                  url('https://www.sfdcstatic.com/system/shared/common/assets/fonts/SalesforceSans/SalesforceSans-Regular.ttf') format('truetype');
                  font-display: swap;
                }`
            }}
          />
          {/*Google tag (gtag.js)*/}
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-832074530"/>
          <script type="text/javascript">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-832074530');
          `}
          </script>
          <script src={admitad.src} async onError={admitad.onerror} />
        </head>
        <body>
          <noscript>
            Please enable JavaScript{" "}
            <span role="img" aria-label="cry">
              {" "}
              😭{" "}
            </span>
          </noscript>
          {__SERVER__ ? (
            <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <div id="content" dangerouslySetInnerHTML={{ __html: shell }} />
          )}

          {store && (
            <script
              defer
              dangerouslySetInnerHTML={{
                __html: `window.__data=${serialize(store.getState())};`
              }}
              charSet="UTF-8"
            />
          )}
          {__DLLS__ && (
            <script
              defer
              key="dlls__vendor"
              src="/m-dist/dlls/dll__vendor.js"
              charSet="UTF-8"
            />
          )}
          {assets.javascript && (
            <script defer src={assets.javascript.main} charSet="UTF-8" />
          )}
          {bundles.map(
            bundle =>
              bundle && (
                <script src={config.assetsPath + bundle.file} key={bundle.id} />
              )
          )}

          {/* (will be present only in development mode) */}
          {assets.styles && Object.keys(assets.styles).length === 0 ? (
            <script
              dangerouslySetInnerHTML={{
                __html:
                  'document.getElementById("content").style.display="block";'
              }}
            />
          ) : null}
          {/* <script defer dangerouslySetInnerHTML={{ __html: `${ga}` }} charSet="UTF-8" /> */}
          {/* <script defer dangerouslySetInnerHTML={{ __html: `${gtm}` }} charSet="UTF-8" /> */}
          {/* <Helmet>
            <script src="https://cdn.ravenjs.com/3.24.0/raven.min.js" crossOrigin="anonymous" />
            {process.env.NODE_ENV !== 'development' ? (
              <script>
                {`
                  Raven.config('https://e072a281afc44732a8976d0615f0e310@sentry.io/1254610', {
                  release: '${version.replace(/\./g, '-')}',
                  environment: 'mobile-production',
                  }).install()
              `}
              </script>
            ) : null}
          </Helmet> */}
          <script
            type="text/javascript"
            src="https://service.force.com/embeddedservice/5.0/esw.min.js"
          />
          <script
            type="text/javascript"
            src="https://c.la1-c1-hnd.salesforceliveagent.com/content/g/js/47.0/deployment.js"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
               liveagent.init('${SF_CHAT.baseLiveAgentURL}', '${SF_CHAT.deploymentId}', '${SF_CHAT.version}');
             `
            }}
            charSet="UTF-8"
          />

          <script src={unbxdScripts.autosuggestJs} defer />
          <script src={unbxdScripts.noUiSliderJs} defer />
          <script src={unbxdScripts.noUiSliderCss} defer />
          <link
            rel="stylesheet"
            type="text/css"
            href={unbxdScripts.autosuggestCss}
          />
          <script src={unbxdScripts.searchJs} />
          <script
            type="text/javascript"
            defer
            src="https://d21gpk1vhmjuf5.cloudfront.net/unbxdAnalytics.js"
          ></script>
          <link
            rel="stylesheet"
            type="text/css"
            href={unbxdScripts.searchCss}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                var emailId ='';
                var initESW = function(gslbBaseURL) {
                  embedded_svc.settings.displayHelpButton = true;
                  embedded_svc.settings.language = '';
                  embedded_svc.settings.defaultMinimizedText = 'Chat With Us';
                  //embedded_svc.settings.disabledMinimizedText = '...'; //(Defaults to Agent Offline)
                  //embedded_svc.settings.loadingText = 'Chat started'; //(Defaults to Loading)
                  //embedded_svc.settings.storageDomain = 'yourdomain.com';
                  // Settings for Live Agent
                  //embedded_svc.settings.directToButtonRouting = function(prechatFormData) {
                  // Dynamically changes the button ID based on what the visitor enters in the pre-chat form.
                  // Returns a valid button ID.
                  //};
                  embedded_svc.settings.prepopulatedPrechatFields = {
                    Email : emailId
                  };
                  //Sets the auto-population of pre-chat form fields
                  //embedded_svc.settings.fallbackRouting = []; //An array of button IDs, user IDs, or userId_buttonId
                  //embedded_svc.settings.offlineSupportMinimizedText = '...'; //(Defaults to Contact Us)
                  embedded_svc.settings.extraPrechatInfo = [{
                    "entityFieldMaps": [{
                      "doCreate":false,
                      "doFind":true,
                      "fieldName":"PersonEmail",
                      "isExactMatch":true,
                      "label":"Email"
                    }],
                    "entityName": "Account",
                    "linkToEntityName": "Case",
                    "linkToEntityField": "AccountId"
                  },
                  {
                    "entityName": "Case",
                    "showOnCreate": true,
                    "saveToTranscript": "CaseId",
                    "entityFieldMaps": [{
                      "isExactMatch": false,
                      "fieldName": "Subject",
                      "doCreate": true,
                      "doFind": false,
                      "label": "CaseSubject"
                    },
                    {
                      "isExactMatch": false,
                      "fieldName": "Status",
                      "doCreate": true,
                      "doFind": false,
                      "label": "CaseStatus"
                    },
                    {
                      "isExactMatch": false,
                      "fieldName": "Origin",
                      "doCreate": true,
                      "doFind": false,
                      "label": "CaseOrigin"
                    }]
                  }];
                  embedded_svc.settings.extraPrechatFormDetails = [{
                    "label": "CaseSubject",
                    "value": "Live Chat",
                    "displayToAgent": true
                  }, {
                    "label": "CaseStatus",
                    "value": "Open",
                    "displayToAgent": false
                  }, {
                    "label": "CaseOrigin",
                    "value": "Chat",
                    "displayToAgent": true
                  }];
                  embedded_svc.settings.enabledFeatures = ['LiveAgent'];
                  embedded_svc.settings.entryFeature = 'LiveAgent';
                  embedded_svc.init(
                    '${SF_CHAT.url}',
                    '${SF_CHAT.liveAgentUrl}',
                    gslbBaseURL,
                    '${SF_CHAT.version}',
                    'Chat_Deployment',
                    {
                      baseLiveAgentContentURL: '${SF_CHAT.baseLiveAgentContentURL}',
                      deploymentId: '${SF_CHAT.deploymentId}',
                      buttonId: '${SF_CHAT.buttonId}',
                      baseLiveAgentURL: '${SF_CHAT.baseLiveAgentURL}',
                      eswLiveAgentDevName: '${SF_CHAT.eswLiveAgentDevName}',
                      isOfflineSupportEnabled: true
                    }
                  );
              };
              if (!window.embedded_svc) {
                var s = document.createElement('script');
                s.setAttribute('src', '${SF_CHAT.jsUrl}');
                s.onload = function() {
                  initESW(null);
                };
                document.body.appendChild(s);
              } else {
                initESW('https://service.force.com');
              }`
            }}
            charSet="UTF-8"
          />

          <script
            defer
            dangerouslySetInnerHTML={{ __html: admitadSetCookie }}
          />
        </body>
      </html>
    );
    /* eslint-enable react/no-danger */
  }
}
