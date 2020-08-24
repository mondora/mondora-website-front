import React from "react";
import PropTypes, { number } from "prop-types";

import GoogleMapReact from "google-map-react";

import PointerSrc from "../../images/pointer.svg";
import { MapContainer, PointerImg } from "./styled";

const ContactsMap = ({ position, zoom }) => {
    return (
        <MapContainer>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.GATSBY_MAPS_API_KEY
                }}
                defaultCenter={position}
                defaultZoom={zoom}
                options={maps => ({
                    zoomControlOptions: {
                        position: maps.ControlPosition.RIGHT_CENTER,
                        style: maps.ZoomControlStyle.SMALL
                    },
                    styles: [
                        {
                            elementType: "geometry",
                            stylers: [{ color: "#ededee" }]
                        },
                        {
                            elementType: "labels.text.stroke",
                            stylers: [{ visibility: "off" }]
                        },
                        {
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#9f9f9f" }]
                        },
                        {
                            featureType: "administrative.locality",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#9f9f9f" }]
                        },
                        {
                            featureType: "poi",
                            elementType: "labels.text.fill",
                            stylers: [{ visibility: "off" }]
                        },
                        {
                            featureType: "poi",
                            elementType: "labels.icon",
                            stylers: [{ saturation: "-100" }]
                        },
                        {
                            featureType: "poi.park",
                            elementType: "geometry",
                            stylers: [{ color: "#c8c8c8" }]
                        },
                        {
                            featureType: "road",
                            elementType: "geometry",
                            stylers: [{ color: "#ffffff" }]
                        },
                        {
                            featureType: "road",
                            elementType: "geometry.stroke",
                            stylers: [{ color: "#e5e5e5" }]
                        },
                        {
                            featureType: "road",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#636363" }]
                        },
                        {
                            featureType: "road.highway",
                            elementType: "geometry",
                            stylers: [{ color: "#c8c8c8" }]
                        },
                        {
                            featureType: "road.highway",
                            elementType: "geometry.stroke",
                            stylers: [{ color: "#c9c9c9" }]
                        },
                        {
                            featureType: "road.highway",
                            elementType: "labels.text.fill",
                            stylers: [{ visibility: "off" }]
                        },
                        {
                            featureType: "road",
                            elementType: "labels.icon",
                            stylers: [{ visibility: "off" }]
                        },
                        {
                            featureType: "transit",
                            elementType: "geometry",
                            stylers: [{ color: "#2f3948" }]
                        },
                        {
                            featureType: "transit.station",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#a6a6a6" }]
                        },
                        {
                            featureType: "transit.station",
                            elementType: "labels.icon",
                            stylers: [{ saturation: "-100" }]
                        },
                        {
                            featureType: "water",
                            elementType: "geometry",
                            stylers: [{ color: "#c8c8c8" }]
                        },
                        {
                            featureType: "water",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#5c5c5c" }]
                        },
                        {
                            featureType: "water",
                            elementType: "labels.text.stroke",
                            stylers: [{ visibility: "off" }]
                        }
                    ]
                })}
            >
                <PointerImg
                    lat={position.lat}
                    lng={position.lng}
                    src={PointerSrc}
                />
            </GoogleMapReact>
        </MapContainer>
    );
};

ContactsMap.propTypes = {
    position: PropTypes.object,
    zoom: number
};

export default ContactsMap;
