import React from "react";
import PropTypes from "prop-types";

import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>

const ContactsMap = ({position, zoom}) => {
    return (
        <div style={{ height: "520px", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.GATSBY_MAPS_API_KEY
                }}
                defaultCenter={position}
                defaultZoom={zoom}
            >
                <AnyReactComponent
                    lat={46.1612067}
                    lng={9.7570392}
                    text={"MONDORA"}
                />
            </GoogleMapReact>
        </div>
    );
};

export default ContactsMap;