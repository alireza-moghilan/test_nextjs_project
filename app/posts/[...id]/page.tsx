"use client";
// import
import { client } from "@/component/services/axois";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, Avatar, Col, Button, Space } from "antd";

// css
import style from './style.module.scss'
import LoadingPostId from "@/component/loading/loadingPostId";

// meta
const { Meta } = Card;

export default function PostId({ params }: any) {
    // router
    const router = useRouter();
    // state
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState(Number(params.id))

    // get Posts
    const getData = async () => {
        // Getting data with the axios method
        // const { data }: any = await client.get('/posts');
        const data = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: "force-cache" }).then(res => { return res.json() });
        setPosts(data);
        setLoading(true)
    }

    // useEffect => getdata and set postId on the router
    useEffect(() => {
        // set postId on the router
        router.push(Number(localStorage.getItem('postId') || +1).toString() || '0');
        // Get on page load time
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

                        <Col span={12} key={index.id}>
                            <Card size="small"
                                title={index.title}
                                bordered={true}
                            >
                                <h3 className="pColor">id Post : {index.id}</h3>
                                <p>{index.body}</p>

                                <Space style={{margin:'16px 8px'}} size={[8, 8]} wrap>
                                    {/* btn => prive Post */}
                                    <Button disabled={id<=1?true:false} onClick={() => { return id > 1 ? (setId(id - 1), localStorage.setItem('postId', JSON.stringify(id - 1))) : router.push('1') }}>prive Post</Button>
                                </Space>
                                <Space style={{margin:'16px 8px'}} size={[8, 8]} wrap>
                                    {/* btn => next post */}
                                    <Button disabled={id>=posts.length?true:false} onClick={() => {
                                        if (id < posts.length) {
                                            localStorage.setItem('postId', JSON.stringify(id + 1)); return setId(1 + id);
                                        }
                                    }
                                    }
                                    >next Post</Button>
                                </Space>
                            </Card>
                        </Col>
                    )
                }
            })}

        </>
    )
}