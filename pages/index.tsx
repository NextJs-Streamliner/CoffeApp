import styles from '../styles/Home.module.css'
import Banner from '../components/banner'
import Card from '../components/card'
import Head from 'next/head'
import Image from 'next/image'

import coffeeStores from '../data/coffee-stores.json'

export async function getStaticProps(_: any) {
  return {
    props: {
      coffeeStores,
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
        <div className={styles.cardLayout}>
          {props.coffeeStores.map((store: any) => {
            return (<Card 
              key={store.id}
              className={styles.card}
              name={store.name} 
              imgUrl={store.imgUrl}
              href={`/coffee-store/${store.id}`}
            />)
          })}
        </div>
      </main>
    </div>
  )
}
