import React from "react";
import PropTypes, { number } from "prop-types";

import styled from "styled-components";

import GoogleMapReact from "google-map-react";

import PointerSrc from "../../../static/images/pointer.svg";

const PointerImg = styled.img`
    height: 140px;
    width: 100px;
    position: relative;
    top: -104px;
    left: -56px;
    border-radius: 100%;
`;

const ContactsMap = ({ position, zoom }) => {
    return (
        <div style={{ height: "520px", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.GATSBY_MAPS_API_KEY
                }}
                defaultCenter={position}
                defaultZoom={zoom}
            >
                <PointerImg
                    lat={position.lat}
                    lng={position.lng}
                    src={PointerSrc}
                />
            </GoogleMapReact>
        </div>
    );
};

ContactsMap.PropTypes = {
    position: PropTypes.object,
    zoom: number
};

export default ContactsMap;
