
export const findMarketSegmentData = (marketSegmentValues, selectedGeographiesShapesValue, selectedAgeSegmentValue, selectedIncomeSegmentValue, selectedDataTypeValue, selectedDataSeriesValue) => {
    console.log("marketSegmentValues")
    console.log(marketSegmentValues)
    console.log("parameters")
    console.log(selectedGeographiesShapesValue, selectedAgeSegmentValue, selectedIncomeSegmentValue, selectedDataTypeValue, selectedDataSeriesValue)

    let potential_results = marketSegmentValues.filter(

        function (entry) {
            // if (selectedGeographiesShapesValue == "GEOID10" && selectedDataTypeValue == '3:Household Count Change') {
            //     selectedGeographiesShapesValue = "AGEB_2021_07_06"
            // }
            return entry.GeographiesShapes === selectedGeographiesShapesValue
                && entry.Display_Age_Segment === selectedAgeSegmentValue
                && entry.Display_Income_Segment === selectedIncomeSegmentValue
                && entry.Display_Data_Type === selectedDataTypeValue
                && entry.Display_Data_Series === selectedDataSeriesValue
        }
    )
    console.log("results")
    console.log(potential_results)
    if (potential_results.length) {
        // console.log('here')
        return potential_results[0]
    }
}

export const findMarketSegmentDataV4 = (marketSegmentValues, selectedGeographiesShapesValue, selectedAgeSegmentValue, selectedIncomeSegmentValue, selectedDataTypeValue, selectedDataSeriesValue) => {
    console.log("marketSegmentValuesV4")
    console.log(marketSegmentValues)
    console.log("parameters")
    console.log(selectedGeographiesShapesValue, selectedAgeSegmentValue, selectedIncomeSegmentValue, selectedDataTypeValue, selectedDataSeriesValue)

    let potential_results = marketSegmentValues.filter(

        function (entry) {
            // if (selectedGeographiesShapesValue == "GEOID10" && selectedDataTypeValue == '3:Household Count Change') {
            //     selectedGeographiesShapesValue = "AGEB_2021_07_06"
            // }
            let dataSeries = selectedDataSeriesValue ? selectedDataSeriesValue.code : null
            return entry.GeographiesShapes === selectedGeographiesShapesValue
                && entry.Display_Age_Segment === handleSegmentFormatChange(selectedAgeSegmentValue)
                && entry.Display_Income_Segment === handleSegmentFormatChange(selectedIncomeSegmentValue)
                && entry.Display_Data_Type === selectedDataTypeValue
                && entry.Display_Data_Series === dataSeries
        }
    )
    console.log("results")
    console.log(potential_results)
    if (potential_results.length) {
        // console.log('here')
        return potential_results[0]
    }
}

export const optionsListToObjectArray = (options = []) => {
    // console.log("options")
    // console.log(options)
    let optionsArray = []
    options.forEach(option => {
        if (option.split(":").length > 1) {

            let obj = { text: option.split(":")[1], value: option }
            optionsArray.push(obj)
        } else {
            let obj = { text: option, value: option }
            optionsArray.push(obj)
        }
    })
    return optionsArray
}


export const optionsListToObjectArraySelect = (options = []) => {
    // console.log("options")
    // console.log(options)
    let optionsArray = []
    options.forEach(option => {
        if (option.split(":").length > 1) {

            let obj = { label: option.split(":")[1], code: option }
            optionsArray.push(obj)
        } else {
            let obj = { label: option, code: option }
            optionsArray.push(obj)
        }
    })
    return optionsArray
}

export const optionsListToObjectArrayWithMapping = (options = [], mapping) => {
    let optionsArray = []
    options.forEach(option => {
        let obj = { text: mapping[option], value: option }
        optionsArray.push(obj)
    })
    return optionsArray
}

export const optionsListToObjectArrayWithMappingCodeLabel = (options = [], mapping) => {
    console.log('optionsListToObjectArrayWithMappingCodeLabel')
    console.log(options)
    let optionsArray = []
    options.forEach(option => {
        let obj = { label: mapping[option], code: option }
        optionsArray.push(obj)
    })
    console.log(optionsArray)
    return optionsArray
}

export const optionsListToObjectArrayWithMappingCodeLabelForDataSeries = (options = [], mapping) => {
    console.log('optionsListToObjectArrayWithMappingCodeLabel')
    console.log(options)
    let optionsArray = []
    options.forEach(option => {
        let obj = { label: renameDataSeries(option), code: option }
        optionsArray.push(obj)
    })
    console.log(optionsArray)
    return optionsArray
}

export const handleSegmentFormatChange = (segment) => {
    let segmentSplit = segment.split(":")
    return segmentSplit[segmentSplit.length - 1]
}

export const renameDataSeries = (dataSeries) => {
    return dataSeries.replace("Y", "").replace("to", "-")
}