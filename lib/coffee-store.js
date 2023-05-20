const getUrlForCoffeeStores = (latLong, radius, type) => {
    return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latLong}&radius=${radius}&type=${type}&key=${process.env.GOOGLE_PLACES_API_KEY}`
}

export const fetchCoffeeStores = async () => {
    const response = await fetch(getUrlForCoffeeStores("-33.8670522%2C151.1957362", "1500", "cafe"))
    const data = await response.json()
    return data.results
}