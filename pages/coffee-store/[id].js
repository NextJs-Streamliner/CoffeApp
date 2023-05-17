import Link from "next/link"
import { useRouter } from "next/router"
import coffeeStoreData from "../../data/coffee-stores.json"
import Head from 'next/head'

export function getStaticProps(staticProps) {
    const params = staticProps.params
    return {
        props: {
            "coffeeStore" : coffeeStoreData.find(coffeeStore => {
                return coffeeStore.id.toString() === params.id // dynamic id
            })
        }
    }
}

export function getStaticPaths() {
    const paths = coffeeStoreData.map(coffeeStore => {
        return {
            params: {
                id: coffeeStore.id.toString()
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
    console.log('props', props)
    
    if (router.isFallback) {
        return <div>Loading</div>
    }
    
    const { address, name, neighbourhood } = props.coffeeStore

    return (
        <div>
            <Head>
                <title>{name}</title>
            </Head>
            Coffee Store Page {router.query.id} 
            <Link href="/">Back to Home</Link>
            <Link href="/coffee-store/dynamic">Go to page dynamic</Link>
            <p>{address}</p>
            <p>{name}</p>
            <p>{neighbourhood}</p>
        </div>
    )
}

export default CoffeeStore