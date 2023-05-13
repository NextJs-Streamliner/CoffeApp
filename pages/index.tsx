import styles from '../styles/Home.module.css'
import Banner from '../components/banner'
import Card from '../components/card'
import Head from 'next/head'
import Image from 'next/image'

import coffeeStores from '../data/coffee-stores.json'

export default function Home() {

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
        <div className={styles.cardLayout}>
          {coffeeStores.map((coffeeStore) => {
            return (<Card 
              className={styles.card}
              name={coffeeStore.name} 
              imgUrl={coffeeStore.imgUrl}
              href={`/coffee-store/${coffeeStore.id}`}
            />)
          })}
        </div>
      </main>
    </div>
  )
}
