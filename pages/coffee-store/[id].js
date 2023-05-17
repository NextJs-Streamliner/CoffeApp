import Link from "next/link"
import { useRouter } from "next/router"
import coffeeStoreData from "../../data/coffee-stores.json"

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
    return {
        paths: [
            { params: { id: '0'} },
            { params: { id: '1'} },
            { params: { id: '300'} }
        ],
        fallback: false
    }
}

const CoffeeStore = (props) => {
    const router = useRouter()
    console.log('props', props)
    return (
        <div>
            Coffee Store Page {router.query.id} 
            <Link href="/">Back to Home</Link>
            <Link href="/coffee-store/dynamic">Go to page dynamic</Link>
            <p>{props.coffeeStore.name}</p>
        </div>
    )
}

export default CoffeeStore