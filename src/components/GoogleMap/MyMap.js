import React, { useState } from "react"
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { osm } from 'pigeon-maps/providers'

export function MyMap(props) {
    const [hue, setHue] = useState(0);
    const color = `hsl(${hue % 360}deg 39% 70%)`;
    const [lonF , latF] = props.from;
    const [lon , lat] = props.to;

    return (
        <Map key="map" height={800} 
        defaultCenter={[23.8139114, 90.411445]} 
        defaultZoom={11}
        provider={osm}
        dprs={[1, 2]} // this provider supports HiDPI tiles
        defaultZoom={11}
        >
            <Marker
                width={50}
                anchor={[latF, lonF]}
                color={color}
                onClick={() => setHue(hue + 20)}
                payload={1}
            />
            <Marker
                width={50}
                anchor={[lon, lat]}
                color={color}
                onClick={() => setHue(hue + 20)}
            />
            <ZoomControl></ZoomControl>
        </Map>
    )
}