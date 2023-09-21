import { NavLink, Paper } from "@mantine/core";
import {
  IconGauge,
  IconChevronRight,
} from "@tabler/icons-react";
import {useNavigate} from 'react-router-dom';

const SideNavBar = () => {

  const navigate = useNavigate();


  return (
    <>
      <Paper
        withBorder
        w={300}
        mt={20}
        h={"80vh"}
        style={{ backgroundColor: "#D9D9D9" }}
      >
        <NavLink
          label="Help - How it work"
          rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
        />
        <NavLink
          label="Frequently Asked Questions"
          rightSection={
            <IconChevronRight
              size="1rem"
              stroke={1.5}
            />
          }
        />
        <NavLink
          label="How to bid an Auction"
          rightSection={
            <IconChevronRight
              size="1rem"
              stroke={1.5}
            />
          }
        />
        <NavLink
          label="Orders & Shipping"
          rightSection={
            <IconChevronRight
              size="1rem"
              stroke={1.5}

            />
          }
        />
        <NavLink
          label="Payments"
          rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
        />
        <NavLink
          label="Contact Support"
          icon={<IconGauge size="1rem" stroke={1.5} />}
          childrenOffset={28}
        >
        <NavLink
        label="Submit Ticket"
        rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
        onClick={() => navigate("/ticket/submit")}
        />
          <NavLink
            label="Raised Tickets"
            rightSection={<IconChevronRight size="1rem" stroke={1.5} />}

          />
          <NavLink
            label="Chat bot"
            rightSection={<IconChevronRight size="1rem" stroke={1.5} />}

          />
        </NavLink>
      </Paper>
    </>
  );
};

export default SideNavBar;
