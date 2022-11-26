import {
  CompassControl,
  KeyboardControl,
  Map,
  MouseControl,
  SyncControl,
  ZoomControl,
} from "react-mapycz";

const MapNoSSR = ({ longitude, latitude }: any) => {
  return (
    <Map height="400px" center={{ lat: 50.0755, lng: 14.4378 }}>
      <KeyboardControl />
      <ZoomControl />
      <MouseControl zoom={true} pan={true} wheel={true} />
      <CompassControl right={10} top={50} />
      <SyncControl />
      {/* <MarkerLayer>
        <Marker
          coords={{ lat: 50.0755, lng: 14.4378 }}
          card={{
            header: "<strong>Card header</strong>",
            body: "<p>Card body</p><img src='https://via.placeholder.com/150x60/454545/eb4034'/>",
            footer: "Card footer",
            options: {
              width: 200,
              height: 200,
            },
          }}
        />
      </MarkerLayer> */}
    </Map>
  );
};

export default MapNoSSR;
