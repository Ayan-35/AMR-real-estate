import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { useSelector } from "react-redux";
import 'swiper/css/bundle';
import { FaIndianRupeeSign } from "react-icons/fa6";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaWhatsapp,
  FaMapMarker,
} from "react-icons/fa";
 



let whatURL="";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams()
  const [listing, setListing] = useState(null);
      const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
   const [copied, setCopied] = useState(false);
   const [contact, setContact] = useState(false);
   const [formData, setFormData] = useState({});
   const { currentuser } = useSelector((state) => state.user);

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: listing.listingId });
    console.log(formData);
    handleSubmit()
  };
   
  const handleSubmit = async (e) => {
    if (confirm("do you want to save this property")) {
      console.log("update button is clicked");
      e.preventDefault();
      console.log("currentuser is", currentuser);
      try {
        dispatch(updateUserStart());
        console.log(currentuser._id);
        const res = await fetch(`/api/user/update/${currentuser._id}`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({savings:listing.listingId}),
        });
        const data = await res.json();
        console.log("updated data", data);
        if (data.success === false) {
          dispatch(updateUserFailure(data.message));
          return;
        }
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
      } catch (err) {
        dispatch(updateUserFailure(err.message));
      }
    }
  };




  useEffect(() => {
    const fetchListing = async () => {
      
      try {
        setLoading(true);
        const response = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await response.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
         
          return;
        }
        setListing(data);
        whatURL=` https://wa.me/${data.contact}?text= Hello I am interested in your property listed on MARG estate by name ${data.name}`
        console.log(data)
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  },[params.listingId])




  return (
    <main>
      {loading ? (
        <p className="text-center my-7 text-2xl"> Loading...</p>
      ) : null}
      {error ? (
        <p className="text-center my-7 text-2xl"> something went wrong!</p>
      ) : null}


      <div className='m-3'>
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imagesURLs.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[350px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
           
          <div className='mt-2 border-2 border-black rounded'>
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - <FaIndianRupeeSign className='inline h-5' />{" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                
                  <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  <FaIndianRupeeSign className="inline" />
              <p className='inline'>{+listing.regularPrice - +listing.discountPrice} OFF</p>
              </p>
                
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            <div className="flex gap-4">
            <div className="bg-transparent  w-full max-w-[200px] text-white text-center p-1 rounded-md">
              <a target='_blank' href={whatURL} className="text-green-500"><p><FaWhatsapp className="inline" /> <p className="inline">Chat on WhatsApp</p></p></a>
           </div>
           <div className="bg-transparent w-full max-w-[200px] text-white text-center p-1 rounded-md">
              <a href={listing.Location} target='_blank' className="text-blue-500"> <p> <FaMapMarker className="inline " /><p className=" inline "> Google map location</p></p></a>
           </div>
           </div>
          </div>
        </div>
        </>
      )}
      
      </div>
    </main>
  );
}
