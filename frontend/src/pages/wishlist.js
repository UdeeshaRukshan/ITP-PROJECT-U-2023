import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Wishlist = () => {
    const [properties, setProperties] = useState({});
    const [message, setMessage] = useState("");

    const imageLinks =[
        "https://img.freepik.com/premium-photo/real-estate-dream-home_839035-11897.jpg?w=740",
        "https://img.freepik.com/free-photo/design-house-modern-villa-with-open-plan-living-private-bedroom-wing-large-terrace-with-privacy_1258-170466.jpg?t=st=1697359090~exp=1697362690~hmac=c4cb56de4102e8ac771e36a727ac1155f494e69734744ae8b59eebf3968b079c&w=1060",
        "https://img.freepik.com/premium-photo/house-with-pool-background_645407-34.jpg?w=740",
        "https://img.freepik.com/premium-photo/photo-modern-house-with-parked-car-driveway_822108-3919.jpg?w=740",
        "https://img.freepik.com/free-photo/relax-house-thai-style_1150-17982.jpg?w=360&t=st=1697359167~exp=1697359767~hmac=f685c1ccd14e29315ff7809a211e4d1fcf098fc42cbc2d7b5e83319847be1452",
        "https://img.freepik.com/free-photo/swimming-pool_1203-2576.jpg?w=360&t=st=1697359191~exp=1697359791~hmac=fc1a440759186825db16a2b09b0af721bad51ae57ea46205e49bc8e981a6dd3c",
        
      ];


    //get all wishlists items
    useEffect(() => {
        async function fetchProperties() {
            try {
                const response = await axios.get(
                    "http://localhost:4042/api/getWishlist",{withCredentials:true});
                setProperties(response.data);

                console.log(response.data);
            } catch (error) {
                alert(error.message);
            }
        }

        fetchProperties();
    }, []);

    const deleteWishlistItems = async (propertyId) => {
        console.log(propertyId);

        
            axios.delete(
                `http://localhost:4042/api/withlist/delete/${propertyId}`,{ withCredentials: true }).then((res)=>{
                    setMessage("Item added to wishlist successfully.");
                    const newWishList = properties.itemId.filter((item) => item._id !== propertyId);
    
                    setProperties({...properties, itemId: newWishList});
                }).catch((error)=>{
                    setMessage("Error adding item to wishlist.");
                });
    };

    return (
        <div style={{ marginTop: 80 }}>
            <table>
                <thead>
                    <tr>
                        <th>Item Image</th>
                        <th>Item address</th>
                        <th>Item Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(properties.itemId) ? properties.itemId.map((property,index) => (
                        <tr key={property._id}>
                            <td>
                                <img
                                    src={imageLinks[index]}
                                    width="250" // Adjust the width as needed
                                    height="250" // Adjust the height as needed
                                />
                            </td>

                            <td>{property.address}</td>
                            <td>{property.description}</td>
                            <td>
                                <button
                                    onClick={() => deleteWishlistItems(property._id)}
                                    style={{color : 'white',
                                            backgroundColor: 'red'}}
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>
                    )) : null}
                </tbody>
            </table>
        </div>
    );


};
export default Wishlist;
