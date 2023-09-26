import React from "react";
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
    url: "https://www.builderboost.com/austin/wp-content/uploads/2019/11/villa_montana_high_001-1024x683.jpg",
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
    height: "400px",
    backgroundSize: "cover",
  };

  const properties = {
    duration: 2000, // Set the duration for each slide (in milliseconds)
    transitionDuration: 1000, // Set the transition duration between slides (in milliseconds)
    infinite: true, // Enable infinite loop
    indicators: true, // Show slide indicators
    arrows: true, // Show arrow navigation
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
            style={{ maxWidth: "600px" }}
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
                className="cat-item d-block bg-light text-center rounded p-3"
                href=""
              >
                <div className="rounded p-4">
                  <div className="icon mb-3">
                    <img
                      class="img-fluid"
                      src="img/icon-apartment.png"
                      alt="Icon"
                    />
                  </div>
                  <h4>Vehicles</h4>
                </div>
              </a>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <a
                className="cat-item d-block bg-light text-center rounded p-3"
                href=""
              >
                <div className="rounded p-4">
                  <div className="icon mb-3">
                    <img
                      class="img-fluid"
                      src="img/icon-villa.png"
                      alt="Icon"
                    />
                  </div>
                  <h4>Properties</h4>
                </div>
              </a>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <a
                className="cat-item d-block bg-light text-center rounded p-3"
                href=""
              >
                <div className="rounded p-4">
                  <div className="icon mb-3">
                    <img
                      className="img-fluid"
                      src="img/icon-housing.png"
                      alt="Icon"
                    />
                  </div>
                  <h4>Collectables</h4>
                </div>
              </a>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <a
                className="cat-item d-block bg-light text-center rounded p-3"
                href=""
              >
                <div className="rounded p-4">
                  <div className="icon mb-3">
                    <img
                      className="img-fluid"
                      src="img/icon-housing.png"
                      alt="Icon"
                    />
                  </div>
                  <h4>Arts</h4>
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
          <div className="col-lg-8 bg-black text-center row" style={bar}>
            <div className="col">1</div>
            <div className="col">2</div>
            <div className="col">3</div>
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
      </div>
    </div>
  );
};

export default IndexPage;
