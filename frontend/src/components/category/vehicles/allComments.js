import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllComments.css'
import { HiUser } from "react-icons/hi";

export default function AllComments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    function getComments() {
      axios.get("http://localhost:4042/LiveComments/")
        .then((res) => {
          setComments(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getComments();
    const refreshInterval = setInterval(getComments, 100);

        return () => {
            clearInterval(refreshInterval);
        };
  }, []);

  return (
    <div className = "cmtDisplay">
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}><HiUser/> {comment.userId}:{comment.Comment}</li>
        ))}
      </ul>
    </div>
  );
}
