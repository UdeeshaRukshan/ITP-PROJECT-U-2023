import { Box, Button, Divider, Paper, Select, Text, TextInput, Textarea, Title } from "@mantine/core";

const SubmitTicketForm = () => {
  return (
    <Paper p={30} shadow="md" radius={"md"} withBorder mt={20}>
      <Title order={1}>Contact Support</Title>
      <Box ta="center" style={{ border: "1px solid black" }}>
        <Text>Drop us a Line</Text>
        <Text td="underline" c={"blue"}>
          support@auctionpal.com
        </Text>
      </Box>
      <Divider my={"xs"} label="or" labelPosition="center" />
      <Title ta="center" order={2}>
        Submit a Support Ticket{" "}
      </Title>
      {/* submit ticket form */}
      <form>
        <TextInput
        label="Customer Name"
        placeholder="Enter your name"
        required
        />
        <TextInput
        type = "email"
        label="Email"
        placeholder="Enter your email"
        required
        />
        <Select
        label="Category"
        placeholder="Choose your Category"
        searchable
        required
        nothingFound="No Category"
        data={[
            {value:"property", label:"Property"},
            {value:"Vehicle", label:"Vehicle"},
            {value:"Art & Collectables", label:"Art & Collectables"}
        ]}
        /> 
        <TextInput
        label="Subject"
        placeholder="Enter your subject"
        required
        />
        <Textarea
        label="Message"
        placeholder="How can we help?"
        required
        autosize
        minRows={3}
        maxRows={5}
        />
        <Button fullWidth color="teal">
      Submit
    </Button>
      </form>
    </Paper>
  );
};

export default SubmitTicketForm;
