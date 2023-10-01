import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Wishlist = () => {
    const [properties, setProperties] = useState({});
    const [message, setMessage] = useState("");


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
                    {Array.isArray(properties.itemId) ? properties.itemId.map((property) => (
                        <tr key={property._id}>
                            <td>
                                <img
                                    src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg"
                                    alt={`Property ${property._id}`}
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
