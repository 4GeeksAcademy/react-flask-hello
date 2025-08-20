import {APIProvider, Map} from '@vis.gl/react-google-maps';

 export const Maps = () => (
  <APIProvider apiKey= "AIzaSyDB5Z_PZvSTkU6vpE8vXopjHPmF5b-BKNk">
    <Map
      style={{width: '50vw', height: '50vh'}}
      defaultCenter={{lat: 22.54992, lng: 0}}
      defaultZoom={3}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
  </APIProvider>
);