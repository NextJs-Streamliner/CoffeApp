import styles from '../styles/Home.module.css'
import Banner from '../components/banner';
import Head from 'next/head';

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
      </main>
    </div>
  )
}
