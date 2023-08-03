import React, { Component } from "react";
import { connect } from "react-redux";
import Div from "hometown-components/lib/Div";

// Components
import TextCarousel from "./TextCarousel";
import TopBanner from "./TopBanner";
import PreQualifyNow from "./PreQualify";
import SleepEnthusiasts from "./SleepEnthusiasts";
import WhyChooseUs from "./WhyChooseUs";
import SleepBetter from "./SleepBetter";
import CustomerSpeak from "./CustomerSpeak";
import MattressForSleep from "./MattressForSleep";
import MattressesVideo from "./MattressesVideo";
import SleepPosition from "./SleepPosition";
import MattressesByBrands from "./MattressesByBrands";
import MattressesByMaterial from "./MattressesByMaterial";
import MattressesByComfort from "./MattressesByComfort";
import MattressesBySize from "./MattressesBySize";
import OrthopedicMattresses from "./OrthopedicMattresses";
import MattressesForEveryone from "./MattressesForEveryone";
import HelpToDecide from "./HelpToDecide";
import BeforeYouBuy from "./BeforeYouBuy";
import MattressProtectors from "./MattressProtectors";
import ShopPillows from "./ShopPillows";
import FoamPillows from "./FoamPillows";
import BuildyourBedroom from "./BuildyourBedroom";
import Faqs from "./Faqs";

@connect(({ mattresses }) => ({
  mattresses: mattresses.data.items.text,
  textData: mattresses.data.items.text.textMarquee.textData,
  topBanner: mattresses.data.items.text.topBanner,
  preQualifyNow: mattresses.data.items.text.preQualifyNow,
  sleepEnthusiasts: mattresses.data.items.text.sleepEnthusiasts,
  whyChooseUs: mattresses.data.items.text.whyChooseUs,
  sleepBetter: mattresses.data.items.text.sleepBetter,
  customerSpeak: mattresses.data.items.text.customerSpeak,
  mattressForSleep: mattresses.data.items.text.mattressForSleep,
  mattressesVideo: mattresses.data.items.text.mattressesVideo,
  sleepPosition: mattresses.data.items.text.sleepPosition,
  sleepPositiononPillow: mattresses.data.items.text.sleepPositiononPillow,
  mattressesByBrand: mattresses.data.items.text.mattressesByBrand,
  mattressesByMaterial: mattresses.data.items.text.mattressesByMaterial,
  pillowByMaterial: mattresses.data.items.text.pillowByMaterial,
  mattressesByComfort: mattresses.data.items.text.mattressesByComfort,
  mattressesBySize: mattresses.data.items.text.mattressesBySize,
  orthopedicMattreses: mattresses.data.items.text.orthopedicMattreses,
  mattressesForEveryone: mattresses.data.items.text.mattressesForEveryone,
  helpToDecide: mattresses.data.items.text.helpToDecide,
  beforeYouBuy: mattresses.data.items.text.beforeYouBuy,
  mattressProtectors: mattresses.data.items.text.mattressProtectors,
  shopPillows: mattresses.data.items.text.shopPillows,
  foamPillows: mattresses.data.items.text.foamPillows,
  buildYourBedroom: mattresses.data.items.text.buildYourBedroom,
  faqs: mattresses.data.items.text.faqs
}))
export class index extends Component {
  render() {
    const {
      mattresses,
      textData,
      topBanner,
      preQualifyNow,
      sleepEnthusiasts,
      whyChooseUs,
      sleepBetter,
      customerSpeak,
      mattressForSleep,
      mattressesVideo,
      sleepPosition,
      sleepPositiononPillow,
      mattressesByBrand,
      mattressesByMaterial,
      pillowByMaterial,
      mattressesByComfort,
      mattressesBySize,
      orthopedicMattreses,
      mattressesForEveryone,
      helpToDecide,
      beforeYouBuy,
      mattressProtectors,
      shopPillows,
      foamPillows,
      buildYourBedroom,
      faqs,
      history
    } = this.props;
    return (
      <Div>
        {/* Text Marquee */}
        <TextCarousel textData={textData} />

        {/* Top Banner */}
        <TopBanner data={topBanner} />

        {/* PreQualify Section */}
        {/* <PreQualifyNow data={preQualifyNow} /> */}

        {/* Sleep Enthusiasts */}
        <SleepEnthusiasts data={sleepEnthusiasts} />

        {/* Why Choose Us */}
        <WhyChooseUs data={whyChooseUs} />

        {/* Mattress for Sleep */}
        <MattressForSleep data={mattressForSleep} history={history} />

        {/* Sleep Better */}
        <SleepBetter data={sleepBetter} />

        {/* Customers Speak */}
        <CustomerSpeak data={customerSpeak} />

        {/* Mattresses Video */}
        {/* <MattressesVideo data={mattressesVideo} /> */}

        {/* Sleep Position */}
        <SleepPosition data={sleepPosition} />

        {/* Mattress By Brands */}
        <MattressesByBrands data={mattressesByBrand} />

        {/* Mattress By Material */}
        <MattressesByMaterial data={mattressesByMaterial} />

        {/* Orthopedic Mattresses */}
        <OrthopedicMattresses data={orthopedicMattreses} />

        {/* Mattress By Comfort */}
        <MattressesByComfort data={mattressesByComfort} />

        {/* Mattress Guide */}
        {/* <MattressGuide data={mattresses.mattressesGuide} /> */}

        {/* Mattress By Size */}
        <MattressesBySize data={mattressesBySize} />

        {/* Mattresses for Everyone */}
        {/* <MattressesForEveryone data={mattressesForEveryone} /> */}

        {/* HelpToDecide */}
        <HelpToDecide data={helpToDecide} />

        {/* Before you buy */}
        <BeforeYouBuy data={beforeYouBuy} />

        {/* Mattress Protectors */}
        <MattressProtectors data={mattressProtectors} />

        {/* Shop Pillows */}
        <ShopPillows data={shopPillows} />

        {/* Sleep Position */}
        {Array.isArray(sleepPositiononPillow.values) ? (
          sleepPositiononPillow.values.length ? (
            <SleepPosition data={sleepPositiononPillow} />
          ) : null
        ) : null}

        {/* Mattress By Material */}
        <MattressesByMaterial data={pillowByMaterial} />

        {/* Pillow Guide */}
        {/* <PillowGuide data={mattresses.pillowGuide} /> */}

        {/* Foam Pillows */}
        <FoamPillows data={foamPillows} />

        {/* Build Your Bedroom */}
        <BuildyourBedroom data={buildYourBedroom} />

        {/* FAQs */}
        <Faqs data={faqs} />
      </Div>
    );
  }
}

export default index;
