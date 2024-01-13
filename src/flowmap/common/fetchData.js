import { csv, json } from 'd3-fetch';
import { getClusterLevelsH3 } from './h3-clustering';

// const base = 'https://gist.githubusercontent.com/ilyabo/';
// const path =
//   // Migrations in Switzerland
//   // `${base}/a7b9701424257146b571149d92a14926/raw/2e9e1e9bcf64cf0090781b451037229ccb78e1b1`;
//   // BIXI rides
//   `${base}/68d3dba61d86164b940ffe60e9d36931/raw/a72938b5d51b6df9fa7bba9aa1fb7df00cd0f06a`;
const base = 'http://localhost:8080'
const path = ''

let cachedData;
// trigger buiild


export default async function fetchData(clusterMethod = 'HCA') {
  if (!cachedData) {
    cachedData = await Promise.all([
      csv(`${path}/intermarketdata-20230111-locations.csv`, (row, i) => ({
        // csv(`${path}/locations.csv`, (row, i) => ({
        id: row.id,
        name: row.name,
        lat: Number(row.lat),
        lon: Number(row.lon),
      })),
      csv(`${path}/intermarketdata-20230111-flows.csv`, (row) => ({
        // csv(`${path}/flows.csv`, (row) => ({
        origin: row.origin,
        dest: row.dest,
        count: Number(row.count),
      })),
    ]).then(([locations, flows]) => ({ locations, flows }));
  }

  // if (!cachedData) {
  //   cachedData = await Promise.all([
  //     json(`${path}/intramarketdata-20221026-locations.json`),
  //     json(`${path}/intramarketdata-20221026-flows.json`)
  //   ]).then(([locations, flows]) => ({ locations, flows }));
  // }
  // console.log('cachedData', cachedData)
  // console.log('locations', JSON.stringify(cachedData.locations))
  // console.log('flows', JSON.stringify(cachedData.flows))
  // return {
  //   ...cachedData,
  //   ...(clusterMethod === 'H3'
  //     ? { clusterLevels: getClusterLevelsH3(cachedData.locations) }
  //     : null),
  // };

  const locations = [
    { id: "Alabama", name: "Alabama", lat: 32.7794, lon: -86.8287 },
    { id: "Alaska", name: "Alaska", lat: 62.46751, lon: -145.456457 },
    { id: "Arizona", name: "Arizona", lat: 34.2744, lon: -111.6602 },
    { id: "Arkansas", name: "Arkansas", lat: 34.8938, lon: -92.4426 },
    {
      id: "California",
      name: "California",
      lat: 37.1841,
      lon: -119.4696
    },
    { id: "Colorado", name: "Colorado", lat: 38.9972, lon: -105.5478 },
    {
      id: "Connecticut",
      name: "Connecticut",
      lat: 41.6219,
      lon: -72.7273
    },
    { id: "Delaware", name: "Delaware", lat: 38.9896, lon: -75.505 },
    {
      id: "DistrictOfColumbia",
      name: "DistrictOfColumbia",
      lat: 38.9101,
      lon: -77.0147
    },
    { id: "Florida", name: "Florida", lat: 28.6305, lon: -82.4497 },
    { id: "Georgia", name: "Georgia", lat: 32.6415, lon: -83.4426 },
    { id: "Hawaii", name: "Hawaii", lat: 20.813579, lon: -156.485423 },
    { id: "Idaho", name: "Idaho", lat: 44.3509, lon: -114.613 },
    { id: "Illinois", name: "Illinois", lat: 40.0417, lon: -89.1965 },
    { id: "Indiana", name: "Indiana", lat: 39.8942, lon: -86.2816 },
    { id: "Iowa", name: "Iowa", lat: 42.0751, lon: -93.496 },
    { id: "Kansas", name: "Kansas", lat: 38.4937, lon: -98.3804 },
    { id: "Kentucky", name: "Kentucky", lat: 37.5347, lon: -85.3021 },
    { id: "Louisiana", name: "Louisiana", lat: 31.0689, lon: -91.9968 },
    { id: "Maine", name: "Maine", lat: 45.3695, lon: -69.2428 },
    { id: "Maryland", name: "Maryland", lat: 39.055, lon: -76.7909 },
    {
      id: "Massachusetts",
      name: "Massachusetts",
      lat: 42.2596,
      lon: -71.8083
    },
    { id: "Michigan", name: "Michigan", lat: 44.3467, lon: -85.4102 },
    { id: "Minnesota", name: "Minnesota", lat: 46.2807, lon: -94.3053 },
    {
      id: "Mississippi",
      name: "Mississippi",
      lat: 32.7364,
      lon: -89.6678
    },
    { id: "Missouri", name: "Missouri", lat: 38.3566, lon: -92.458 },
    { id: "Montana", name: "Montana", lat: 47.0527, lon: -109.6333 },
    { id: "Nebraska", name: "Nebraska", lat: 41.5378, lon: -99.7951 },
    { id: "Nevada", name: "Nevada", lat: 39.491038, lon: -117.067442 },
    {
      id: "NewHampshire",
      name: "NewHampshire",
      lat: 43.6805,
      lon: -71.5811
    },
    { id: "NewJersey", name: "NewJersey", lat: 40.1907, lon: -74.6728 },
    { id: "NewMexico", name: "NewMexico", lat: 34.4071, lon: -106.1126 },
    { id: "NewYork", name: "NewYork", lat: 42.9538, lon: -75.5268 },
    {
      id: "NorthCarolina",
      name: "NorthCarolina",
      lat: 35.5557,
      lon: -79.3877
    },
    {
      id: "NorthDakota",
      name: "NorthDakota",
      lat: 47.4501,
      lon: -100.4659
    },
    { id: "Ohio", name: "Ohio", lat: 40.2862, lon: -82.7937 },
    { id: "Oklahoma", name: "Oklahoma", lat: 35.5889, lon: -97.4943 },
    { id: "Oregon", name: "Oregon", lat: 43.9336, lon: -120.5583 },
    {
      id: "Pennsylvania",
      name: "Pennsylvania",
      lat: 40.8781,
      lon: -77.7996
    },
    {
      id: "RhodeIsland",
      name: "RhodeIsland",
      lat: 41.6762,
      lon: -71.5562
    },
    {
      id: "SouthCarolina",
      name: "SouthCarolina",
      lat: 33.9169,
      lon: -80.8964
    },
    {
      id: "SouthDakota",
      name: "SouthDakota",
      lat: 44.4443,
      lon: -100.2263
    },
    { id: "Tennessee", name: "Tennessee", lat: 35.858, lon: -86.3505 },
    { id: "Texas", name: "Texas", lat: 31.4757, lon: -99.3312 },
    { id: "Utah", name: "Utah", lat: 39.3055, lon: -111.6703 },
    { id: "Vermont", name: "Vermont", lat: 44.0687, lon: -72.6658 },
    { id: "Virginia", name: "Virginia", lat: 37.5215, lon: -78.8537 },
    {
      id: "Washington",
      name: "Washington",
      lat: 47.3826,
      lon: -120.4472
    },
    {
      id: "WestVirginia",
      name: "WestVirginia",
      lat: 38.6409,
      lon: -80.6227
    },
    { id: "Wisconsin", name: "Wisconsin", lat: 44.6243, lon: -89.9941 },
    { id: "Wyoming", name: "Wyoming", lat: 42.9957, lon: -107.5512 }
  ];

  const flows = [
    { origin: "Alaska", dest: "Texas", count: 1950 },
    { origin: "Alabama", dest: "Texas", count: 9683 },
    { origin: "Arkansas", dest: "Texas", count: 16572 },
    { origin: "Arizona", dest: "Texas", count: 17752 },
    { origin: "California", dest: "Texas", count: 32136 },
    { origin: "Colorado", dest: "Texas", count: 31664 },
    { origin: "Connecticut", dest: "Texas", count: 2413 },
    { origin: "DistrictOfColumbia", dest: "Texas", count: 1401 },
    { origin: "Delaware", dest: "Texas", count: 948 },
    { origin: "Florida", dest: "Texas", count: 43255 },
    { origin: "Georgia", dest: "Texas", count: 18703 },
    { origin: "Hawaii", dest: "Texas", count: 2263 },
    { origin: "Iowa", dest: "Texas", count: 3929 },
    { origin: "Idaho", dest: "Texas", count: 3625 },
    { origin: "Illinois", dest: "Texas", count: 14236 },
    { origin: "Indiana", dest: "Texas", count: 7595 },
    { origin: "Kansas", dest: "Texas", count: 7958 },
    { origin: "Kentucky", dest: "Texas", count: 8232 },
    { origin: "Louisiana", dest: "Texas", count: 18313 },
    { origin: "Massachusetts", dest: "Texas", count: 4840 },
    { origin: "Maryland", dest: "Texas", count: 6791 },
    { origin: "Maine", dest: "Texas", count: 1747 },
    { origin: "Michigan", dest: "Texas", count: 10051 },
    { origin: "Minnesota", dest: "Texas", count: 5384 },
    { origin: "Missouri", dest: "Texas", count: 13142 },
    { origin: "Mississippi", dest: "Texas", count: 5970 },
    { origin: "Montana", dest: "Texas", count: 2325 },
    { origin: "NorthCarolina", dest: "Texas", count: 17380 },
    { origin: "NorthDakota", dest: "Texas", count: 1002 },
    { origin: "Nebraska", dest: "Texas", count: 3078 },
    { origin: "NewHampshire", dest: "Texas", count: 1426 },
    { origin: "NewJersey", dest: "Texas", count: 4447 },
    { origin: "NewMexico", dest: "Texas", count: 12314 },
    { origin: "Nevada", dest: "Texas", count: 6302 },
    { origin: "NewYork", dest: "Texas", count: 10239 },
    { origin: "Ohio", dest: "Texas", count: 10711 },
    { origin: "Oklahoma", dest: "Texas", count: 26132 },
    { origin: "Oregon", dest: "Texas", count: 7204 },
    { origin: "Pennsylvania", dest: "Texas", count: 9132 },
    { origin: "RhodeIsland", dest: "Texas", count: 739 },
    { origin: "SouthCarolina", dest: "Texas", count: 8755 },
    { origin: "SouthDakota", dest: "Texas", count: 1615 },
    { origin: "Tennessee", dest: "Texas", count: 16401 },
    { origin: "Texas", dest: "Alaska", count: 2568 },
    { origin: "Texas", dest: "Alabama", count: 8398 },
    { origin: "Texas", dest: "Arkansas", count: 13566 },
    { origin: "Texas", dest: "Arizona", count: 20981 },
    { origin: "Texas", dest: "California", count: 66051 },
    { origin: "Texas", dest: "Colorado", count: 27290 },
    { origin: "Texas", dest: "Connecticut", count: 4550 },
    { origin: "Texas", dest: "DistrictOfColumbia", count: 1192 },
    { origin: "Texas", dest: "Delaware", count: 1329 },
    { origin: "Texas", dest: "Florida", count: 44594 },
    { origin: "Texas", dest: "Georgia", count: 20696 },
    { origin: "Texas", dest: "Hawaii", count: 3352 },
    { origin: "Texas", dest: "Iowa", count: 6006 },
    { origin: "Texas", dest: "Idaho", count: 2329 },
    { origin: "Texas", dest: "Illinois", count: 34304 },
    { origin: "Texas", dest: "Indiana", count: 11861 },
    { origin: "Texas", dest: "Kansas", count: 10476 },
    { origin: "Texas", dest: "Kentucky", count: 6049 },
    { origin: "Texas", dest: "Louisiana", count: 24983 },
    { origin: "Texas", dest: "Massachusetts", count: 7108 },
    { origin: "Texas", dest: "Maryland", count: 10907 },
    { origin: "Texas", dest: "Maine", count: 1184 },
    { origin: "Texas", dest: "Michigan", count: 14593 },
    { origin: "Texas", dest: "Minnesota", count: 6548 },
    { origin: "Texas", dest: "Missouri", count: 14330 },
    { origin: "Texas", dest: "Mississippi", count: 7406 },
    { origin: "Texas", dest: "Montana", count: 1688 },
    { origin: "Texas", dest: "NorthCarolina", count: 15386 },
    { origin: "Texas", dest: "NorthDakota", count: 1380 },
    { origin: "Texas", dest: "Nebraska", count: 4000 },
    { origin: "Texas", dest: "NewHampshire", count: 1386 },
    { origin: "Texas", dest: "NewJersey", count: 12390 },
    { origin: "Texas", dest: "NewMexico", count: 13330 },
    { origin: "Texas", dest: "Nevada", count: 9144 },
    { origin: "Texas", dest: "NewYork", count: 23180 },
    { origin: "Texas", dest: "Ohio", count: 15737 },
    { origin: "Texas", dest: "Oklahoma", count: 20896 },
    { origin: "Texas", dest: "Oregon", count: 10963 },
    { origin: "Texas", dest: "Pennsylvania", count: 13437 },
    { origin: "Texas", dest: "RhodeIsland", count: 964 },
    { origin: "Texas", dest: "SouthCarolina", count: 8103 },
    { origin: "Texas", dest: "SouthDakota", count: 1575 },
    { origin: "Texas", dest: "Tennessee", count: 12560 },
    { origin: "Texas", dest: "Utah", count: 4888 },
    { origin: "Texas", dest: "Virginia", count: 19162 },
    { origin: "Texas", dest: "Vermont", count: 585 },
    { origin: "Texas", dest: "Washington", count: 19643 },
    { origin: "Texas", dest: "Wisconsin", count: 9556 },
    { origin: "Texas", dest: "WestVirginia", count: 1687 },
    { origin: "Texas", dest: "Wyoming", count: 1250 },
    { origin: "Texas", dest: "all_markets", count: 595541 },
    { origin: "Utah", dest: "Texas", count: 6783 },
    { origin: "Virginia", dest: "Texas", count: 14267 },
    { origin: "Vermont", dest: "Texas", count: 745 },
    { origin: "Washington", dest: "Texas", count: 14965 },
    { origin: "Wisconsin", dest: "Texas", count: 5953 },
    { origin: "WestVirginia", dest: "Texas", count: 1310 },
    { origin: "Wyoming", dest: "Texas", count: 1542 }
  ]


  return {
    locations: locations, flows: flows
  }

}



