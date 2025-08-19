import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md'
import { FaIndianRupeeSign } from "react-icons/fa6";

export default function ListingItem({ listing }) {
  console.log(listing);
  
  return (
     

<Link to={`/listing/${listing._id}`}>
    <div className="   border-2 border-black   mt-10   card flex flex-col lg:flex-row   rounded-lg">
    
      <img
        src={listing.imagesURLs[0] || "https://img.indiafilings.com/learn/wp-content/uploads/2015/10/12011006/Real-Estate-Agent-Business-India.jpg" }
        alt="listing cover"
        height={200}
        width={400}
        className="  thumbnail m-2 rounded  "
      />
      <div className="card-detail   flex flex-col justify-between ">
        {/* <div className='flex flex-row justify-between   font-semibold text-gray-500'>
          <div className='tag'> </div>
          <div className='date'>{listing.date}</div>
        </div> */}

        <div className=' mt-3 middle mx-5'>
        <p className="truncate text-lg font-semibold text-slate-700">
          {listing.name}
        </p>
        
        <p className="text-sm mt-3  text-gray-600 line-clamp-2">
          {listing.description}
        </p>
        <p className=" text-slate-500 mt-3 font-semibold ">
          <FaIndianRupeeSign className="inline" />
          <p className=" inline ">
            {listing.offer ? (listing.type==='rent'? listing.discountPrice + '/month':listing.discountPrice) :(listing.type==='rent'? listing.regularPrice+ '/month':listing.regularPrice) }
          </p>
        </p>
        <div className="text-slate-700 mt-3 flex gap-5">
          <div className="font-bold text-xs">
            {listing.bedrooms>1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
          </div>
           <div className="font-bold text-xs">
            {listing.bathrooms>1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
          </div>
          </div>
          <div className="flex  mt-3 items-center gap-1">
          <MdLocationOn className="h-4 w-4 text-green-700" />
          <p className="text-sm text-gray-600  ">
            {listing.address}
          </p>
          

        </div>
        <p className='ext-sm mt-3  text-gray-600 '>listed on {listing.updatedAt}</p>
        </div>

    </div>
    
  </div>
  </Link>
  );
}

