import { Grid } from "@mantine/core";
import SideNavBar from "../../components/support/sideNavBar";
import MyTickets from "../../components/support/myTickets/myTickets";

 

const MyTicketPage=()=> {
    return(
<Grid>
    <Grid.Col span="content"><SideNavBar activeIndex={6}/></Grid.Col>
    <Grid.Col span={7}><MyTickets/></Grid.Col>
  </Grid>
    )
}

export default MyTicketPage;