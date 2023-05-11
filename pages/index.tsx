import styles from '../styles/Home.module.css'
import Banner from '../components/banner'
import Card from '../components/card'
import Head from 'next/head'
import Image from 'next/image'

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
        <Card 
          name='DarkHouse Coffee' 
          imgUrl="/static/hero-image.png" 
          href="/coffee-store/darkhouse-coffee"
          />
      </main>
    </div>
  )
}
