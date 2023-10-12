import WishlistSingleCard from './WishlistSingleCard'; // Assuming you have a WishlistSingleCard component

const WishlistCard = ({ wishlists }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {wishlists.map((item) => (
        <WishlistSingleCard key={item._id} wishlist={item} />
      ))}
    </div>
  );
 
};

export default WishlistCard;
