import React from "react";

import ContactsMap from "../../../contacts-map";

const Map = () => (
    <ContactsMap
        position={{
            lat: 46.16153,
            lng: 9.758879
        }}
        zoom={15}
    />
);

export default Map;
