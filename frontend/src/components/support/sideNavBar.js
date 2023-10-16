import { NavLink, Paper } from "@mantine/core";
import {
  IconGauge,
  IconChevronRight,
  IconHelp,
  IconQuestionMark,
  IconCurrencyDollar,
  IconCoin,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const SideNavBar = ({ activeIndex, onHowItWorksClick, onFaqClick, onBidClick, onPaymentClick   }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(activeIndex);
  return (
    <>
      <Paper
        withBorder
        w={350}
        mt={20}
        h={"95%"}
        ml={125}
        mr={30}
        style={{ backgroundColor: "#D9D9D9" }}
        p={30}
        mb={20}
      >
        <NavLink
          label="Help - How it works"
          style={{ fontWeight: 600 }}
          rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
          mb={5}
          active={active === 0 ? true : false}
          color="dark"
          variant="filled"
          icon={<IconHelp size="1rem" stroke={1.5} />}
          onClick={()  => {onHowItWorksClick(); setActive(0)}}
        />
        <NavLink
          label="Frequently Asked Questions"
          style={{ fontWeight: 600 }}
          mb={5}
          active={active === 1 ? true : false}
          color="dark"
          variant="filled"
          rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
          icon={<IconQuestionMark size="1rem" stroke={1.5} />}
          onClick={() => {onFaqClick(); setActive(1)}}
        />
        <NavLink
          label="How to bid an Auction"
          style={{ fontWeight: 600 }}
          mb={5}
          active={active === 2 ? true : false}
          color="dark"
          variant="filled"
          rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
          icon={<IconCurrencyDollar size="1rem" stroke={1.5} />}
          onClick={() => {onBidClick(); setActive(2)}}
        />

        <NavLink
          label="Payments"
          active={active === 3 ? true : false}
          color="dark"
          variant="filled"
          style={{ fontWeight: 600 }}
          rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
          icon={<IconCoin size="1rem" stroke={1.5} />}
          onClick={() => {onPaymentClick(); setActive(3)}}
        />
        <NavLink
          label="Contact Support"
          style={{ fontWeight: 600 }}
          icon={<IconGauge size="1rem" stroke={1.5} />}
          childrenOffset={28}
          defaultOpened={
            active === 5 || active === 6 || active === 7 ? true : false
          }
        >
          <NavLink
            label="Submit Ticket"
            rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
            onClick={() => navigate("/ticket/submit")}
            color="dark"
            variant="filled"
            active={active === 5 ? true : false}
          />
          <NavLink
            label="My Tickets"
            rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
            onClick={() => navigate("/ticket/mytickets")}
            color="dark"
            variant="filled"
            active={active === 6 ? true : false}
          />
        </NavLink>
      </Paper>
    </>
  );
};

export default SideNavBar;
