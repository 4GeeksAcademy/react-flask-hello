import React, { useEffect, useRef, useState } from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { APIProvider, useMap, Map } from '@vis.gl/react-google-maps';
import {AdvancedMarker} from '@vis.gl/react-google-maps';

const MADRID_LOCATION = { lat: 40.4168, lng: -3.7038 };
const logoSvgStyles = {
  marginRight: '10px',
  width: '35px',
  height: '35px',
  fill: '#ffeb3b', // Amarillo cereal
};


export const GoogleMapWithCustomControl = () => {

  
  const {store,dispatch} = useGlobalReducer()
  const [coordenadas, setCoordenadas] = useState({
    latitude: MADRID_LOCATION.lat,
    longitude: MADRID_LOCATION.lng
  });





  return (
    <APIProvider apiKey={"AIzaSyA5_WFVBLTMfaheneobOObkt0mLJZj1EcQ"}>
      <Map defaultZoom={5}
        defaultCenter={MADRID_LOCATION}
        mapId={"d9aa07a16a3fc9d12e3ebf0b"}
        mapTypeControl={false}
        disableDefaultUI={true}
        clickableIcons={false}
        disableDoubleClickZoom={true}
        zoomControl={true}
        gestureHandling={'greedy'}
        onClick={(e) =>{
          const newCoordenates={
            latitude: e.detail.latLng?.lat || 0,
            longitude: e.detail.latLng?.lng || 0,}
          setCoordenadas(newCoordenates)
          dispatch({
              type : "add_coordenates",
              payload : newCoordenates
          })

        }} >
        <AdvancedMarker position={{ lat: coordenadas.latitude, lng: coordenadas.longitude }}>
          <svg style={logoSvgStyles} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={32} height={32} >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2zm-3-4h2v4H8zm0 6h2v2H8zm6-6h2v4h-2zm0 6h2v2h-2z"/>   
          </svg>        
        </AdvancedMarker>
      </Map>
    </APIProvider>
  )
};

