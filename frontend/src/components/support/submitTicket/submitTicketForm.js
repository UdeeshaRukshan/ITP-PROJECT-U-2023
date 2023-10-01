import {
  Box,
  Button,
  Center,
  Divider,
  Paper,
  Select,
  Space,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconDiscountCheck, IconExclamationCircle } from "@tabler/icons-react";
import axios from "axios";
import Home from "../../../pages/Home";
const SubmitTicketForm = () => {
  const ticket = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      category: "",
      subject: "",
      message: "",
    },
    validate: {
      name: (value) => (value.length >= 2 ? null : "enter your name"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      category: (value) => (value.length >= 7 ? null : "select the category"),
      subject: (value) =>
        value.length >= 4 ? null : "please enter valid subject",
      message: (value) => (value.length >= 5 ? null : "please enter message"),
    },
  });
  const handleSubmit = (values) => {

//     const serviceId = "service_r27xwep";
//     const templateId = "template_fz0sxta";
//     const publicKey = "Wi-JrZP_Jb89HSxvb";

//     const data ={
//       service_id: serviceId,
//       template_id: templateId,
// user_id: publicKey,
// template_params: {
//   from_name : name,
//   from_email : email,
//   to_name : "auction pal",
//   message: message,
// }

//     };
//     try{
// const res = axios.post("http://localhost:4042/ticket/add", data);
// console.log(res.data);
// setName("");
// setEmail("");
// setMessage("");
//  }catch(error){
// console.log(error);
//     }

    showNotification({
      //after submitting form show loading notification
      id: "submitTicket",
      loading: true,
      withCloseButton: false,
      title: "submitting ticket",
      message: "we're trying to submit your ticket",
    });
    axios
      .post("http://localhost:4042/ticket/add", values,{withCredentials:true})
      .then((response) => {
        //reset current form 
        ticket.reset()

        //show success notification
        updateNotification({
          id: "submitTicket",
          loading: false,
          icon: <IconDiscountCheck />,
          color: "teal",
          autoClose: 1500,
          title: "success",
          message: "your ticket was submitted successfully ",
        });
      })
      .catch((error) => {
        updateNotification({
          id: "submitTicket",
          loading: false,
          icon: <IconExclamationCircle />,
          color: "red",
          autoClose: 1500,
          title: "error",
          message: "submission failed",
        });

      });
      
  };

  return (
    <Paper p={30} shadow="md" radius={"md"} withBorder mt={20}>
      <Title order={1}>Contact Support</Title>
      <Space h="xl" />
      <Center>
        <Box w={400} h={80} ta="center" style={{ border: "1px solid black" }}>
          <Text>Drop us a Line</Text>
          <Text td="underline" c={"blue"}>
            support@auctionpal.com
          </Text>
        </Box>
      </Center>
      <Space h="lg" />
      <Divider my={"xs"} label="or" labelPosition="center" />
      <Space h="lg" />
      <Title ta="center" order={2}>
        Submit a Support Ticket{" "}
      </Title>
      {/* submit ticket form */}
      <form onSubmit={ticket.onSubmit((values) => handleSubmit(values))}>
        <Space h="lg" />
        <TextInput
          label="Customer Name"
          placeholder="Enter your name"
          required
          {...ticket.getInputProps("name")}
        />
        <Space h="md" />
        <TextInput
          type="email"
          label="Email"
          placeholder="Enter your email"
          required
          {...ticket.getInputProps("email")}
        />
        <Space h="md" />
        <Select
          label="Category"
          placeholder="Choose your Category"
          searchable
          required
          nothingFound="No Category"
          data={[
            { value: "property", label: "Property" },
            { value: "Vehicle", label: "Vehicle" },
            { value: "Art & Collectables", label: "Art & Collectables" },
          ]}
          {...ticket.getInputProps("category")}
        />
        <Space h="md" />
        <TextInput
          label="Subject"
          placeholder="Enter your subject"
          required
          {...ticket.getInputProps("subject")}
        />
        <Space h="md" />
        <Textarea
          label="Message"
          placeholder="How can we help?"
          required
          autosize
          minRows={3}
          maxRows={5}
          {...ticket.getInputProps("message")}
        />
        <Space h="md" />
        <Button
          type="submit"
          fullWidth
          color="teal"
          disabled={Object.keys(ticket.errors).length === 0 ? false : true}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default SubmitTicketForm;
