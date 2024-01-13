
// import { ContextExclusionPlugin } from "webpack";
// import marketSettingsData from "../../public/geospatial_settings-2.json";

import { index } from "d3-array";
import marketSettingsData from "../../public/geospatial_settings.json";
export const segmentKeys = [
    "in_all_all",
    "in_all_$0-50k",
    "in_all_$50-100k",
    "in_all_$100k+",
    "in_18-44_all",
    "in_18-44_$0-50k",
    "in_18-44_$50-100k",
    "in_18-44_$100k+",
    "in_45-64_all",
    "in_45-64_$0-50k",
    "in_45-64_$50-100k",
    "in_45-64_$100k+",
    "in_65+_all",
    "in_65+_$0-50k",
    "in_65+_$50-100k",
    "in_65+_$100k+",
    "out_all_all",
    "out_all_$0-50k",
    "out_all_$50-100k",
    "out_all_$100k+",
    "out_18-44_all",
    "out_18-44_$0-50k",
    "out_18-44_$50-100k",
    "out_18-44_$100k+",
    "out_45-64_all",
    "out_45-64_$0-50k",
    "out_45-64_$50-100k",
    "out_45-64_$100k+",
    "out_65+_all",
    "out_65+_$0-50k",
    "out_65+_$50-100k",
    "out_65+_$100k+",
    "net_all_all",
    "net_all_$0-50k",
    "net_all_$50-100k",
    "net_all_$100k+",
    "net_18-44_all",
    "net_18-44_$0-50k",
    "net_18-44_$50-100k",
    "net_18-44_$100k+",
    "net_45-64_all",
    "net_45-64_$0-50k",
    "net_45-64_$50-100k",
    "net_45-64_$100k+",
    "net_65+_all",
    "net_65+_$0-50k",
    "net_65+_$50-100k",
    "net_65+_$100k+"
]

export const flowAgeSegmentOptions = {
    "all": "All",
    "18-44": "18-44",
    "45-64": "45-64",
    "65+": "65+"
}

export const flowExcludeWithinStateOptions = {
    "yes": "Yes",
    "no": "No",
}
export const flowIncomeSegmentOptions = {
    "all": "All",
    "$0-50k": "$0-50k",
    "$50-100k": "$50-100k",
    "$100k+": "$100k+"
}
export const flowDirectionOptions = {
    "in": "In",
    "out": "Out",
    "net": "Net"
}

// For buttons
// export const flowMarketTypeOptions = {
//     "metro_areas": "Metro areas",
//     "states": "States"
// }
//  For radio
export const flowMarketTypeOptions = [
    { text: "Metro Area", value: "metro_areas" },
    { text: "State", value: "states" },
]

// Metros
// 'all_other_markets', 'all_markets', 'top_same_state_markets', 'other_market_same_state_markets', 'all_same_state_markets', 'all_other_markets_excl_same_state', 'all_markets_excl_same_state', 'top_120', 'top_50', 'top_20', 'top_25_list'

export const flowMetroAreaListOptions = {
    // "top_120": "120 Largest",
    // "all": "All",
    "top_50": "Top 50",
    "top_25": "Top 25",
    "top_10": "Top 10",
}

export const METRO_AREAS_ADDITIONAL_KEYS = 7
export const STATES_ADDITIONAL_KEYS = 6


// States
// 'all_markets', 'states_all', 'largest_25', 'largest_10', 'top_25_list'

export const flowStatesListOptions = {
    // "states_all": "All",
    "all": "All",
    // "top_50": "Top 50",
    "top_25": "Top 25",
    "top_10": "Top 10",
}
export const flowMovementDirectionOptions = {
    "in": "Incoming",
    "out": "Outgoing",
    "net": "Net"
}

export const selectedLimitOptions = {
    "all": 100,
    "top_50": 50,
    "top_25": 25,
    "top_10": 10
}

export const summaryMarkets = ['all_other_markets', 'all_markets', 'top_same_state_markets', 'other_market_same_state_markets', 'all_same_state_markets', 'all_same_state_markets', 'all_markets_movement_est_range']

export const segmentKey = (flowDirection, ageSegment, incomeSegment) => {
    return `${flowDirection.toLowerCase()}_${ageSegment.toLowerCase()}_${incomeSegment.toLowerCase()}`
}

export const getSegmentIndex = (flowDirection, ageSegment, incomeSegment) => {
    const key = segmentKey(flowDirection, ageSegment, incomeSegment)
    return segmentKeys.indexOf(key)
}

export const createFlow = (origin, destination, count) => {
    let original_count = count
    count = count >= 0 ? count : -count
    return {
        "origin": origin,
        "dest": destination,
        "count": count
    }
}

export const createMarketListEntry = (direction, location, count, selected, rank) => {
    let formattedCount
    if (direction == 'net') {
        formattedCount = countToRange(count)
    } else {
        formattedCount = (count * 100).toLocaleString(undefined, { maximumFractionDigits: 1 }) + "%"
    }
    return {
        "rank": rank,
        "direction": direction,
        "location": location,
        "count": formattedCount,
        "absolute_count": Math.abs(count),
        "selected": selected
    }
}

export const addRankToEntry = (entry, rank) => {
    entry.rank = rank
}


// "CenterLat": "43.9336",
// "CenterLong": "-120.5583",
// "DefaultZoomLevel": "5",
// "GeoTypeGroup": "2 - States",
// "MarketName": "Oregon",
// "Market_Display_Name": "Oregon",
// "StateFips": ""
export const createLocation = (marketSettingsData, id, marketType) => {
    let location = marketSettingsData[id.replaceAll('.', '')]

    console.log('create location')
    console.log(marketSettingsData)
    console.log(id)
    console.log(id.replaceAll('.', ''))
    console.log(location)
    console.log(marketType)
    return {
        "id": id,
        "name": location["Market_Display_Name"],
        "lat": location["CenterLat"],
        "lon": location["CenterLong"],
        "type": marketType
    }
}

export const movementDirection = (id, name, lat, lon, type) => {
    return {
        "id": id,
        "name": name,
        "lat": lat,
        "lon": lon,
        "type": type
    }
}

export const getLocation = (id, locationData, locationType) => {
    if (summaryMarkets.includes(id)) {
        return {}
    }
    const location = locationData.find(location => location.id === id)
    // trasnform to location object
    // TODO
    return createLocation(location.id, location.name, location.lat, location.lon, locationType)
}

export const tooltipHtml = (object) => {

    if (object.type === "flow") {
        // let valueString =
        //     (object.flow.count * 100).toLocaleString(undefined, {
        //         maximumFractionDigits: 2,
        //     }) + "%";
        let valueString =
            (object.flow.count).toLocaleString(undefined, {
                maximumFractionDigits: 2,
            });
        return `<div class="flow-tooltip">${marketSettingsData[object.flow.origin].Market_Display_Name} <i class="fa-solid fa-arrow-right"></i> ${marketSettingsData[object.flow.dest].Market_Display_Name}: ${valueString}</div>`
    }
    if (object.type === "location") {
        console.log('location tooltip')
        console.log(object.location.name)
        console.log(`<div class="location-tooltip">${object.location.name}</div>`)
        return `<div class="location-tooltip">${object.location.name}</div>`
    }
    return null

}

// Get the settings
// get the data
// loop through building the locations and flows
// return the data object: locations, flows

export const countToRange = (count) => {
    let censusEstimate = parseFloat(count) * 0.8
    let censusLower = censusEstimate * .05
    let censusUpper = censusEstimate * .3
    let lowerEnd = count - censusLower
    let upperEnd = count + censusUpper
    lowerEnd = Math.abs(Math.round(lowerEnd / 100) * 100)
    upperEnd = Math.abs(Math.round(upperEnd / 100) * 100)
    if (Math.abs(count) < 300) {
        return count < 0 ? `(0 - 300)` : `0 - 300`
    }
    else {
        return count < 0 ? `(${lowerEnd.toLocaleString()} - ${upperEnd.toLocaleString()})` : `${lowerEnd.toLocaleString()} - ${upperEnd.toLocaleString()}`
    }

}


export const includeGeoData = (geoData, marketId, segmentSelector, keyIndex, exludeWithinState) => {
    // console.log('segmentSelector')
    // console.log(segmentSelector)
    // console.log('geoData')
    // console.log(geoData)
    // console.log('marketId')
    // console.log(marketId)
    // console.log('keyIndex')
    // console.log(keyIndex)
    // console.log('exludeWithinState')
    // console.log(exludeWithinState)
    // console.log('exclude flag')

    // console.log('geoData.hasOwnProperty(marketId)')
    // console.log(geoData.hasOwnProperty(marketId))
    window.geoData = geoData
    // if (!geoData.hasOwnProperty(marketId)) {
    //     return false;
    // }
    if (segmentSelector == "all") {
        return true;
    }

    let segmentSelectorindex = ["top_50", "top_25", "top_10"].indexOf(segmentSelector)
    // console.log('segmentSelectorindex')
    // console.log(segmentSelectorindex)
    // console.log(geoData[marketId])
    // console.log(geoData[marketId][32 + segmentSelectorindex])
    // console.log(geoData[marketId][32 + segmentSelectorindex][keyIndex])
    // console.log()
    // if (segmentSelectorindex > -1) {
    //     if (geoData[marketId][32 + segmentSelectorindex][keyIndex] === 1) {
    //         console.log(true)
    //         return true
    //     } else {
    //         console.log(false)
    //         return false;
    //     }

    // } else {
    //     return false;
    // }
    // console.log('segmentSelectorindex')
    // console.log(segmentSelectorindex)
    // console.log(geoData)
    // console.log(geoData[32 + segmentSelectorindex])
    // console.log(geoData[32 + segmentSelectorindex][keyIndex])
    // console.log()
    // if (segmentSelectorindex > -1) {
    //     if (geoData[32 + segmentSelectorindex][keyIndex] === 1) {
    //         // console.log(true)
    //         return true
    //     } else {
    //         // console.log(false)
    //         return false;
    //     }

    // } else {
    //     return false;
    // }
    return true;
    // // console.log(geoData[geoData[marketId].length - 1]);
    // if (geoData[marketId][geoData[marketId].length - 1] && exludeWithinState == "yes") {
    //     return false
    // }
    // if (segmentSelector.includes("list")) {
    //     return geoData[segmentSelector][keyIndex]
    // } else {
    //     return geoData[segmentSelector]
    // }

}


export const getIntermarketData = (data, marketSettingsData, marketType, marketId, marketListOption, movementDirection, segmentSelector, exludeWithinState, ageSegment, incomeSegment, flowDataTableData, selectOnly = false) => {
    console.log('getIntermarketData called')
    console.log('data')
    // console.log('marketSettingsData - intermarket')
    // console.log(marketSettingsData)
    // console.log('marketType')
    // console.log(marketType)
    // console.log(marketId)
    // console.log(marketListOption)
    // console.log('movementDirection')
    // console.log(movementDirection)
    // console.log(segmentSelector)
    // console.log(exludeWithinState)
    // console.log(ageSegment)
    // console.log(incomeSegment)
    // console.log('flowDataTableData')
    // console.table(flowDataTableData)
    // console.log('selectOnly')
    // console.log(selectOnly)
    const geoData = data[marketType]
    let key = getSegmentIndex(movementDirection, ageSegment, incomeSegment)
    let inKey, outKey;
    if (movementDirection == "net") {
        inKey = getSegmentIndex("in", ageSegment, incomeSegment)
        outKey = getSegmentIndex("out", ageSegment, incomeSegment)
        key = inKey
    }
    let locations = [];
    let flows = [];
    let marketList = [];
    let indexedMarketList = [];
    let selectedFlows = [];
    // console.log('geoData')
    // console.log(geoData)
    if (geoData) {
        const marketData = geoData[marketId]
        console.log('marketData')
        console.log(marketData)
        // const marketTotals = marketData[segmentSelector]
        let optionKeys = {}
        if (marketType == "metro_areas_all" || marketType == "metro_areas_excl_same_state") {
            optionKeys = Object.keys(flowMetroAreaListOptions)
        } else {
            optionKeys = Object.keys(flowStatesListOptions)
            exludeWithinState = "no" // Ignore the exclude within state flag for states
        }
        // console.log('found result')
        // console.log(data)
        // console.log(marketSettingsData)
        // console.log('marketType', marketType)
        // console.log('marketId', marketId)
        // console.log('marketListOption', marketListOption)
        // console.log('movementDirection', movementDirection)
        // console.log('segmentSelector', segmentSelector)
        // console.log('exludeWithinState', exludeWithinState)
        // console.log('ageSegment', ageSegment)
        // console.log('incomeSegment', incomeSegment)
        // console.log('key', key)
        // console.log('inKey', inKey)
        // console.log('outKey', outKey)
        // console.log('marketData')
        // console.log(marketData)
        let secondaryMarketIds = Object.keys(marketData)
        // console.log(Object.keys(marketData))
        if (marketType == "metro_areas_all" || marketType == "metro_areas_excl_same_state") {
            let markets = Object.keys(marketData)
            secondaryMarketIds = markets.slice(0, markets.length - METRO_AREAS_ADDITIONAL_KEYS)

        } else {
            let markets = Object.keys(marketData)
            secondaryMarketIds = markets.slice(0, markets.length - STATES_ADDITIONAL_KEYS)
        }
        // console.log(secondaryMarketIds)
        secondaryMarketIds = secondaryMarketIds.filter(item => !optionKeys.includes(item) && !summaryMarkets.includes(item))
        console.log('secondaryMarketIds')
        console.log(secondaryMarketIds)
        console.log(secondaryMarketIds.length)
        let locationIds = new Set
        let count
        console.log('secondaryMarketIds')
        console.log(secondaryMarketIds)
        console.log(secondaryMarketIds.length)
        secondaryMarketIds.forEach(secondaryMarketId => {
            let element;
            if (selectOnly) {
                // console.log('selectOnly')
                // console.log(flowDataTableData)
                if (flowDataTableData) {
                    // console.log('flowDataTableData here')

                    let elements = flowDataTableData.filter(item => item.marketId == secondaryMarketId)
                    // console.table(elements)
                    if (elements.length > 0) {
                        element = elements[0]
                    }
                }
            }
            let secondaryMarketData = marketData[secondaryMarketId]
            // console.log('secondaryMarketId')
            // console.log(secondaryMarketData)
            if (marketData[secondaryMarketId] && !summaryMarkets.includes()) {
                // console.table(element)
                if (element) {
                    if (element.selected) {
                        // console.log('select true')
                        // if (true) {
                        // console.log('movementDirection')
                        // console.log(movementDirection)
                        if (movementDirection == "net") {

                            // console.log('net')
                            // console.log(marketId, secondaryMarketId)
                            //  count = 100 - 50
                            count = secondaryMarketData[inKey] - secondaryMarketData[outKey]
                            marketList.push(createMarketListEntry(movementDirection, secondaryMarketId, count, true, 0))
                            if (count < 0) {
                                // flows.push(createFlow(marketId, secondaryMarketId, secondaryMarketData[outKey]))
                                flows.push(createFlow(marketId, secondaryMarketId, count))
                            }
                            else {
                                // flows.push(createFlow(secondaryMarketId, marketId, secondaryMarketData[inKey]))
                                flows.push(createFlow(secondaryMarketId, marketId, count))

                            }
                        }
                        if (movementDirection == "out") {
                            // console.log('out')
                            // console.log(marketId, secondaryMarketId)
                            count = secondaryMarketData[key]

                            marketList.push(createMarketListEntry(movementDirection, secondaryMarketId, count, true, 0))
                            flows.push(createFlow(marketId, secondaryMarketId, secondaryMarketData[key]))
                        }
                        if (movementDirection == "in") {
                            // console.log('in')
                            // console.log(marketId, secondaryMarketId)
                            count = secondaryMarketData[key]
                            marketList.push(createMarketListEntry(movementDirection, secondaryMarketId, count, true, 0))
                            flows.push(createFlow(secondaryMarketId, marketId, secondaryMarketData[key]))
                        }
                        locationIds.add(marketId)
                        locationIds.add(secondaryMarketId);
                    } else {
                        // console.log('select false')
                        // console.log('movementDirection')
                        // console.log(movementDirection)
                        if (movementDirection == "net") {

                            // console.log('net')
                            // console.log(marketId, secondaryMarketId)
                            count = secondaryMarketData[inKey] - secondaryMarketData[outKey]
                            marketList.push(createMarketListEntry(movementDirection, secondaryMarketId, count, false, 0))
                        }
                        if (movementDirection == "out") {
                            // console.log('out')
                            // console.log(marketId, secondaryMarketId)
                            count = secondaryMarketData[key]
                            marketList.push(createMarketListEntry(movementDirection, secondaryMarketId, count, false, 0))
                        }
                        if (movementDirection == "in") {
                            // console.log('in')
                            // console.log(marketId, secondaryMarketId)
                            count = secondaryMarketData[key]
                            marketList.push(createMarketListEntry(movementDirection, secondaryMarketId, count, false, 0))
                        }

                    }
                }
                else if (includeGeoData(marketData[secondaryMarketId], marketId, segmentSelector, key, exludeWithinState)) {
                    // if (true) {
                    // console.log('movementDirection')
                    // console.log(movementDirection)
                    if (movementDirection == "net") {

                        console.log('net')
                        console.log(marketId, secondaryMarketId)
                        count = secondaryMarketData[inKey] - secondaryMarketData[outKey]
                        marketList.push(createMarketListEntry(movementDirection, secondaryMarketId, count, true, 0))
                        // flows.push(createFlow(marketId, secondaryMarketId, -secondaryMarketData[outKey]))
                        // flows.push(createFlow(secondaryMarketId, marketId, secondaryMarketData[inKey]))
                        if (count < 0) {
                            // flows.push(createFlow(marketId, secondaryMarketId, secondaryMarketData[outKey]))
                            flows.push(createFlow(marketId, secondaryMarketId, count))
                        }
                        else {
                            // flows.push(createFlow(secondaryMarketId, marketId, secondaryMarketData[inKey]))
                            flows.push(createFlow(secondaryMarketId, marketId, count))

                        }
                    }
                    if (movementDirection == "out") {
                        // console.log('out')
                        // console.log(marketId, secondaryMarketId)
                        count = secondaryMarketData[key]

                        marketList.push(createMarketListEntry(movementDirection, secondaryMarketId, count, true, 0))
                        flows.push(createFlow(marketId, secondaryMarketId, secondaryMarketData[key]))
                    }
                    if (movementDirection == "in") {
                        // console.log('in')
                        // console.log(marketId, secondaryMarketId)
                        count = secondaryMarketData[key]
                        marketList.push(createMarketListEntry(movementDirection, secondaryMarketId, count, true, 0))
                        flows.push(createFlow(secondaryMarketId, marketId, secondaryMarketData[key]))
                    }
                    locationIds.add(marketId)
                    locationIds.add(secondaryMarketId);
                } else {
                    // console.log('movementDirection')
                    // console.log(movementDirection)
                    if (movementDirection == "net") {

                        // console.log('net')
                        // console.log(marketId, secondaryMarketId)
                        count = secondaryMarketData[inKey] - secondaryMarketData[outKey]
                        marketList.push(createMarketListEntry(movementDirection, secondaryMarketId, count, false, 0))
                    }
                    if (movementDirection == "out") {
                        // console.log('out')
                        // console.log(marketId, secondaryMarketId)
                        count = secondaryMarketData[key]
                        marketList.push(createMarketListEntry(movementDirection, secondaryMarketId, count, false, 0))
                    }
                    if (movementDirection == "in") {
                        // console.log('in')
                        // console.log(marketId, secondaryMarketId)
                        count = secondaryMarketData[key]
                        marketList.push(createMarketListEntry(movementDirection, secondaryMarketId, count, false, 0))
                    }
                }
                // console.log('marketList iterating');
                // console.table(marketList);
            }
        })
        console.log('locationIds')
        console.log(locationIds)
        locationIds.forEach(locationId => {
            console.log('locationId', locationId)
            if (locationId && locationId !== "all_other_markets" && locationId !== "all_markets" && locationId !== "top_same_state_markets" && locationId !== "other_market_same_state_markets" && locationId !== "top_other_state_markets" && locationId !== "all_same_state_markets") {
                locations.push(createLocation(marketSettingsData, locationId, marketType))
            }
        })
        console.log('final marketlist')
        console.table(marketList)
        marketList = marketList.sort((a, b) => (a.absolute_count < b.absolute_count) ? 1 : -1)
        flows = flows.sort((a, b) => (a.count < b.count) ? 1 : -1)
        let selectedMarketList;
        if (!selectOnly) {
            selectedMarketList = marketList.map((market, index) => { market.selected = index < selectedLimitOptions[marketListOption] ? true : false; market.rank = index + 1; return market });
            selectedFlows = flows.slice(0, selectedLimitOptions[marketListOption])
        }
        else {
            selectedMarketList = marketList
            selectedFlows = flows
        }
        console.log('sorted marketlist')
        console.table(selectedMarketList)
        console.log('flows')
        console.table(selectedFlows)
        indexedMarketList = selectedMarketList.map((x, i) => { x.rank = i + 1; return x })
        // console.log('locationIds')
        // console.log(locationIds)
        // console.log('locations')
        // console.log(locations)
        // console.log('marketList')
        // console.log(indexedMarketList)
        // if (marketId) {
        //     createLocation(marketSettingsData, marketId, marketType)
        // }
        // console.log('flows')
        // console.log(flows)


    }

    // console.log('locations')
    // console.log(locations)
    // console.log('flows')
    // console.log(flows)
    let returnData = {
        "locations": Array.from(locations),
        "flows": selectedFlows,
        "marketList": indexedMarketList
    }
    // console.log('returnData')
    // console.log(returnData)
    return returnData;
}

// filter

// market type
// market

// which states/metros to display

// states
// All
// 25 Largest
// 10 Largest
// Top 10

// metros
// All
// 120 Largest
// 50 Largest
// Top 25

// Exclude movement within same state (metros only)

// Age
// All
// 18-44
// 45-64
// 65+

// Income
// All
// $0-50K
// $50-100K
// $100K+


// locations

