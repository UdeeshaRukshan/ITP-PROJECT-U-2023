import SideNavBar from "../../components/support/sideNavBar";
import { Grid } from '@mantine/core';
import SubmitTicketForm from "../../components/support/submitTicket/submitTicketForm";


const SubmitTicketPage =() => {
   return(
   <Grid>
    <Grid.Col span="content"><SideNavBar activeIndex={5}/></Grid.Col>
    <Grid.Col span={7}><SubmitTicketForm/></Grid.Col>
  </Grid>
   )
}



export default SubmitTicketPage;