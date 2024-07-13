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

                        <Col span={12} key={index.id}>
                            <Card size="small"
                                title={index.title}
                                bordered={true}
                            >
                                <h3 className="pColor">id Post : {index.id}</h3>
                                <p>{index.body}</p>

                                <Space style={{margin:'16px 8px'}} size={[8, 8]} wrap>

                                    <Button onClick={() => { return id > 1 ? (setId(id - 1), localStorage.setItem('postId', JSON.stringify(id - 1))) : router.push('1') }}>prive Post</Button>
                                </Space>
                                <Space style={{margin:'16px 8px'}} size={[8, 8]} wrap>

                                    <Button onClick={() => {
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