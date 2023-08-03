import React from "react";

const dollericon = require("../../../static/cart/dollericon.svg");
const message = require("../../../static/cart/message.svg");
const phone = require("../../../static/cart/phone.svg");

const styles = require("./Cart.scss");

const HappyToHelp = ({ data }) => {
  return (
    <div className={styles.helpuContainer}>
      <div className={styles.helpuHeader}>Happy To Help</div>
      <div className={styles.helpuitem}>
        <img src={phone} alt="phone" className={styles.helpuimg} />
        <div className={styles.helputext}>
          Call us at {data.items.text.phone}
        </div>
      </div>
      <div className={styles.helpuitem}>
        <img src={message} alt="phone" className={styles.helpuimg} />
        <div className={styles.helputext}>
          Write to us at <br />
          {data.items.text.email}
        </div>
      </div>
      <div className={styles.helpuitem}>
        <img src={dollericon} alt="phone2" className={styles.helpuimg} />
        <div className={styles.helputext}>Easy returns Policy</div>
      </div>
    </div>
  );
};

export default HappyToHelp;
