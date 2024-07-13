import { client } from "@/component/services/axois";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import LoadingPosts from "./loading/loadingPosts";
import { Button, Flex, Card, Col, Space } from 'antd';

export const GetDataFun = () => {
    // router
    const router: AppRouterInstance = useRouter();
    // state
    const [posts, setPosts] = useState([{}]);
    const [loading, setLoading] = useState(false);

    // get data
    const getData = async () => {
        // sleep(5000)
        // const { data }: any = await client.get('/posts');
        try {
            const data = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: "force-cache" }).then(res => { return res.json() })
            setPosts(data);
            setLoading(true)
        } catch (error) {

        }
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
        <>
            <Flex wrap gap="large" justify={'space-evenly'} align={'start'}>
                {
                    posts.map((index: any) => (
                        <Col span={7} key={index.id}>
                            <Card size="small" title={index.title} bordered={false}>
                                {index.body}
                                <br /><br />
                                <Space size={[8, 16]} wrap>
                                    <Button onClick={() => { localStorage.setItem('postId', JSON.stringify(index.id)); return router.push(`/posts/${index.id}`) }}>
                                        read more
                                    </Button>
                                </Space>
                            </Card>
                        </Col>
                    ))
                }
            </Flex>
        </>
    )
} 