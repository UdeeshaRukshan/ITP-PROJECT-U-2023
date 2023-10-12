import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Link } from "react-router-dom";
import "./indexPage.css";
import "react-slideshow-image/dist/styles.css";

import { Fade } from "react-slideshow-image";
const slideImages = [
  {
    url: "https://www.tm5properties.com/uploads/unnamed-1.jpg",
    caption: "image 1",
  },
  {
    url: "https://i0.wp.com/www.collegestationhomes.com/wp-content/uploads/2021/08/Looking-for-a-Home-in-College-Station.jpeg?ssl=1",
    caption: "image 2",
  },
  {
    url: "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    caption: "image 3",
  },
  {
    url: "https://westobserver.com/wp-content/uploads/2023/07/4cac263_504d3ed2b4df4eaabb75a8cea16e74d9-0-13ff63bcebb94f3eac359b8a667fdbd5.jpg",
    caption: "image 2",
  },
  {
    url: "https://thumbs.dreamstime.com/b/vintage-metal-sign-vector-antiques-collectibles-realistic-used-rusty-effect-can-be-easily-removed-clean-88940749.jpg",
    caption: "image 3",
  },
  {
    url: "https://i0.wp.com/www.collegestationhomes.com/wp-content/uploads/2021/08/Looking-for-a-Home-in-College-Station.jpeg?ssl=1",
    caption: "image 2",
  },
  {
    url: "https://www.builderboost.com/austin/wp-content/uploads/2019/11/villa_montana_high_001-1024x683.jpg",
    caption: "image 3",
  },
];
const IndexPage = () => {
  const bar = {
    height: "100px",
  };
  const divStyle = {
    marginTop: "7vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "530px",
    backgroundSize: "cover",
    overflow: "hidden",
  };

  const properties = {
    duration: 1000, // Set the duration for each slide (in milliseconds)
    transitionDuration: 1000, // Set the transition duration between slides (in milliseconds)
    infinite: true, // Enable infinite loop
    indicators: true, // Show slide indicators
    arrows: true, // Show arrow navigation
  };
  const AnimatedNumber = ({ start, end, duration }) => {
    const [currentValue, setCurrentValue] = useState(start);

    useEffect(() => {
      let animationInterval;
      const step = (end - start) / (duration * 6);
      const intervalDuration = 200; // Decreased interval duration for faster increment

      const animateNumbers = () => {
        if (currentValue < end) {
          setCurrentValue((prevValue) => prevValue + step);
        } else {
          setCurrentValue(end);
          clearInterval(animationInterval);
        }
      };

      animationInterval = setInterval(animateNumbers, intervalDuration);
      return () => clearInterval(animationInterval);
    }, [currentValue, start, end, duration]);

    return <span>{Math.round(currentValue)}</span>;
  };
  return (
    <div className="bg-white">
      <div className="container-xxl py-5">
        <div className="slide-container">
          <Fade {...properties}>
            {slideImages.map((image, index) => (
              <div key={index} className="each-slide">
                <div
                  style={{
                    ...divStyle,
                    backgroundImage: `url(${image.url})`,
                    backgroundSize: "cover", // Ensure the image covers the div
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
            ))}
          </Fade>
        </div>
        <div className="container-y">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "650px" }}
          >
            <h1 className="mb-3">AuctionPal Categories</h1>
            <p>
              Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut
              dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed
              rebum vero dolor duo.
            </p>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <a
                className="cat-item d-block bg-light text-center rounded "
                href="/vehicle"
              >
                <div className="rounded ">
                  <div className="icon mb-3">
                    <img
                      class="img-fluid rounded img-1"
                      src="https://topauto.co.za/wp-content/uploads/2021/09/2022-Mini-Cooper-S-3-door-Header-1.jpg"
                      alt="Vehicles"
                    />
                  </div>
                  <h1>Vehicles</h1>
                </div>
              </a>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <a
                className="cat-item d-block bg-light text-center rounded "
                href="/properties"
              >
                <div className="rounded ">
                  <div className="icon mb-3 ">
                    <img
                      class="img-fluid rounded img-2"
                      src="https://www.redfin.com/blog/wp-content/uploads/2021/07/3523-Frostleaf-Ct_Fairfax_VA_Ext.jpg"
                      alt="Icon"
                    />
                  </div>
                  <h1>Properties</h1>
                </div>
              </a>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <a
                className="cat-item d-block bg-light text-center rounded "
                href="/collectables"
              >
                <div className="rounded ">
                  <div className="icon mb-3">
                    <img
                      className="img-fluid-3 rounded img-3"
                      src="https://thumbs.dreamstime.com/b/vintage-metal-sign-vector-antiques-collectibles-realistic-used-rusty-effect-can-be-easily-removed-clean-88940749.jpg"
                      alt="Collectables"
                    />
                  </div>
                  <h1>Collectables</h1>
                </div>
              </a>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <a
                className="cat-item d-block bg-light text-center rounded "
                href="/arts"
              >
                <div className="rounded ">
                  <div className="icon mb-3 rounded">
                    <img
                      className="img-fluid rounded img-4 "
                      src="https://d1inegp6v2yuxm.cloudfront.net/royal-academy/image/upload/c_fill,cs_tinysrgb,dn_72,f_auto,fl_progressive.keep_iptc,w_836,h_470,ar_16:9/mcl1whdg3qdd6kweugb4.jpg"
                      alt="Arts"
                    />
                  </div>
                  <h1>Arts</h1>
                </div>
              </a>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            ></div>
          </div>
        </div>

        <div
          className="text-center d-flex justify-content-center align-items-center text-white bg-white my-5 "
          style={bar}
        >
          <div
            className="col-lg-9  text-center row col-main rounded"
            style={bar}
          >
            <div className="col">
              <div className="number-container">
                <span className="animated-number-large">
                  <AnimatedNumber start={0} end={1000} duration={5} />+
                </span>
                <span className="number-text-large">Live Auctions Count</span>
              </div>
            </div>
            <div className="col">
              <div className="number-container">
                <span className="animated-number-large">
                  <AnimatedNumber start={0} end={10000} duration={5} />+
                </span>
                <span className="number-text-large">Live Users Count</span>
              </div>
            </div>
            <div className="col">
              <div className="number-container">
                <span className="animated-number-large">
                  <AnimatedNumber start={0} end={85} duration={5} />+
                </span>
                <span className="number-text-large">Sell Through Rate</span>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-center">
          Do you want to publish your advertiestment ?
        </h2>
        <div
          className="d-flex justify-content-center align-items-center vh-50
      "
        >
          <Link to={"/dashbord"}>
            <button
              className=" mx-auto btn btn-success  fs-4 my-5
      "
              style={{ width: "400px", height: "100px" }}
            >
              <span className="fs-2">Join the AuctionPal</span>
            </button>
          </Link>
        </div>
        <div style={{ marginTop: 70, marginLeft: 80 }}>
          <Link to={"/feedback"}>
            <button
              onClick={() => console.log("Button Clicked")}
              style={{
                marginLeft: 20,
                marginBottom: 10,
                marginLeft: 400,
                width: "40vh",
                height: "4vh",
              }}
            >
              Add Your Valuable feedback
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
