import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AddComment from './AddComments';
import AllComments from './allComments';

function VehicleDetails() {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentBid, setCurrentBid] = useState(0);
    const [countdown, setCountdown] = useState(0);
    const [pageVisibility, setPageVisibility] = useState(true);
    const [userId, setUserId] = useState(null);
    const [auctionStatus, setAuctionStatus] = useState(false);
    const [placeBid, setPlaceBid] = useState('none');

    function getCookie(name) {
        const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${name}=`));
    
        if (cookieValue) {
            setUserId(cookieValue.split('=')[1])
            return cookieValue.split('=')[1];
        }
    
        return null;
        }
  
    useEffect(() => {
      async function fetchVehicleDetails() {
        try {
          const response = await fetch(`http://localhost:4042/vehicle/getvehicle/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          const vehicleData = data.Vehicle;
  
          // Format the 'startTime' and 'endTime' for display
          const formattedStartTime = moment(vehicleData.startTime).tz('Asia/Colombo').format('MMM DD, YYYY, h:mm A');
          const formattedEndTime = moment(vehicleData.endTime).tz('Asia/Colombo').format('MMM DD, YYYY, h:mm A');
          setVehicle({
            ...vehicleData,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
          });
          setLoading(false);

          if(new Date(vehicleData.endTime)<new Date()){
            if(vehicleData.bidder === getCookie('userId')){
                setPageVisibility(true)
                setAuctionStatus(true)
            }
            else{
                setPageVisibility(false)
            }
          }

          const endTime = new Date(vehicleData.endTime).getTime();
          const now = Date.now();

        if (endTime > now) {
          const timer = setInterval(() => {
            const remainingTime = endTime - Date.now();
            if (remainingTime > 0) {
              const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
              const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
              const seconds = Math.floor((remainingTime / 1000) % 60);
              setCountdown(`${hours}:${minutes}:${seconds}`);
            } else {
              setCountdown('0:0:0');
              clearInterval(timer);
            }
          }, 1000);
        } else {
          setCountdown('0:0:0');
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
      }

      fetchVehicleDetails();
    }, [id]);
  
    const handleBidSubmit = async(e) => {
        console.log(currentBid);
        console.log(vehicle._id);
      e.preventDefault();
      if(currentBid < vehicle.value){
        alert("Bid value must grater than current value")
        return;
      }
      else{
        const bidder = getCookie('userId');
        try {
            const response = await fetch(`http://localhost:4042/vehicle/addBid/${vehicle._id}/${currentBid}/${bidder}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            else{
                console.log(await response.json());
                alert("Bid added successfully")
            }
        }
        catch(error){
            console.log(error);
        }
    };
}
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }

  return (
    <div>
        {pageVisibility?(
            <div>
                <h4 style={{marginTop:'150px',display:'flex',justifyContent:'center',alignItems:'center',marginRight:'50vw'}}>
                    <b>{vehicle.model}</b>
                </h4>
                    <div style={{ display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <img
                        src={vehicle.image}
                        alt={vehicle.vehicleNumber}
                        style={{ width: "60vw", height: "400px" }}
                        />
                    </div>

                    <div style={{marginBottom:'20px', display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20px',marginLeft:'-200px'}}>
                        <Badge pill bg="danger" style={{width:'40vw',display:'flex'}}>
                            <h6 style={{marginLeft:'40px'}}>Time Left : {countdown}</h6>
                            <h6 style={{marginLeft:'60px'}}>High Bid : {vehicle.value}</h6>
                            <h6 style={{marginLeft:'60px'}}>Comments : 13</h6>
                        </Badge>
                        {auctionStatus? 
                        <Badge pill bg="success">
                            <h6>You won the auction</h6>
                        </Badge>
                        :
                        <Button variant="success" style={{marginLeft:'10px'}} onClick={()=>setPlaceBid('block')}>Place Bid</Button>
                        }
                    </div>

                    <div style={{display:placeBid}}>
                    <form onSubmit={handleBidSubmit} style={{marginBottom:'10px',marginRight:'25vw', display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <label htmlFor="bidAmount">Your Bid Amount: $</label>
                        <input
                        type="number"
                        id="bidAmount"
                        value={currentBid}
                        onChange={(e) => setCurrentBid(parseInt(e.target.value, 10))}
                        />
                        <button type="submit">Place Bid</button>
                    </form>
                    </div>

                    <h5 style={{ display:'grid',justifyContent:'center',alignItems:'center',marginRight:'50vw'}}>
                        Description
                    </h5>
                    <hr style={{ display:'flex',justifyContent:'center',alignItems:'center',width:'60vw',marginLeft:'20vw'}}></hr>

                    <div  style={{ width: "60vw", display: 'grid', justifyContent: 'center', alignItems: 'flex-start' }}>

                    <div style={{backgroundColor:'whitesmoke',width:'60vw',marginLeft:'40vw',padding:'10px'}}>

                        <h6 style={{ textAlign: "left", display: "flex" }}>
                        <b>Vehicle modal : </b>{vehicle.model}
                        </h6>

                        <h6 style={{ display: "flex" }}> <b>Vehicle Number : </b>{vehicle.vehicleNumber}</h6>

                        <h6 style={{ textAlign: "left", display: "flex" }}>
                            <b>Year:</b> {vehicle.year}
                        </h6>
                        <h6 style={{ textAlign: "left", display: "flex" }}>
                            <b>Location: </b>{vehicle.location}
                        </h6>
                        <h6 style={{ textAlign: "left", display: "flex" }}>
                            <b>Fuel Type: </b>{vehicle.fuelType}
                        </h6>
                        <h6 style={{ textAlign: "left", display: "flex" }}>
                            <b>Mileage: </b>{vehicle.mileage}
                        </h6>
                        <h6 style={{ textAlign: "left", display: "flex" }}>
                            <b>Features: </b>{vehicle.features}
                        </h6>
                        <h6 style={{ textAlign: "left", display: "flex" }}>
                            <b>Current Bid: </b>{vehicle.value}
                        </h6>
                        <h6 style={{ textAlign: "left", display: "flex" }}>
                            <b>Start time: </b>{vehicle.startTime}
                        </h6>
                        <h6 style={{ textAlign: "left", display: "flex" }}>
                            <b>End time: </b>{vehicle.endTime}
                        </h6>
                        </div>
                        </div>

                        <diV>
                          <AddComment/>
                        </diV>
                        <div>
                          <AllComments/>
                        </div>
            </div>
        ):(
            <div>
                <h2 style={{ margin: "auto", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Auction has been ended!!!
                </h2>
                <button style={{ margin: "auto", display: "flex", justifyContent: "center", alignItems: "center", height: "8vh" ,marginTop: "-30vh",width:"20vh"}}>Pay Now</button>
            </div>
        )}

    </div>
  );
}

export default VehicleDetails;
