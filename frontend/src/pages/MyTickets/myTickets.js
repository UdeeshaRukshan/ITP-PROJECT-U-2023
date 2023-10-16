import { Grid } from "@mantine/core";
import SideNavBar from "../../components/support/sideNavBar";
import MyTickets from "../../components/support/myTickets/myTickets";
import { useRef } from "react";

 

const MyTicketPage=()=> {
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
    return(
<Grid>
    <Grid.Col span="content"><SideNavBar activeIndex={6}           onHowItWorksClick={() => handleScroll(howItWorksRef)}
          onFaqClick={() => handleScroll(faqRef)}
          onBidClick={() => handleScroll(bidRef)}
          onPaymentClick={() => handleScroll(paymentRef)}/></Grid.Col>
    <Grid.Col span={7}><MyTickets/></Grid.Col>
  </Grid>
    )
}

export default MyTicketPage;