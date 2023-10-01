import {
  Divider,
  Paper,
  Title,
  Table,
  Badge,
  Button,
  Container,
  Text,
  Modal,
  TextInput,
  useMantineTheme
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconDiscountCheck, IconExclamationCircle } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const MyTickets = () => {
  const[opened, setOpened] = useState(false);

  const { error, isLoading, data, refetch } = useQuery({
    queryKey: ["raisedTickets"],
    queryFn: () =>
      axios.get("http://localhost:4042/ticket/getall",{withCredentials:true}).then((res) => res.data),
  });


  const deleteTicket = (ticketID) => {
    showNotification({
      //after deleting ticket show delete notification
      id: "deleteTicket",
      loading: true,
      withCloseButton: false,
      title: "deleting ticket",
      message: "we're trying to delete your ticket",
    });
    axios
      .delete(`http://localhost:4042/ticket/delete/${ticketID}`)
      .then((res) => {
        updateNotification({
          id: "deleteTicket",
          loading: false,
          icon: <IconDiscountCheck />,
          color: "teal",
          autoClose: 1500,
          title: "deleted",
          message: "your ticket deleted successfully ",
        });
        refetch();
      })
      .catch((error) => { updateNotification({
        id: "deleteTicket",
        loading: false,
        icon: <IconExclamationCircle />,
        color: "red",
        autoClose: 1500,
        title: "error",
        message: "deletion failed",
      });});
  };
  //generate table rows
  const rows = data
    ? data.map((ticket, index) => (
        <tr key={ticket._id} >
  
          <td>{<Text color="dark">{`#REF${ticket._id.slice(1,6)}`}</Text>}</td>
          <td>{<Text color="dark">{ticket.subject}</Text>}</td>
          <td>
            {
              <Badge color={ticket.ticketSolved === true? "teal" : "yellow"} radius="sm" variant="filled">
                {ticket.ticketSolved === true? "SOLVED" : "PENDING"} 
              </Badge>
            }
          </td>
          <td>
            {<Text color="dark">{
              new Date(ticket.createdAt)
                .toLocaleDateString("en-GB")
                .split("T")[0]}</Text>
            }
          </td>
          <td>{<Text color="dark">last Action</Text>}</td>
          <td>
            {
              <>
              <Button
                color="red"
                radius="sm"
                variant="filled"
                onClick={() => deleteTicket(ticket._id)}
              >
                Delete
              </Button>

              <Button onClick= {() => {setOpened(true);}}>View</Button></>
            }
          </td>
          
        </tr>
      ))
    : null;

  return (
    <>
    <Modal opened={opened} onClose={() =>setOpened(false)} title="View Ticket" centered >
      
    </Modal>
    <Paper shadow="md" radius={"md"} withBorder mt={20}>
      <Title order={1} align="center">
        My Tickets
      </Title>
      <Divider />
      <Container>
        <Table highlightOnHover withBorder mt={10} mb={10}>
          <thead>
            <tr>
              <th>Reference</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Date Created</th>
              <th>Last Action</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Container>
    </Paper>
    </>
  );
};

export default MyTickets;
