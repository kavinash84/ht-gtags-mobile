import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BASE_IMAGE_URL } from "helpers/Constants";

class VedioLandingPageComps extends Component {
  state = {
    currentId: "xq4AxgAJ5OA"
  };
  handleClick = id => {
    this.setState({ currentId: id });
  };
  render() {
    const { currentId } = this.state;
    const videoData = [
      {
        title: "Make Space for New with HomeTown",
        id: "xq4AxgAJ5OA?autoplay=1&mute=1"
      },
      {
        title: "Make Space for New with HomeTown Recliners",
        id: "_2_45l2qR4A"
      },
      { title: "Make Space for New with HomeTown Beds", id: "50ACf_U-VWA" },
      {
        title: "Make Space for New with HomeTown Dining Tables",
        id: "s3eSu8pu0lE"
      }
    ];
    return (
      <div style={{ display: "block", padding: "0px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: "10px"
          }}
        >
          <img src={`${BASE_IMAGE_URL}/media/cms/extras/MakespaceforNew_-_Brand_look&feel-18.png`} style={{ width: "30%", height: "auto" }} />
          <Link
            to="/"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <img src={`${BASE_IMAGE_URL}/media/cms/extras/HT-LOGO-cs2-single.png`} style={{ width: "80%", height: "auto" }} />
          </Link>
        </div>
        <div>
          {videoData.map((item, index) => (
            <div onClick={() => this.handleClick(item.id)}>
              <div
                style={{
                  padding: "0px 15px"
                }}
              >
                <iframe
                  key={index}
                  src={`https://www.youtube.com/embed/${item.id}`}
                  width="100%"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
              </div>
              <div
                style={{
                  marginLeft: "15px",
                  marginBottom: "20px",
                  marginTop: "5px",
                  color: "#888888"
                }}
              >
                {item.title}
              </div>
            </div>
          ))}
          <div style={{ padding: "15px", color: "#888888" }}>
            <div style={{ fontWeight: 600, marginBottom: "10px" }}>
              Make Space for New
            </div>
            <div>
              From building your first home together to experiencing the joy of
              welcoming your first child, to seeing your children grow up, to
              fulfilling all your dreams and aspirations …your home grows as
              your life plays out. HomeTown helps you renew your home to match
              your requirements and aspirations at every significant event in
              your life by providing you with furniture, decor, furnishings,
              modular solutions and home interior services matching every rhythm
              of your changing life.
            </div>
            <div style={{ fontWeight: 600, marginTop: "10px" }}>
              <Link to="/">Know More</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VedioLandingPageComps;
