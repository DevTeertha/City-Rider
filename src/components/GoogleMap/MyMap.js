import React, { useState } from "react"
import { Map, Marker, ZoomControl} from "pigeon-maps";

export function MyMap() {
    const [hue, setHue] = useState(0);
    const color = `hsl(${hue % 360}deg 39% 70%)`;

    return (
        <Map height={800} 
        defaultCenter={[23.8139114, 90.411445]} 
        defaultZoom={10}
        >
            <Marker
                width={50}
                anchor={[23.8139114, 90.411445]}
                color={color}
                onClick={() => setHue(hue + 20)}
                payload={1}
            />
            <Marker
                width={50}
                anchor={[23.8139114, 90.611445]}
                color={color}
                onClick={() => setHue(hue + 20)}
            />
            <ZoomControl></ZoomControl>
        </Map>
    )
}