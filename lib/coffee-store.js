const getUrlForCoffeeStores = (latLong, radius, type) => {
    return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latLong}&radius=${radius}&type=${type}&key=${process.env.GOOGLE_PLACES_API_KEY}`
}

export const getPlacePhotoUrl = (photo_reference, maxwidth = 400) => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY 
    console.log(`api for getPlacePhotoUrl = ${apiKey}`)
    const baseUrl = "https://maps.googleapis.com/maps/api/place/photo";
    const url = `${baseUrl}?maxwidth=${maxwidth}&photoreference=${photo_reference}&key=${apiKey}`;

    return url;
}

export const fetchCoffeeStores = async () => {
    const response = await fetch(getUrlForCoffeeStores("-33.8670522%2C151.1957362", "1500", "cafe"))
    const data = await response.json()
    return data.results
}
