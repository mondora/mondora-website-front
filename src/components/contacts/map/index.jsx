import React, { memo } from "react";
import { ContactsMap } from "../../contacts-map";

export const Map = memo(() => (
    <ContactsMap
        position={{
            lat: 46.16153,
            lng: 9.758879
        }}
        zoom={15}
    />
));
