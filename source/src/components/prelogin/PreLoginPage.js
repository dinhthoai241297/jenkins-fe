import React from 'react'
import { Row, Col, Button, Select, Card, Layout, Typography } from 'antd'
const { Text } = Typography

const PreLoginPage = ({renderRouting}) => {
    return (
        <Layout className="preLogin-page" >
        <div>
            <div className="alert-box">
                <Card>
                    <p>Please, select the assessment module in the combo and then click on the 'Start the test' buttom. The test and the countdown will automatically start. Good luck!</p>
                </Card>
            </div>
            <div className="panel">
                <Card>
                    <Row>
                        <Col span={8} className="panelCol6"><strong>Module:</strong></Col>
                        <Col span={15}><Select></Select></Col>
                    </Row>,
                    <Row>
                        <Col span={8}  className="panelCol6"><strong>Language:</strong></Col>
                        <Col span={15}><Select></Select></Col>
                    </Row>,                            
                    <Button size="large" type="primary" onClick={renderRouting}>
                        Bắt đầu kiểm tra
                    </Button>
                </Card>
            </div>
        </div>
        </Layout>
    )
}

export default PreLoginPage
