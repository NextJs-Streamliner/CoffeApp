import styles from '../styles/Home.module.css'
import Banner from '../components/banner';

export default function Home() {

  const handleOnBannerBtnClick = () => {
    console.log('hi banner btn')
  }

  return (
    <div>
      <div>
        <title>Create Next App</title>
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>Coffee Connoisseur</h1>
        <Banner buttonText="View stores nearby" handleOnClick={handleOnBannerBtnClick}/>
      </main>
    </div>
  )
}
