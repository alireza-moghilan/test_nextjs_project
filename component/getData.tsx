import { client } from "@/component/services/axois";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import image from '@/public/image.png';
import Image from "next/image";
import LoadingPosts from "./loading/loadingPosts";


export const GetDataFun=()=> {
    // router
    const router:AppRouterInstance = useRouter();
    // state
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // get data
    const getData = async () => {
        // sleep(5000)
        const { data }: any = await client.get('/posts');
        setPosts(data);
        setLoading(true)
    }
    
    // Received at data load time
    useEffect(() => {
        const fetch = async () => {
            return await getData()
        }
        fetch()
    }, [])

    // loading 
    if (!loading) {
        return LoadingPosts();
    }

    return (
        <div className="d-flex flex-wrap">
                {posts.map((index: any) => (
                    <div className="card text-bg-warning m-3" key={index.id} style={{ "width": '18rem' }}>
                        <div className="image-card">
                            <Image className="w-100" height={250} src={image} alt="image 1" />
                        </div>
                        <div className="card-header">{index.title}</div>
                        <div className="card-body">
                            <h5 className="card-title">Warning card title</h5>
                            <p className="card-text">{index.body}</p>
                        </div>
                        <button className="btn btn-success" onClick={() => {localStorage.setItem('postId',JSON.stringify(index.id)); return router.push(`/posts/${index.id}`)}}>
                            read more
                        </button>
                    </div>
                ))}
            </div>
    )
} 