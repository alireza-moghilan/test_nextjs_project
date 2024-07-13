"use client";
import { Card, Avatar, Col } from "antd";
// The loading that is displayed at run-time postId
const { Meta } = Card;
export default function LoadingPostId() {
    return (
        <>
            <Col span={12}>
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
        </>
    )
}