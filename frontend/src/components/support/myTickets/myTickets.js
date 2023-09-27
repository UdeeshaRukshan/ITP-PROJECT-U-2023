import {
  Divider,
  Paper,
  Title,
  Table,
  Badge,
  Button,
  Container,
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconDiscountCheck, IconExclamationCircle } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MyTickets = () => {
  const { error, isLoading, data, refetch } = useQuery({
    queryKey: ["raisedTickets"],
    queryFn: () =>
      axios.get("http://localhost:4042/ticket/getall").then((res) => res.data),
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
        <tr key={ticket._id}>
          <td>{ticket._id}</td>
          <td>{ticket.subject}</td>
          <td>
            {
              <Badge color="yellow" radius="sm" variant="filled">
                Pending
              </Badge>
            }
          </td>
          <td>
            {
              new Date(ticket.createdAt)
                .toLocaleDateString("en-GB")
                .split("T")[0]
            }
          </td>
          <td>last Action</td>
          <td>
            {
              <Button
                color="red"
                radius="sm"
                variant="filled"
                onClick={() => deleteTicket(ticket._id)}
              >
                Delete
              </Button>
            }
          </td>
        </tr>
      ))
    : null;

  return (
    <Paper shadow="md" radius={"md"} withBorder mt={20}>
      <Title order={1} align="center">
        My Tickets
      </Title>
      <Divider />
      <Container>
        <Table highlightOnHover withBorder>
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
          <tbody style={{ color: "black" }}>{rows}</tbody>
        </Table>
      </Container>
    </Paper>
  );
};

export default MyTickets;
