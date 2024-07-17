import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPosts from "./loading/loadingPosts";
import { Button, Card, Col, Space, Row } from 'antd';
import { toast } from "react-toastify";

export const GetPostsComponent = () => {
    // router
    const router: AppRouterInstance = useRouter();
    // state
    const [posts, setPosts] = useState<PostsKey[]>([]);
    const [loading, setLoading] = useState(false);

    const [viewData, setViewData] = useState(
        {
            viewMore: { data: false, btn: true, btnText: 'view more' },
            viewAll: { data: false, btn: false, btnText: 'view all' },
            viewLess: { data: false, btn: false, btnText: 'view less' },
            btnTextMain: 'view more'
        });
    const [btnClick, setBtnClick] = useState(0);

    // interFace
    interface PostsKey {
        id: number,
        title: string,
        body: string
    }

    // get posts
    const getData = async () => {
        // Getting data with the axios method
        // const { data }: any = await client.get('/posts');
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: "force-cache" })
                .then(res => {
                    return res.json();
                });
            setPosts(response);
            setLoading(true);
            console.log(response.length)
            localStorage.setItem('lenOfPosts', response.length.toString());
        } catch {
            toast.error(`Sorry, there is a server error.
            Please refresh the page again`);
        }

    }

    // Received at data load time
    useEffect(() => {
        getData();
    }, [])

    // loading 
    if (!loading) {
        return LoadingPosts();
    }

    // show data
    const handlingClicksToViewData = () => {
        if (btnClick === 0) {
            setBtnClick(1);
            setViewData(
                {
                    viewMore: { data: true, btn: false, btnText: viewData.viewMore.btnText },
                    viewAll: { data: false, btn: true, btnText: viewData.viewAll.btnText },
                    viewLess: { data: false, btn: false, btnText: viewData.viewLess.btnText },
                    btnTextMain: viewData.viewAll.btnText
                })
        } else if (btnClick === 1) {
            setBtnClick(2);
            setViewData(
                {
                    viewMore: { data: false, btn: false, btnText: viewData.viewMore.btnText },
                    viewAll: { data: true, btn: false, btnText: viewData.viewAll.btnText },
                    viewLess: { data: false, btn: true, btnText: viewData.viewLess.btnText },
                    btnTextMain: viewData.viewLess.btnText
                })
        } else if (btnClick === 2) {
            setBtnClick(0);
            setViewData(
                {
                    viewMore: { data: true, btn: false, btnText: viewData.viewMore.btnText },
                    viewAll: { data: false, btn: true, btnText: viewData.viewAll.btnText },
                    viewLess: { data: true, btn: false, btnText: viewData.viewLess.btnText },
                    btnTextMain: viewData.viewMore.btnText
                })
        }
    }

    // card antd
    const card = (id: number, title: string, body: string) => {
        return (
            <Col className="h-100" lg={{ span: 8 }} md={{ span: 12 }}>
                <Card className="h-card" size="small" title={title} bordered={false}>
                    {body}
                    <br /><br />
                    <Space size={[8, 16]} wrap>
                        <Button className="btn-place" onClick={() => { localStorage.setItem('postId', JSON.stringify(id)); return router.push(`/posts/${id}`) }}>
                            read more
                        </Button>
                    </Space>
                </Card>
            </Col>
        )
    }


    // 
    const addPosts = (startShowingPosts: number, endShowingPosts: number) => {
        return (
            posts.map((items: PostsKey) => (
                items.id >= startShowingPosts && items.id <= endShowingPosts &&
                card(items.id, items.title, items.body)
            ))
        )
    }

    return (
        <>
            <Row gutter={[24, 24]}>
                {
                    <>
                        {
                            !viewData.viewLess.data &&
                            posts.map((items: PostsKey) => (
                                items.id <= 20 &&
                                card(items.id, items.title, items.body)
                            ))
                        }
                        {
                            viewData.viewMore.data && !viewData.viewLess.data &&
                            addPosts(20, 40)
                        }
                        {
                            viewData.viewAll.data && !viewData.viewLess.data &&
                            addPosts(41, posts.length)
                        }
                        {
                            viewData.viewLess.data &&
                            addPosts(1, 20)
                        }
                    </>
                }
            </Row>
            {
                <Button className="viewDataBtn viewMore" type="primary" onClick={handlingClicksToViewData}>{viewData.btnTextMain}</Button>
            }

        </>
    )
} 