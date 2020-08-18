import React from "react";

import PropTypes from "prop-types";

import ContactsMap from "../../../contacts-map";

const Map = ({ coordinates }) => (
    <ContactsMap
        position={{
            lat: coordinates.lat,
            lng: coordinates.lon
        }}
        zoom={15}
    />
);

Map.propTypes = {
    coordinates: PropTypes.object
};

export default Map;
