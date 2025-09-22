import React from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import geoData from "./map.json"

import "./Map.scss"

export const Map = (): JSX.Element => {
  const markers = [
    { markerOffset: 20, name: "New Zealand", coordinates: [170, -44.2] },
    { markerOffset: 20, name: "Germany",   coordinates: [10.45167, 51.165] },
    { markerOffset: 20, name: "USA",       coordinates: [-98.5795, 39.8283] },
    { markerOffset: 20, name: "Canada",    coordinates: [-106.3468, 56.1304] },
    { markerOffset: 20, name: "UK",        coordinates: [-3.4360, 55.3781] },
  ];

  return (
    <div className="map">
      <ComposableMap>
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} />)
          }
        </Geographies>

        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker key={name} coordinates={coordinates}>
            <g className="marker-group">
              <g
                className="marker"
                stroke="#d70303"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
              >
                <circle fill="#FF5533" cx="12" cy="10" r="3" />
                <path fill="#FF5533" d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </g>

              <g className="marker-label">
                <rect
                  x={name === 'New Zealand' ? (-name.length * 4) - 40 : -name.length * 4}
                  y={markerOffset - 16}
                  width={name.length * 8.5}
                  height={16}
                  fill="#fff"
                  rx={3}
                  ry={3}
                />
                <text
                  textAnchor="middle"
                  y={markerOffset - 3}
                  x={name === 'New Zealand' ? -40 : 0}
                  style={{
                    fontFamily: "system-ui",
                    fill: "#000",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {name}
                </text>
              </g>
            </g>
          </Marker>

        ))}
      </ComposableMap>
    </div>
  )
}
