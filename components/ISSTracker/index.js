import { useState } from "react";
import useSWR from "swr";
import Controls from "../Controls/index";
import Map from "../Map/index";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";

function fetcher(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      const error = new Error("An error occurred while fetching the data.");
      error.status = response.status;
      throw error;
    }
    return response.json();
  });
}

export default function ISSTracker() {
  const { data, error, mutate } = useSWR(URL, fetcher, {
    refreshInterval: 5000,
  });

  if (error) {
    console.error(error);
  }

  return (
    <main>
      {data ? (
        <>
          <Map longitude={data.longitude} latitude={data.latitude} />
          <Controls
            longitude={data.longitude}
            latitude={data.latitude}
            onRefresh={() => mutate()}
          />
        </>
      ) : (
        <p>No data yet... probably you will get them ...</p>
      )}
    </main>
  );
}
