import {  List, Paper, Space, Text, Title } from "@mantine/core";

const SupportDetails = ({prop,helpRef,faqRef,bidRef,paymentRef}) =>{ 
    return(
        <Paper p={30} shadow="md" radius={"md"} withBorder mt={20} mb={20}>
          <Title order={3} ref={helpRef}>Help-How it works</Title>
          <Space h="lg" />
          <Title order={4}>Buying an item</Title>
          <Space h="md" />
          <Text fz="md">
            Once you’ve found an item you’re interested in, here are the steps
            you should take to bid confidently and, with any luck, win the
            auction!
          </Text>
          <Space h="xl" />
          <Text fw={500}>1. Register to Bid</Text>
          <Space h="sm" />
          <Text fz="md">
            To contact the seller directly and place bids, you must first
            register with a valid credit card and phone number.{" "}
          </Text>
          <Space h="md" />
          <Text fw={500}>2. Perform Due Diligence</Text>
          <Space h="sm" />
          <Text fz="md">
            While we’ve tried to make buying an item online as safe and easy as
            possible, it’s ultimately your responsibility to perform your own
            due diligence and make sure that the item you’re considering is
            right for you – prior to placing a bid.
          </Text>
          <Space h="sm" />
          <List>
            <List.Item>
              Review the listing thoroughly, including known flaws, the item
              history report, the vehicle inspection report (if applicable),
              recent maintenance, photos, etc.
            </List.Item>
            <Space h="sm" />
            <List.Item>
              Ask the seller – via comments, Seller Q&A, or the “Contact”
              feature – any questions that you may have about the item.
            </List.Item>
            <Space h="sm" />
            <List.Item>
              Arrange to inspect the vehicle or property in person, or work with
              the seller to schedule a detailed pre-purchase inspection (“PPI”)
              at a reputable shop in their area (at your cost).
            </List.Item>
          </List>
          <Space h="md" />
          <Text fw={500}>3. Win the Auction</Text>
          <Space h="sm" />
          <Text fz="md">
            To buy an item on AuctionPal, you must win the auction by ultimately
            being the highest bidder – and, if the auction has a “Reserve,” by
            placing a bid that meets or exceeds the seller’s hidden “Reserve”
            price. If the auction has “No Reserve,” then the highest bidder wins
            it regardless of the amount they bid.
          </Text>
          <Space h="sm" />
          <Text fz="md">
            After the auction closes, we’ll provide you with a step-by-step
            checklist to complete your purchase. You’ll also receive the
            seller’s contact information (and vice-versa) in order to finalize
            the details and logistics of the transaction. Buyers are expected to
            pay for the item in-full within a week of the auction closing.{" "}
          </Text>
          <Space h="xl" />
          <Title order={4}>Selling an item</Title>
          <Space h="xl" />
          <Text fw={500}>1. Submit your item</Text>
          <Space h="sm" />
          <Text fz="md">
            It’s free to submit your item. We simply ask you for a few details –
            including some photos, and a brief description of the item.{" "}
          </Text>
          <Text fz="md">
            Our experienced auction team will review your submission and may ask
            you some follow-up questions. We will do our best to give you an
            answer within a business day. Not every item is right for
            AuctionPal, but we always appreciate you taking the time to submit
            your item to us!
          </Text>
          <Space h="xl" />
          <Text fw={500}>2. Prepare Your Listing </Text>
          <Space h="sm" />
          <Text fz="md">
            Once your submission is accepted, we’ll need some additional
            information from you – like detailed photos, service and ownership
            history, etc. Don’t worry – we’re here to help you throughout the
            process!
          </Text>
          <Space h="xl" />
          <Title order={3} ref={faqRef}>Frequently Asked Questions</Title>
          <Space h="md" />
          <Text fw={500}>How can I sign in?</Text>
          <Space h="sm" />
          <Text fz="md">
            You can sign in using either an email address and password, or one
            of multiple Sign On platforms (Google, Facebook, or Apple). Simply
            click the “Sign Up” or “Sign In” button at the top right of your
            screen. If you see the Sign Up screen, click the “Sign in here” link
            to go to Sign In. There you can enter your email and password, or
            select the Sign On platform you have linked to your account.
          </Text>
          <Space h="sm" />
          <Text fw={500}>How do I register to bid?</Text>
          <Space h="sm" />
          <Text fz="md">
            In order to register, first sign up by clicking the “Sign In” icon
            in the upper right corner of the screen – then click “Sign up here”
            in the box that subsequently pops up. Once you create a username and
            password, you’ll be prompted to verify your email address. After
            you’ve done that, you can return to AuctionPal and you’ll be
            prompted to register to bid.
          </Text>
          <Text fz="md">
            Once you find an item you want to bid on, click “Place Bid” on the
            item’s listing page, and you’ll be prompted to register before you
            can bid. You will have to enter your credit information, as we place
            a hold on each bidder’s credit card until the conclusion of the
            auction.
          </Text>
          <Space h="md" />
          <Text fw={500}>How do I submit my Vehicle for sale?</Text>
          <Space h="md" />
          <Text fz="md">To submit your vehicle for sale, go to the “Submit your vehicle” link in the header. In order to sell your car, you’ll need to provide us with some important information – like the make, model, year, a few photos, and some other relevant details. If we’re interested in selling your Vehicle, we’ll get in touch with you. Then we’ll ask you for a more detailed set of questions so we can make sure our auction description is accurate.</Text>
          <Space h="md" />
          <Text fw={500}>What information do I need to provide in order to sell my car?</Text>
          <Space h="md" />
          <Text fz="md">We start with just the basics: we can let you know if we’ll accept your car if you just give us the make, model, year, some photos, and a few other details. If we accept your car based on this information, we’ll then need to gather more details – we’ll ask about your history with the car, features, and other items that help us craft our listing.</Text>
          <Space h="md" />
          <Title order={3} ref={bidRef}>How to bid an Auction</Title>
          <Space h="md" />
          <Text fz="md">In order to place a bid, you first have to register, which we’ve explained above. Once you’ve registered and you’ve found an item you’re interested in buying, bidding is easy – just click the “Place Bid” icon on a item’s listing page. Then, you’re prompted to enter your bid amount. Your bid must be higher than the previous bid, of course – and depending on the current bidding level, there may be a minimum increase over the previous bid.</Text>
          <Space h="md" />
          <Title order={3} ref={paymentRef}>Payments</Title>
          <Space h="md" />
          <Text fw={500}>Buyers are expected to pay for the item in-full within a week of the auction closing.</Text>
          <List>
            <List.Item>If there’s an outstanding loan on the item, the buyer and seller should discuss how it will be paid off and the specific next steps, so that the buyer can complete the transaction safely.</List.Item>
            </List>
        </Paper>
    )
}

export default SupportDetails;