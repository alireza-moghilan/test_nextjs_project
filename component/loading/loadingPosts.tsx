// import
import { Row, Card, Avatar, Col } from "antd"
const { Meta } = Card;
// load all posts
export default function LoadingPosts() {
    return (
        <>

            <Row gutter={[24, 24]}>
                {Array.from({ length: 24 }, (_, i) => (
                    <Col xl={{span:6}} lg={{ span: 8 }} md={{ span: 12 }} xs={{span:24}}>
                        <Card size="small"
                            loading={true}
                        >
                            <Meta
                                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}