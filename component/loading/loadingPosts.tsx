// import
import { Button, Flex, Card, Avatar, Col } from "antd"
const { Meta } = Card;
// load all posts
export default function LoadingPosts() {
    return (
        <>

            <Flex wrap gap="large" justify={'space-evenly'} align={'start'}>
                {Array.from({ length: 24 }, (_, i) => (
                    <Col span={7}>
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
            </Flex>
        </>
    )
}