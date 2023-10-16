import { Grid } from "@mantine/core";
import SideNavBar from "./sideNavBar";
import SupportDetails from "./supportDetails/supportDetails";
import { useRef } from "react";

const Support = () => {
  const howItWorksRef = useRef(null);
  const faqRef = useRef(null);
  const bidRef = useRef(null);
  const paymentRef = useRef(null);

  const handleScroll = (ref) => {
    if (ref && ref.current) {
      const windowHeight = window.innerHeight;
      const elementOffset = ref.current.offsetTop;
      const scrollToPosition = elementOffset - windowHeight / 2;
      window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
    }
  };

  return (
    <Grid>
      <Grid.Col span="content">
        <SideNavBar
          activeIndex={0}
          onHowItWorksClick={() => handleScroll(howItWorksRef)}
          onFaqClick={() => handleScroll(faqRef)}
          onBidClick={() => handleScroll(bidRef)}
          onPaymentClick={() => handleScroll(paymentRef)}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <SupportDetails
          helpRef={howItWorksRef}
          faqRef={faqRef}
          bidRef={bidRef}
          paymentRef={paymentRef}
        />
      </Grid.Col>
    </Grid>
  );
};

export default Support;
