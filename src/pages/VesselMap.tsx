import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { tileLayer } from "../lib/constants";
import { LatLngExpression } from "leaflet";
import Layout from "../components/Layout";
import styled from "styled-components";
import { mapData, vesselData } from "../lib/mapData";
import PolygonMarker from "../components/PolygonMarker";
import { Section, sharedFlexCenter } from "../styles/global";
import VesselMarker from "../components/VesselMarker";

const VesselMap = () => {
  const center: LatLngExpression = [1.257167, 103.897];

  return (
    <Layout>
      <Container>
        <MapSection>
          <MapContainer
            center={center}
            zoom={12}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer {...tileLayer} />
            {/* <Marker position={[51.505, -0.09]}>
       
      </Marker> */}
            {mapData.map((data) => {
              return (
                <PolygonMarker
                  coordinates={data.coordinates}
                  name={data.name}
                />
              );
            })}
            <VesselMarker coordinates={[1.20442, 103.81]} vesselInfo={vesselData}/>
          </MapContainer>
        </MapSection>
      </Container>
    </Layout>
  );
};

export default VesselMap;

const MapSection = styled.div`
  width: 90%;
  height: 90%;
  border: 2px solid black;
`;
const Container = styled(Section)`
  width: 100%;
  height: 100vh;
  ${sharedFlexCenter}
`;
