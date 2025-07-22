import React, { useEffect, useRef, useState } from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer";
import {APIProvider, useMap ,Map} from '@vis.gl/react-google-maps';

const MADRID_LOCATION = { lat: 40.4168, lng: -3.7038 };

  

export const GoogleMapWithCustomControl = () => {

  <APIProvider apiKey={import.meta.env.GOOGLE_MAPS_API_KEY}>
    <Map zoom={10} center={{lat: 53.54992, lng: 10.00678}} />
  </APIProvider>
};

