import React, { useEffect, useState } from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import { useLocation } from 'react-router';
import axios from 'axios';
import { toast } from 'react-hot-toast';


export const ShipmentDetailsPage = () => {
    const location = useLocation()
    const shipment = location.state
    console.log(shipment.trackingNumber)
    const [trackingData, setTrackingData] =useState('')

    function trackShipment() {
        try {
            const response = axios.get(`https://api-bekkah.onrender.com/api/delivery/track/${shipment.trackingNumber}`)
            if (response) {
                setTrackingData(response?.data?.trackingData?.shipments)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message||'error something went wrong')
        }
    }
    useEffect(()=>{
        trackShipment()
    },[shipment])

  return (
    <div className="flex flex-col items-center py-8 w-full" >
      <div className="flex items-center">
        <Icon icon={'ion:location-sharp'} className="text-5xl mr-4 text-blue-500" />
        <h1 className="text-3xl font-bold">Shipment Details</h1>
      </div>
      <div className="mt-8 p-6 bg-white shadow-md rounded-lg w-full lg:w-5/6">
        <div className="">
        <img src={shipment?.product?.productImage[0]} alt="" className='w-[100px]' />
        <h2 className="text-xl font-bold mb-4">{shipment?.product?.name}</h2>
        </div>
       
        <p className="mb-2">
        </p>
        <div className="flex items-center justify-between flex-wrap">
        <p className="mb-2">
          <span className="font-bold">Tracking Number:</span> {shipment.trackingNumber}
        </p>
        <p className="mb-2">
          <span className="font-bold">Source Location:</span> {shipment?.from?.address1}
        </p>
        <p className="mb-2">
          <span className="font-bold">Destination:</span> {shipment?.to?.address1}
        </p>
        <p className="mb-2">
          <span className="font-bold">Weight:</span> {}
        </p>
        <p className="mb-2">
          <span className="font-bold">Dimension:</span> {}
        </p>
        <p className="mb-2">
          <span className="font-bold">:</span> {}
        </p>
        </div>

        <div className="border-t-2 border-gray-300 pt-4 mt-4">
          <h3 className="text-lg font-bold mb-2">Shipment Events</h3>
          <ul>
            <li className="flex items-center">
              <InlineIcon icon={'ion:location-sharp'} className="mr-2 text-gray-500" />
              <span>Shipment picked up</span>
            </li>
            <li className="flex items-center">
              <InlineIcon icon={'ion:location-sharp'} className="mr-2 text-gray-500" />
              <span>Departed from warehouse</span>
            </li>
            <li className="flex items-center">
              <InlineIcon icon={'ion:location-sharp'} className="mr-2 text-gray-500" />
              <span>In transit</span>
            </li>
            <li className="flex items-center">
              <InlineIcon icon={'ion:location-sharp'} className="mr-2 text-gray-500" />
              <span>Out for delivery</span>
            </li>
            <li className="flex items-center">
              <InlineIcon icon={'ion:location-sharp'} className="mr-2 text-gray-500" />
              <span>Delivered</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
