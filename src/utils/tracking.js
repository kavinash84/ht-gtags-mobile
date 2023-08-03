/* eslint-disable max-len */
export const ga = `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-58228248-1', 'auto');
  ga('require', 'GTM-KZ5S3TV');
  ga('set', 'page', window.location.pathname);
  ga('send', 'pageview');`;

export const gtm = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-5M9DVB');`;

export const admitad = {
  src: "https://www.artfut.com/static/tagtag.min.js?campaign_code=f578644d44",
  onerror:
    'var self = this;window.ADMITAD=window.ADMITAD||{},ADMITAD.Helpers=ADMITAD.Helpers||{},ADMITAD.Helpers.generateDomains=function(){for(var e=new Date,n=Math.floor(new Date(2020,e.getMonth(),e.getDate()).setUTCHours(0,0,0,0)/1e3),t=parseInt(1e12*(Math.sin(n)+1)).toString(30),i=["de"],o=[],a=0;a<i.length;++a)o.push({domain:t+"."+i[a],name:t});return o},ADMITAD.Helpers.findTodaysDomain=function(e){function n(){var o=new XMLHttpRequest,a=i[t].domain,D="https://"+a+"/";o.open("HEAD",D,!0),o.onload=function(){setTimeout(e,0,i[t])},o.onerror=function(){++t<i.length?setTimeout(n,0):setTimeout(e,0,void 0)},o.send()}var t=0,i=ADMITAD.Helpers.generateDomains();n()},window.ADMITAD=window.ADMITAD||{},ADMITAD.Helpers.findTodaysDomain(function(e){if(window.ADMITAD.dynamic=e,window.ADMITAD.dynamic){var n=function(){return function(){return self.src?self:""}}(),t=n(),i=(/campaign_code=([^&]+)/.exec(t.src)||[])[1]||"";t.parentNode.removeChild(t);var o=document.getElementsByTagName("head")[0],a=document.createElement("script");a.src="https://www."+window.ADMITAD.dynamic.domain+"/static/"+window.ADMITAD.dynamic.name.slice(1)+window.ADMITAD.dynamic.name.slice(0,1)+".min.js?campaign_code="+i,o.appendChild(a)}});'
};

export const admitadSetCookie = `function getURLParameter(param) { var pageURL = window.location.search.substring(1); //get the query string parameters without the "?" 
var URLVariables = pageURL.split("&"); //break the parameters and values attached together to an array
for (var i = 0; i < URLVariables.length; i++) { var parameterName = URLVariables[i].split("="); //break the parameters from the values 
if (parameterName[0] == param) { return parameterName[1]; } } return null; } window.document.setCookie = function(sName, sValue) { var oDate = new Date(), minutes = 43200; oDate.setTime(oDate.getTime() + minutes * 60 * 1000); var sCookie = encodeURIComponent(sName) + "=" + encodeURIComponent(sValue) + ";expires=" + oDate.toGMTString() + ";path=/"; window.document.cookie = sCookie; }; var source = getURLParameter("utm_source"); var term = getURLParameter("utm_term"); var medium = getURLParameter("utm_medium"); if (source) { if (source == "affiliate_admitad") { window.document.setCookie("source", "affiliate_admitad"); } else { window.document.setCookie("source", source); } } else { var Google_source = getURLParameter("gclid"); //this will work when you are running ad through google without utm parameters in it 
var Fb_source = getURLParameter("fbclid"); //this will work when you are running ad through facebook without utm parameters in it 
if (Google_source || Fb_source) { source = "Paid_ADS"; window.document.setCookie("source", source); } }`;
