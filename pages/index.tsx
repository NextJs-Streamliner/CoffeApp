import styles from '../styles/Home.module.css'
import Banner from '../components/banner'
import Card from '../components/card'
import Head from 'next/head'
import Image from 'next/image'

import coffeeStoresData from '../data/coffee-stores.json'

export async function getStaticProps(_: any) {
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=bakery&key=${process.env.GOOGLE_PLACES_API_KEY}`)
  const data = await response.json()
  console.log(data)
 
  return {
    props: {
      "coffeeStores": data.results,
    }, // will be passed to the page component as props
  }
}

export default function Home(props: any) {

  console.log("props", props)

  const handleOnBannerBtnClick = () => {
    console.log('hi banner btn')
  }

  return (
    <div>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={styles.main}>
        <Banner buttonText="View stores nearby" handleOnClick={handleOnBannerBtnClick}/>
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} alt="coffee"/>
        </div>
        {
          props.coffeeStores.length > 0 && (
            <>
              <h2 className={styles.heading2}>Toronto stores</h2>
              <div className={styles.cardLayout}>
                {props.coffeeStores.map((store: any) => {
                  return (
                    <Card 
                      key={store.id}
                      className={styles.card}
                      name={store.name} 
                      imgUrl={store.icon}
                      href={`/coffee-store/${store.id}`}
                    />
                  )
                })}
              </div>
            </>
          )
        }
      </main>
    </div>
  )
}
