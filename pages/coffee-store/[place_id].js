import Link from "next/link"
import { useRouter } from "next/router"
import Head from 'next/head'
import styles from '../../styles/coffee-store.module.css'
import Image from "next/image"
import cls from 'classnames'

import { fetchCoffeeStores, getPlacePhotoUrl } from '../../lib/coffee-store'

export async function getStaticProps(staticProps) {
    const coffeeStores = await fetchCoffeeStores()
    const apiKey = process.env.GOOGLE_PLACES_API_KEY
    const params = staticProps.params
    return {
        props: {
            "coffeeStore" : coffeeStores.find(coffeeStore => {
                return coffeeStore.place_id.toString() === params.place_id
            }),
            apiKey
        }
    }
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores()
    const paths = coffeeStores.map(coffeeStore => {
        return {
            params: {
                place_id: coffeeStore.place_id.toString()
            }
        }
    })
    return {
        paths,
        fallback: true
    }
}

const CoffeeStore = (props) => {
    const router = useRouter()
    
    if (router.isFallback) {
        return <div>Loading</div>
    }
    
    const { vicinity, name, opening_hours , rating, photos } = props.coffeeStore
    const isOpen = opening_hours.open_now

    const handleUpvoteButton = () => {
        console.log("Handle upvote")
    }

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">Back to Home</Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image 
                        src={getPlacePhotoUrl(photos[0].photo_reference, props.apiKey)} 
                        width={600} 
                        height={360} 
                        className={styles.storeImage} 
                        alt={name}>    
                    </Image>
                </div>
                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/places.svg" width="24" height="24" alt={vicinity}></Image>
                        <p className={styles.text}>{vicinity}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/nearMe.svg" width="24" height="24" alt={isOpen.toString()}></Image>
                        <p className={styles.text}>{isOpen ? "Open" : "Closed"}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/star.svg" width="24" height="24" alt="star"></Image>
                        <p className={styles.text}>{rating}</p>
                    </div>
                    <button 
                        className={styles.upvoteButton}
                        onClick={handleUpvoteButton}>
                        Up vote!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CoffeeStore