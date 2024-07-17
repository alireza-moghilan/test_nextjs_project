"use client";
// import
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, Col, Button, Space } from "antd";

// css
import style from './style.module.scss'
import LoadingPostId from "@/component/loading/loadingPostId";

// meta
const { Meta } = Card;

export default function PostId({ params }: any) {
    // interFace
    interface PostsKey {
        userId: number,
        id: number,
        title: string,
        body: string
    }
    // router
    const router = useRouter();
    // state
    const [posts, setPosts] = useState<PostsKey>()
    const [loading, setLoading] = useState<boolean>(false)
    const [id, setId] = useState<number>(Number(params.id))
    const [lenOfPosts, setLenOfPosts] = useState<number>(Number(localStorage.getItem('lenOfPosts')))

    // get Posts
    const getData = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`, { cache: "force-cache" });
        if (response.ok) {
            const json = await response.json();
            setPosts(json);
            setLoading(true);
        }
    }


    useEffect(() => {
        // Get on page load time
        const fetch = async () => {
            return await getData()
        }
        fetch();
    }, []);

    // loading ...
    if (!loading) {
        return LoadingPostId();
    }
    return (
        <>
            <h1 className={style.h1Color}>data:{id}</h1>

            <Col xxl={{span:12}} xl={{span:24}} lg={{ span: 24 }} md={{ span: 24 }} xs={{span:24}} key={posts?.id}>
                <Card size="small"
                    title={posts?.title}
                    bordered={true}
                >
                    <h3 className="pColor">id Post : {posts?.id}</h3>
                    <p>{posts?.body}</p>

                    <Space className={style.spaceBtn} size={[8, 8]} wrap>
                        <Button disabled={id <= 1} onClick={() => router.push(Number(--params.id).toString())}>prive Post</Button>
                    </Space>
                    <Space className={style.spaceBtn} size={[8, 8]} wrap>
                        <Button disabled={id === lenOfPosts} onClick={() => router.push(Number(++params.id).toString())}
                        >next Post</Button>
                    </Space>
                </Card>
            </Col>

        </>
    )
}