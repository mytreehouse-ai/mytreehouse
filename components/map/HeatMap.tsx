"use client";

import Map, { Source, Layer } from "react-map-gl";
import { env } from "@/lib/env.mjs";
import { HeatmapLayer } from "react-map-gl";
import { useState, useEffect, useMemo } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ControlPanel from "./control-panel";

function filterFeaturesByDay(
  featureCollection: { features: any[] } | null,
  time: string | number | Date,
) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const features =
    featureCollection &&
    featureCollection.features.filter((feature) => {
      const featureDate = new Date(feature.properties.time);
      return (
        featureDate.getFullYear() === year &&
        featureDate.getMonth() === month &&
        featureDate.getDate() === day
      );
    });
  return { type: "FeatureCollection", features };
}

const HeatMap = () => {
  const [allDays, useAllDays] = useState(true);
  const [timeRange, setTimeRange] = useState([0, 0]);
  const [selectedTime, selectTime] = useState(0);
  const [earthquakes, setEarthQuakes] = useState(null);

  useEffect(() => {
    /* global fetch */
    fetch("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson")
      .then((resp) => resp.json())
      .then((json) => {
        // Note: In a real application you would do a validation of JSON data before doing anything with it,
        // but for demonstration purposes we ingore this part here and just trying to select needed data...
        const features = json.features;
        const endTime = features[0].properties.time;
        const startTime = features[features.length - 1].properties.time;

        setTimeRange([startTime, endTime]);
        setEarthQuakes(json);
        selectTime(endTime);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);

  const MAX_ZOOM_LEVEL = 9;

  const heatmapLayer: HeatmapLayer = {
    id: "heatmap",
    maxzoom: MAX_ZOOM_LEVEL,
    type: "heatmap",
    paint: {
      // Increase the heatmap weight based on frequency and property magnitude
      "heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 0, 0, 6, 1],
      // Increase the heatmap color weight weight by zoom level
      // heatmap-intensity is a multiplier on top of heatmap-weight
      "heatmap-intensity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        1,
        MAX_ZOOM_LEVEL,
        3,
      ],
      // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
      // Begin color ramp at 0-stop with a 0-transparancy color
      // to create a blur-like effect.
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(33,102,172,0)",
        0.2,
        "rgb(103,169,207)",
        0.4,
        "rgb(209,229,240)",
        0.6,
        "rgb(253,219,199)",
        0.8,
        "rgb(239,138,98)",
        0.9,
        "rgb(255,201,101)",
      ],
      // Adjust the heatmap radius by zoom level
      "heatmap-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        2,
        MAX_ZOOM_LEVEL,
        20,
      ],
      // Transition from heatmap to circle layer by zoom level
      "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
    },
  };

  const data = useMemo(() => {
    return allDays
      ? earthquakes
      : filterFeaturesByDay(earthquakes, selectedTime);
  }, [earthquakes, allDays, selectedTime]);

  console.log("data", data?.features);

  return (
    <>
      <Map
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          borderRadius: "0.5rem",
        }}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_API_KEY}
      >
        {data && (
          <Source type="geojson" data={data as any}>
            <Layer {...heatmapLayer} />
          </Source>
        )}
      </Map>
      <ControlPanel
        startTime={timeRange[0]}
        endTime={timeRange[1]}
        selectedTime={selectedTime}
        allDays={allDays}
        onChangeTime={selectTime}
        onChangeAllDays={useAllDays}
      />
    </>
  );
};

export default HeatMap;
