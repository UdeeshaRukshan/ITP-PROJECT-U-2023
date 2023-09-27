import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Footer/footer.css";
import { Facebook, Twitter, Instagram } from "react-feather";

const Footer = () => {
  const backgroundc = () => {
    return { backgroundColor: "#363753", color: "white" };
  };

  return (
    <footer class="footer">
      <div class="container-g bottom_border">
        <div class="row">
          <div class=" col-sm-4 col-md col-sm-4  col-12 col">
            <h1 class="headin5_amrc col_white_amrc pt2">AuctionPal</h1>

            <p class="mb10">
              Discover a world of exciting auctions with AuctionPal! We bring
              you the thrill of bidding on a wide range of items, from unique
              collectibles to must-have gadgets. Dive into the art of
              competitive bidding and secure your treasures with ease. Join us
              in this exhilarating journey through auctions, where history meets
              innovation. Explore, bid, and win with AuctionPal."
            </p>
            <p>
              <i class="fa fa-location-arrow"></i> 9878/25 sec 9 rohini 35{" "}
            </p>
            <p>
              <i class="fa fa-phone"></i> +91-9999878398{" "}
            </p>
            <p>
              <i class="fa fa fa-envelope"></i> info@example.com{" "}
            </p>
          </div>

          <div class=" col-sm-4 col-md  col-6 col">
            <h5 class="headin5_amrc col_white_amrc pt2">How it works</h5>

            <ul class="footer_ul_amrc">
              <li>
                <a href="http://webenlance.com">Buying a Item</a>
              </li>
              <li>
                <a href="http://webenlance.com">Selling a Item</a>
              </li>
              <li>
                <a href="http://webenlance.com">Finalizing the Sale</a>
              </li>
              <li>
                <a href="http://webenlance.com">FAQ</a>
              </li>
            </ul>
          </div>

          <div class=" col-sm-4 col-md  col-6 col">
            <h5 class="headin5_amrc col_white_amrc pt2">Sellers</h5>

            <ul class="footer_ul_amrc">
              <li>
                <a href="http://webenlance.com">Submit your Vehicle</a>
              </li>
              <li>
                <a href="http://webenlance.com">Submit your property</a>
              </li>
              <li>
                <a href="http://webenlance.com">Submit your Art</a>
              </li>
              <li>
                <a href="http://webenlance.com">Submit your Collectable</a>
              </li>
              <li>
                <a href="http://webenlance.com">Photography guide</a>
              </li>
              <li>
                <a href="http://webenlance.com">Image Cropping</a>
              </li>
            </ul>
          </div>

          <div class=" col-sm-4 col-md  col-12 col">
            <h5 class="headin5_amrc col_white_amrc pt2">Follow us</h5>

            <div className="col item social">
              <a href="#">
                <Facebook />
              </a>
              <a href="#" style={{ margin: "40px" }}>
                <Twitter />
              </a>

              <a href="#" style={{ margin: "20px" }}>
                <Instagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="container-x">
        <ul class="foote_bottom_ul_amrc">
          <li>
            <a href="http://webenlance.com">Home</a>
          </li>
          <li>
            <a href="http://webenlance.com">About</a>
          </li>
          <li>
            <a href="http://webenlance.com">Services</a>
          </li>

          <li>
            <a href="http://webenlance.com">Blog</a>
          </li>
          <li>
            <a href="http://webenlance.com">Contact</a>
          </li>
        </ul>

        <p class="text-center">
          Copyright @2023 | Designed by <a href="#">Udeesha Rukshan</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
