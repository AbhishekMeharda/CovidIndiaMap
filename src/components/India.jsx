import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import indiaTopoJson from '../india.json'; // Ensure this is a valid path to your TopoJSON file

const IndiaMap = () => {


    return (
        <div>
            <ComposableMap
                projection="geoMercator"
                width={800}
                height={600}
                projectionConfig={{
                    scale: 900,
                    center: [78.9629, 22.5937],
                }}
            >
                <Geographies geography={indiaTopoJson}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onClick={() => handleStateClick(geo.properties.state)}
                                style={{
                                    default: { fill: "#ECEFF1", outline: "none" },
                                    hover: { fill: "#CFD8DC", outline: "none" },
                                    pressed: { fill: "#fb8760", outline: "none" },
                                }}
                            />
                        ))
                    }
                </Geographies>
            </ComposableMap>
            {selectedState && (
                <div>
                    <h2>{selectedState}</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {stateData && (
                        <ul>
                            <li>Suspected: {stateData.suspected}</li>
                            <li>Tested: {stateData.tested}</li>
                            <li>Confirmed: {stateData.confirmed}</li>
                            <li>Deaths: {stateData.deaths}</li>
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default IndiaMap;
