const getUrlForCoffeeStores = (latLong, radius, type) => {
    return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latLong}&radius=${radius}&type=${type}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`
}

export const getPlacePhotoUrl = (photo_reference, apiKey, maxwidth = 400) => {
    const baseUrl = "https://maps.googleapis.com/maps/api/place/photo";
    const url = `${baseUrl}?maxwidth=${maxwidth}&photoreference=${photo_reference}&key=${apiKey}`;
    console.log('url = ', url)
    return url;
}

export const fetchCoffeeStores = async (latLong = "-33.8670522%2C151.1957362") => {
    const response = await fetch(getUrlForCoffeeStores(latLong, "1500", "cafe"))
    const data = await response.json()
    return data.results
}
