import Head from "next/head"
import { useRouter } from "next/router"

const DynamicPage = () => {
    const router = useRouter()
    
    return (
        <div>
            <Head><title>{router.query.dynamic}</title></Head>
            <div>Page {router.query.dynamic}</div>
        </div>
    )
}

export default DynamicPage