import { Divider, Paper, Title, Table, Badge, Button, Container } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MyTickets = () => {
  const { error, isLoading, data } = useQuery({
    queryKey: ["raisedTickets"],
    queryFn: () =>
      axios.get("http://localhost:4042/ticket/getall").then((res) => res.data),
  });
  //generate table rows
  const rows = data
    ? data.map((ticket, index) => (
        <tr key={ticket._id}>
          <td>{ticket._id}</td>
          <td>{ticket.subject}</td>
          <td>{<Badge color="yellow" radius="sm" variant="filled">Pending</Badge>}</td>
          <td>Date</td>
          <td>last Action</td>
          <td>{<Button color="red" radius="sm" variant="filled">Delete</Button>}</td>
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
        <tbody  style={{color:"black"}}>{rows}</tbody>
      </Table>
      </Container>
    </Paper>
  );
};

export default MyTickets;
