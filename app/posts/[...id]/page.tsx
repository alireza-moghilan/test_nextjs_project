"use client";
// import
import { client } from "@/component/services/axois";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// css
import style from './style.module.scss'
import LoadingPostId from "@/component/loading/loadingPostId";

export default function PostId({ params }: any) {
    // router
    const router = useRouter();
    // state
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState(Number(params.id))

    // get Data
    const getData = async () => {
        const { data }: any = await client.get('/posts');
            setPosts(data);
            setLoading(true)
    }
    
    // 
    useEffect(() => {
        router.push(Number(localStorage.getItem('postId') || +1).toString() || '0');
            const fetch = async () => {
                return await getData()
            }
            fetch();
    }, [])

    // loading ...
    if (!loading) {
        return LoadingPostId()
    }

    return (
        <>
            <h1 className={style.h1Color}>data:{id}</h1>
            {posts.map((index: any) => {
                if (id == index.id) {
                    return (
                        <div className="card text-bg-warning m-3" key={index.id} style={{ "width": '50rem' }}>
                            <div className="card-header">id Post : {index.id}</div>
                            <div className="card-body">
                                <h5 className="card-title">{index.title}</h5>
                                <p className="card-text">{index.body}</p>
                            </div>
                            <button className="btn btn-success m-3" onClick={() => {
                                if (id<posts.length) {
                                    localStorage.setItem('postId', JSON.stringify(id + 1)); return setId(1 + id);
                                }
                            }
                            }
                            >next Post</button>
                            <button className="btn btn-success m-3 mt-0" onClick={() => { return id > 1 ? (setId(id - 1),localStorage.setItem('postId', JSON.stringify(id - 1))) : router.push('1') }}>prive Post</button>
                        </div>
                    )
                }
            })}

        </>
    )
}