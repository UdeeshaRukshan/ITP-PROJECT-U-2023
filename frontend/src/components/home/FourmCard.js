import React from "react";
import ForumSingleCard from './ForumSingleCard'; // Assuming you have a ForumSingleCard component


const ForumCard = ({ forums }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {forums.map((item) => (
        <ForumSingleCard key={item._id} forum={item} />
      ))}
    </div>
  );
};

export default ForumCard;
