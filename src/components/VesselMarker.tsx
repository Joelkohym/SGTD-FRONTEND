import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import customIcon from '../assets/arrow.png'
import styled from "styled-components";

interface VesselMarkerProps {
  coordinates: any;
  name?: string;
  vesselInfo?: any;
}

const VesselMarker: React.FC<VesselMarkerProps> = ({
  coordinates,
  vesselInfo,
}) => {

  const customMarkerIcon = new L.Icon({
    iconUrl: customIcon,
    iconSize: [25, 25], // Set the icon size
    iconAnchor: [15, 15], // Set the anchor point
  });

  return (
    <Marker position={coordinates} icon={customMarkerIcon}>
      <Popup>
        <Text>
          <strong>Vessel Info</strong>
        </Text>
        <Text>
          <strong>Vessel Name: </strong>
          {vesselInfo?.vesselName}
        </Text>
        <Text>
          <strong>Call Sign: </strong>
          {vesselInfo?.callSign}
        </Text>
        <Text>
          <strong>Imo Number: </strong>
          {vesselInfo?.imoNumber}
        </Text>
        <Text>
          <strong>Flag: </strong>
          {vesselInfo?.flag}
        </Text>
        <Text>
          <strong>Vessel Length: </strong>
          {vesselInfo?.vesselLenghth}
        </Text>
        <Text>
          <strong>Vessel Breadth:</strong>
          {vesselInfo?.vesselBreadth}
        </Text>
        <Text>
          <strong>Vessel Depth: </strong>
          {vesselInfo?.vesselDepth}
        </Text>
        <Text>
          <strong>Vessel Type: </strong>
          {vesselInfo?.vesselType}
        </Text>
        <Text>
          <strong>Gross Tonnage: </strong>
          {vesselInfo?.grossTonnage}
        </Text>
        <Text>
          <strong>Net Tonnage: </strong>
          {vesselInfo?.netTonnage}
        </Text>
        <Text>
          <strong>Dead Weight: </strong>
          {vesselInfo?.deadweight}
        </Text>
        <Text>
          <strong>MMSI Number: </strong>
          {vesselInfo?.mmsiNumber}
        </Text>
        <Text>
          <strong>Year Built: </strong>
          {vesselInfo?.yearBuilt}
        </Text>
        <Text>
          <strong>Latitude: </strong>
          {vesselInfo?.latitude}
        </Text>
        <Text>
          <strong>Longitude: </strong>
          {vesselInfo?.longitude}
        </Text>
        <Text>
          <strong>Latitude Degrees: </strong>
          {vesselInfo?.latitudeDegrees}
        </Text>
        <Text>
          <strong>Longitude Degrees:</strong>
          {vesselInfo?.longitudeDegrees}
        </Text>
        <Text>
          <strong>Speed: </strong>
          {vesselInfo?.speed}
        </Text>
        <Text>
          <strong>course: </strong>
          {vesselInfo?.course}
        </Text>
        <Text>
          <strong>TimeStamp: </strong>
          {vesselInfo?.timeStamp}
        </Text>
        <Text>
          <strong>Time Queried: </strong>
          {vesselInfo?.time_queried}
        </Text>
        <Text>
          <strong>Location: </strong>
          {vesselInfo?.location}
        </Text>
        <Text>
          <strong>Grid: </strong>
          {vesselInfo?.grid}
        </Text>
        <Text>
          <strong>Purpose: </strong>
          {vesselInfo?.purpose}
        </Text>
        <Text>
          <strong>Agent: </strong>
          {vesselInfo?.agent}
        </Text>
        <Text>
          <strong>Reported Arrival Time: </strong>
          {vesselInfo?.reported_arrival_time}
        </Text>
      </Popup>
    </Marker>
  );
};

export default React.memo(VesselMarker);

const Text = styled.div`
  font-size: 0.7rem;
  font-weight: 400;
`;
