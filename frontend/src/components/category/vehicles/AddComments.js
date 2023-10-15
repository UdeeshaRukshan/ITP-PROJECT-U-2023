import React, {useState, useEffect}from "react";
import axios from "axios";
import "./addComment.css";

function AddComment(){

    const [userID, setUserId] = useState(null);
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
    
    const [Comment,setComment] = useState("");
    const email= getCookie('email');
    const itemId = "item02";

    function sendComments(e){
        e.preventDefault();

        const newComment = {
            userID,
            itemId,
            Comment
        }
        axios.post("http://localhost:4042/LiveComments/add",newComment).then(()=>{
            alert("Comment posted");
            setComment("");
        }).catch((err)=>{
            alert(err);
        })
    }


    return(
        <div className = "liveComments">
            <h3 className = "description-Heading">Live Comments</h3>
            <hr/>
        <div className = "cmtPrompt">
            
            <form onSubmit={sendComments}>
                <input type = "text" placeholder='Enter your Comment'onChange={(e)=>{
                    setComment(e.target.value);
                }}></input>
                <button type = "submit">Post</button>
            </form>
        </div>
        </div>
    );
}

export default AddComment;