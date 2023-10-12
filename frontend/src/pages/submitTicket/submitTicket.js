import { Grid } from "@mantine/core";
import SideNavBar from "../../components/support/sideNavBar";
import MyTickets from "../../components/support/myTickets/myTickets";
import SubmitTicketForm from "../../components/support/submitTicket/submitTicketForm";

 

const SubmitTicketPage=()=> {
    return(
<Grid>
    <Grid.Col span="content"><SideNavBar activeIndex={6}/></Grid.Col>
    <Grid.Col span={7}><SubmitTicketForm/></Grid.Col>
  </Grid>
    )
}

export default SubmitTicketPage;