import Link from "next/link"
import { useRouter } from "next/router"
import coffeeStoreData from "../../data/coffee-stores.json"

export function getStaticProps(staticProps) {
    const params = staticProps.params
    return {
        props: {
            "coffeeStore" : coffeeStoreData.find(coffeeStore => {
                return coffeeStore.id === 0//params.id // dynamic id
            })
        }
    }
}

export function getStaticPaths() {
    return {
        paths: [
            { params: { id: '0'} },
            { params: { id: '1'} }
        ]
    }
}

const CoffeeStore = () => {
    const router = useRouter()

    return (
        <div>
            Coffee Store Page {router.query.id} 
            <Link href="/">Back to Home</Link>
            <Link href="/coffee-store/dynamic">Go to page dynamic</Link>
        </div>
    )
}

export default CoffeeStore