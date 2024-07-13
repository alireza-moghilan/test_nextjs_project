import { client } from "@/component/services/axois";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import LoadingPosts from "./loading/loadingPosts";
import { Button, Flex, Card, Col, Space } from 'antd';
import { toast } from "react-toastify";

export const GetPostsComponent = () => {
    // router
    const router: AppRouterInstance = useRouter();
    // state
    const [posts, setPosts] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [viewMore, setViewMore] = useState({ data: false, btn: true });
    const [viewAll, setViewAll] = useState({ data: false, btn: false });
    const [viewLess, setViewLess] = useState({ data: false, btn: false });

    // get posts
    const getData = async () => {
        // Getting data with the axios method
        // const { data }: any = await client.get('/posts');
        try {
            const data = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: "force-cache" }).then(res => { return res.json() });
            setPosts(data);
            setLoading(true)
        } catch {
            toast.error(`Sorry, there is a server error.
            Please refresh the page again`);
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

    const viewMoreFun = () => {
        // show view more
        setViewMore({ data: true, btn: false });

        // show view all btn
        setViewAll({ data: false, btn: true });
        // hide view less
        setViewLess({ data: false, btn: false });
    }

    const viewAllFun = () => {
        // show view all
        setViewAll({ data: true, btn: false });
        // show view less btn
        setViewLess({ data: false, btn: true });
        // hide view more
        setViewMore({ data: false, btn: false });
    }

    const viewLessFun = () => {
        // hide view less
        setViewLess({ data: true, btn: false });
        // hide view all
        setViewAll({ data: false, btn: false });

        // hide view more
        setViewMore({ data: false, btn: true });
    }

    const addPosts = (startShowingPosts: number, endShowingPosts: number) => {
        if (viewMore.data) {
            return (
                posts.map((index: any) => (
                    index.id >= startShowingPosts && index.id <= endShowingPosts &&
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
            )
        }
        if (viewAll.data) {
            return (
                posts.map((index: any) => (
                    index.id >= startShowingPosts && index.id <= endShowingPosts &&
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
            )
        }
        if (viewLess.data) {
            return (
                posts.map((index: any) => (
                    index.id >= startShowingPosts && index.id <= endShowingPosts &&
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
            )
        }
    }

    return (
        <>
            <Flex wrap gap="large" justify={'space-evenly'} align={'start'}>
                {
                    <>
                        {
                            !viewLess.data &&
                            posts.map((index: any) => (
                                index.id <= 20 &&
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
                        {
                            viewMore.data && !viewLess.data &&
                            addPosts(20, 40)
                        }
                        {
                            viewAll.data && !viewLess.data &&
                            addPosts(41, posts.length)
                        }
                        {
                            viewLess.data &&
                            addPosts(1, 20)
                        }
                    </>
                }
            </Flex>
            {
                viewMore.btn &&
                <Button className="viewMore" style={{ margin: '4rem auto', display: 'flex', padding: '1.5rem 3rem' }} type="primary" onClick={viewMoreFun}>View more</Button>
            }
            {
                viewAll.btn &&
                <Button className="viewAll" style={{ margin: '4rem auto', display: 'flex', padding: '1.5rem 3rem' }} type="primary" onClick={viewAllFun}>View All</Button>
            }
            {
                viewLess.btn &&
                <Button className="viewAll" style={{ margin: '4rem auto', display: 'flex', padding: '1.5rem 3rem' }} type="primary" onClick={viewLessFun}>View less</Button>
            }

        </>
    )
} 