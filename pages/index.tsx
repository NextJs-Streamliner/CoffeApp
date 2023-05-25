import styles from '../styles/Home.module.css'
import Banner from '../components/banner'
import Card from '../components/card'
import Head from 'next/head'
import Image from 'next/image'

import { fetchCoffeeStores, getPlacePhotoUrl } from '../lib/coffee-store'
import useTrackLocation from '../hooks/use-track-location'
import { useEffect } from 'react'

export async function getStaticProps(_: any) {
  const coffeeStores = await fetchCoffeeStores()
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
  console.log('apiKey = ', apiKey)
  return {
    props: {
      coffeeStores,
      apiKey
    }, // will be passed to the page component as props
  }
}

export default function Home(props: any) {

  console.log("props", props)

  const { handleTrackLocation, latLong, locationErrorMessage, isFindingLocation } = useTrackLocation()

  console.log({latLong, locationErrorMessage})

  const handleOnBannerBtnClick = () => {
    handleTrackLocation()
  }

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const coffeeStores = await fetchCoffeeStores(latLong);
          console.log('useEffect coffeeStores = ', coffeeStores)
        } catch (error) {
          console.log({error})
        }
      }
    }
    setCoffeeStoresByLocation()
  }, [latLong])

  return (
    <div>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={styles.main}>
        <Banner buttonText={isFindingLocation ? "Locating..." : "View stores nearby"} handleOnClick={handleOnBannerBtnClick}/>
        {locationErrorMessage && <p>Something went wrong: {locationErrorMessage}</p>}
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} alt="coffee"/>
        </div>
        {
          props.coffeeStores.length > 0 && (
            <>
              <div className={styles.sectionWrapper}>
                <h2 className={styles.heading2}>Toronto stores</h2>
                <div className={styles.cardLayout}>
                  {props.coffeeStores.map((store: any) => {
                    return (
                      <Card 
                        key={store.place_id}
                        className={styles.card}
                        name={store.name} 
                        imgUrl={getPlacePhotoUrl(store.photos[0].photo_reference, props.apiKey)}
                        vicinity={store.vicinity}
                        isOpen={store.name}
                        rating={store.rating}
                        apiKey={props.apiKey}
                        href={`/coffee-store/${store.place_id}`}
                      />
                    )
                  })}
                </div>
              </div>
            </>
          )
        }
      </main>
    </div>
  )
}
