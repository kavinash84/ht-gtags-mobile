import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";
import { withRouter } from "react-router";
import { provideHooks } from "redial";
import { ThemeProvider } from "styled-components";
import Helmet from "react-helmet";
import { wrapDispatch } from "multireducer";
import { generateSession, isLoaded as isSessionSet } from "redux/modules/app";
import { isLoaded as isSectionLoaded } from "redux/modules/homepage";
import { formatProductURL } from "utils/helper";
import {
  loadWishlist,
  isLoaded as isWishListLoaded
} from "redux/modules/wishlist";
import {
  loadUserProfile,
  isLoaded as isProfileLoaded
} from "redux/modules/profile";
import { loadCart, isLoaded as isCartLoaded } from "redux/modules/cart";
import { loginUserAfterSignUp } from "redux/modules/login";
import { PINCODE } from "helpers/Constants";
import config from "config";
import Theme from "hometown-components/lib/Theme";
import Alert from "hometown-components/lib/Alert";
import * as notifActions from "redux/modules/notifs";
import Notifs from "components/Notifs";
import cookie from "js-cookie";
import { isLoaded as isHomeSectionLoaded } from "redux/modules/homepage";
import { loadCategoryMenu } from "redux/modules/homepage";
import {
  // loadAnnouncementBar,
  loadBanners
  // loadBestSellers,
  // loadCategories,
  // loadDealOfTheDay,
  // loadHomePage
} from "../../redux/modules/homepage";
// import { loadBanner2 } from "../../redux/modules/listingbanners";

const styles = require("./App.scss");

const SITE_URL_DESKTOP = "https://www.hometown.in";

@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
    const {
      pincode: { selectedPincode },
      app: { sessionId }
    } = getState();
    const defaultPincode = selectedPincode === "" ? PINCODE : selectedPincode;
    if (!isSessionSet(getState()) || !sessionId) {
      await dispatch(generateSession(defaultPincode)).catch(error =>
        console.log(error)
      );
    }
    if (!isSectionLoaded(getState(), "banners")) {
      await wrapDispatch(
        dispatch,
        "banners"
      )(loadBanners()).catch(error => console.log(error));
    }
    // await wrapDispatch(
    //   dispatch,
    //   "homepageData"
    // )(loadHomePage()).catch(error => console.log(error));

    /*get side bar menue*/
    if (!isHomeSectionLoaded(getState(), "menu")) {
      await wrapDispatch(
        dispatch,
        "menu"
      )(loadCategoryMenu()).catch(() => null);
    }
  }
  // defer: ({ store: { dispatch, getState } }) => {
  //   const {
  //     userLogin: { isLoggedIn, loggingOut }
  //   } = getState();
  // }
})
@connect(
  state => ({
    state: state,
    login: state.userLogin,
    signUp: state.userSignUp,
    pincode: state.pincode,
    app: state.app,
    notifs: state.notifs,
    wishlist: state.wishlist,
    cartSynced: state.cart.cartSynced
    // isPLPLanding: state.app.isPLPLanding
  }),
  {
    loginUser: loginUserAfterSignUp,
    ...notifActions
  }
)
@withRouter
export default class App extends Component {
  state = { mounted: false };
  static propTypes = {
    route: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    loginUser: PropTypes.func.isRequired,
    pincode: PropTypes.shape({
      selectedPincode: PropTypes.string,
      isPincodeFilter: PropTypes.bool
    }),
    signUp: PropTypes.shape({
      response: PropTypes.object,
      loaded: PropTypes.bool
    }),
    login: PropTypes.shape({
      accessToken: PropTypes.string,
      refreshToken: PropTypes.string,
      isLoggedIn: PropTypes.bool
    }),
    app: PropTypes.shape({
      sessionId: PropTypes.string
    }).isRequired,
    notifs: PropTypes.shape({
      global: PropTypes.array
    }).isRequired,
    notifSend: PropTypes.func.isRequired,
    wishlist: PropTypes.shape({
      waitlist: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    }),
    profile: PropTypes.object,
    cartSynced: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired
  };

  static defaultProps = {
    login: {
      isLoggedIn: false
    },
    signUp: {
      loaded: false
    },
    pincode: {
      selectedPincode: "",
      isPincodeFilter: false
    },
    wishlist: {
      waitlist: ""
    },

    profile: {}
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleOffline = e => {
    const { dispatch } = this.context.store;
    if (e.type === "offline") {
      dispatch(
        notifActions.notifSend({
          id: "internet",
          type: "error",
          msg: "You are browsing offline !",
          dismissAfter: 8000
        })
      );
    }
    if (e.type === "online") {
      dispatch(notifActions.notifDismiss("internet"));
    }
  };

  componentDidMount() {
    this.setState({ mounted: true });
    window.addEventListener("offline", this.handleOffline);
    window.addEventListener("online", this.handleOffline);
    const { dispatch } = this.context.store;
    const {
      state,
      app: { sessionId },
      pincode: { selectedPincode },
      login: { isLoggedIn, loggingOut }
    } = this.props;
    const defaultPincode = selectedPincode === "" ? PINCODE : selectedPincode;

    if (sessionId && !isCartLoaded(state)) {
      dispatch(loadCart(sessionId, defaultPincode));
    }
    if (isLoggedIn && !loggingOut && !isWishListLoaded(state)) {
      dispatch(loadWishlist());
    }
    if (isLoggedIn && !loggingOut && !isProfileLoaded(state)) {
      dispatch(loadUserProfile());
    }
    /* check cookie and set */

    if (cookie.get("PHPSESSID") !== sessionId) {
      cookie.set("PHPSESSID", `${sessionId}`, {
        expires: 8 / 24,
        path: "/",
        domain: ".hometown.in"
      });
    }
    if (window) {
      window.getPincode = this.getSelectedPincode;
      window.isPincodeFilter = this.getPincodeFilter;
    }
    const { history } = this.props;
    window.HTSEARCH = {};
    window.HTSEARCH.navigateToPDP = this.navigateToPDP(history);
    window.HTSEARCH.navigateToSearch = this.navigateToSearch(history);
  }
  componentWillReceiveProps(nextProps) {
    if (window && window.embedded_svc) {
      const { profile } = nextProps;
      const { data = {} } = profile;
      const { email = "" } = data;
      // window.userEmail = email;
      window.embedded_svc.settings.prepopulatedPrechatFields = {
        Email: email
      };
    }
  }

  componentWillUnmount() {
    window.removeEventListener("offline", this.handleOffline);
    window.removeEventListener("online", this.handleOffline);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
    // do same for wishlist
    if (this.props.cartSynced !== prevProps.cartSynced) {
      window.unbxd.handleUserSwitch();
    }
  }

  navigateToPDP = history => (name, sku) => {
    const productURL = formatProductURL(name, sku);
    history.push(productURL);
    // if (window && window.Unbxd && window.Unbxd.track && sku) {
    //   window.Unbxd.track("click", { pid: sku });
    // }
  };
  navigateToSearch = history => (path, query) => {
    // const url = `search/?q=${query}`;
    // history.push(url);
    // history.replace({ pathname: `/search/?q=${query}` });
    history.push({
      pathname: `${path}`,
      search: `${query}`,
      state: {
        query
      }
    });
  };
  checkIfSlash = path => {
    let url = path;
    if (path.length && path[path.length - 1] === "/") {
      url = path.slice(0, path.length - 1);
    }
    return url;
  };
  getSelectedPincode = () => {
    const {
      pincode: { selectedPincode }
    } = this.props;
    return selectedPincode;
  };
  getPincodeFilter = () => {
    const {
      pincode: { isPincodeFilter }
    } = this.props;
    return isPincodeFilter;
  };
  getWeKey = () => {
    let str = `${config.apiHost}` || "";
    if (str.includes("beta-api") || str.includes("stage-api")) {
      return "in~~15ba205b0";
    }
    return "in~~71680a91";
  };
  render() {
    const { location : { pathname }, route, notifs } = this.props;
    const url = this.checkIfSlash(pathname || '/');

    return (
      <ThemeProvider theme={Theme}>
        <div className={styles.app}>
          <Helmet {...config.app.head}>
            <link rel="canonical" href={`${SITE_URL_DESKTOP}${url}`} />
            {this.state.mounted && (
              <script defer type="text/javascript">
                {`
                var dataLayer = [];
                (function(w, d, s, l, i) {
                    w[l] = w[l] || [];
                    w[l].push({
                        'gtm.start': new Date().getTime(),
                        event: 'gtm.js'
                    });
                    var f = d.getElementsByTagName(s)[0],
                        j = d.createElement(s),
                        dl = l != 'dataLayer' ? '&l=' + l : '';
                    j.async = true;
                    j.src =
                        'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                    f.parentNode.insertBefore(j, f);
                })(window, document, 'script', 'dataLayer', 'GTM-T5VV7MZ');
              `}
              </script>
            )}
            <script defer type="text/javascript">
              {`
                var google_tag_params={
                    ecomm_pagetype: '',
                    ecomm_prodid: [],
                    ecomm_totalvalue: '',
                  };
              `}
            </script>

            {/* <!-- Meta Pixel Code --> */}
                <script type="text/javascript">
                  {`
                    !function(f,b,e,v,n,t,s)
                     {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                     n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                     if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                     n.queue=[];t=b.createElement(e);t.async=!0;
                     t.src=v;s=b.getElementsByTagName(e)[0];
                     s.parentNode.insertBefore(t,s)}(window, document,'script',
                     'https://connect.facebook.net/en_US/fbevents.js');
                     fbq('init', '1024172491523922');
                     fbq('track', 'PageView');
                  `}
                </script>
            {/* <!-- End Meta Pixel Code --> */}

            {/* <!-- Global site tag (gtag.js) - Google Ads: 845903914 --> */}
            {this.state.mounted && (
              <script
                defer
                src="https://www.googletagmanager.com/gtag/js?id=AW-845903914"
              ></script>
            )}
            {this.state.mounted && (
              <script defer>
                {`
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());

               gtag('config', 'AW-845903914');
               `}
              </script>
            )}
            {this.state.mounted && (
              <script
                src="https://libraries.unbxdapi.com/recs-sdk/v2.2.0/unbxd_recs_template_sdk_apac.js"
                defer
              ></script>
            )}
            {this.state.mounted && (
              <script defer id="_webengage_script_tag" type="text/javascript">
                {`
              var webengage;!function(w,e,b,n,g){function o(e,t){e[t[t.length-1]]=function(){r.__queue.push([t.join("."),
              arguments])}}var i,s,r=w[b],z=" ",l="init options track screen onReady".split(z),a="feedback survey notification".split(z),c="options render clear abort".split(z),p="Open Close Submit Complete View Click".split(z),u="identify login logout setAttribute".split(z);if(!r||!r.__v){for(w[b]=r={__queue:[],__v:"6.0",user:{}},i=0;i < l.length;i++)o(r,[l[i]]);for(i=0;i < a.length;i++){for(r[a[i]]={},s=0;s < c.length;s++)o(r[a[i]],[a[i],c[s]]);for(s=0;s < p.length;s++)o(r[a[i]],[a[i],"on"+p[s]])}for(i=0;i < u.length;i++)o(r.user,["user",u[i]]);setTimeout(function(){var f=e.createElement("script"),d=e.getElementById("_webengage_script_tag");f.type="text/javascript",f.async=!0,f.src=("https:"==e.location.protocol?"https://widgets.in.webengage.com":"http://widgets.in.webengage.com")+"/js/webengage-min-v-6.0.js",d.parentNode.insertBefore(f,d)})}}(window,document,"webengage");webengage.init("${this.getWeKey()}");
              `}
              </script>
            )}
            <script defer type="text/javascript">
              {`window.GUMLET_CONFIG = {
        hosts: [{
            current: "www.hometown.in",
            gumlet: "hometown.gumlet.io"
        },

        {
          "current": "swatches.hometown.in",
          "gumlet": "ht-swatches.gumlet.io"
      },
      {
        "current": "static.hometown.in",
        "gumlet": "hometown.gumlet.io"
    }],
        lazy_load: true
    };
    (function(){d=document;s=d.createElement("script");s.src="https://cdn.gumlet.com/gumlet.js/2.1/gumlet.min.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
    `}
            </script>

            {/* Server side Unbxd scripts */}

            {/* {this.state.mounted ? (
              <script
                src="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.7.0/nouislider.min.js"
                async=""
              />
            ) : null} */}
            {this.state.mounted ? (
              <script
                src="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.7.0/nouislider.css"
                defer
              />
            ) : null}
            {/* {this.state.mounted ? (
              <script
                type="text/javascript"
                defer
                src="https://d21gpk1vhmjuf5.cloudfront.net/embed.js"
              />
            ) : null} */}
            {/* end of scripts */}
          </Helmet>
          <main className={styles.appContent} style={{ overflowX: "hidden" }}>
            <div className="container">
              <Notifs
                namespace="global"
                NotifComponent={props => (
                  <Alert {...props} show={notifs.global.length} />
                )}
              />
            </div>
            {renderRoutes(route.routes)}
          </main>
        </div>
      </ThemeProvider>
    );
  }
}
