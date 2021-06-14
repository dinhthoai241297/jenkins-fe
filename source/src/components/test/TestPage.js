import React from 'react'
import { Row, Col, Button, Select, Card, Image, Progress, List, Avatar, Form } from 'antd'
import CardFeat from '../common/elements/CardFeat'

import desktop_content from '../../assets/images/desktop_content.png'
import battery2 from '../../assets/images/logo.png'
import logo from '../../assets/images/logo.png'
import badge from '../../assets/images/entrepreneur-badge.png'
import userpic from '../../assets/images/userpic.png'

const list = [
    // {
    //     title: 'Thời gian',
    //     content: (
    //         <>
    //             Bài kiểm tra sẽ mất khoảng <b>30 phút </b>. Nếu bạn không hoàn
    //             thành bài kiểm tra, bạn sẽ có thể tiếp tục sau đó, hãy chọn lại
    //             nó.
    //         </>
    //     ),
    //     img: battery2,
    // },
    // {
    //     title: 'Kết thúc',
    //     content:
    //         'Sau khi hoàn thành bài kiểm tra, bạn có thể kiểm tra hồ sơ kỹ thuật số cập nhật của mình có trong phần cụ thể của nó trên trang web.',
    //     img: desktop_content,
    // },
]

const TestPage = () => {
    return (
        <div style={{width:"100%", position:'absolute', top:283,left:0}}>
            <nav class="top-bar-mini" 
            style={{background:"#e5660e",height:"0.8125rem",lineHeight:"0.8125rem",marginBottom:0,overflow:"hidden",position:"fixed", top: 270,
            right: 0,
            left: 0,}   
            }/>
        <Row>
            <Col span={6} style={{background:"#3c3c3b", width:"100%" , paddingLeft: "0.9375rem", paddingRight: "0.9375rem"}}>
                <div >
                    <Image src={logo}/>  <Image src={badge}/>
                </div>
                <div style={{marginBottom:"0.625rem", marginTop:"2em"}}>
                    <Progress type="line" showInfo={false} />
                </div>
                <div >
                {/* <Card style={{    
                        background: "#5B5B5F",
                        color: "#fff",
                        display: "block",
                        fontSize: "1.35em",
                        padding: ".5em 1em",
                        border:"0px",
                    }} */}
                        
                        {/* > */}
                    <h2 style={{    
                        background: "#5B5B5F",
                        color: "#fff",
                        display: "block",
                        fontSize: "1.35em",
                        padding: ".5em 1em",
                        border:"0px",
                        fontWeight: 700,
                    }}>INFORMATION AND DATA LITERACY</h2>
                    {/* </Card> */}

                    </div>
                <div style={{height:150}}>
                    <List
                        itemLayout="horizontal"
                        dataSource={list}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                    </List.Item>
                    )}   
                    />,
                </div>
            </Col>
            <Col span={18} style={{marginTop: "0.7em", paddingLeft: "0.9375rem",paddingRight: "0.9375rem", float: "left"}}>
                <Form style={{background: "#3c3c3b",width: "100%", height: "4.3rem"}}>
                    <div style={{padding:"1em 1em 1em 0", float:"right"}}>
                        <Button size="large" type="submit" style={{color:"white",background:"#2e9dea",border:0}}>
                            EN
                        </Button>
                        <Button size="large" type="submit" style={{color:"white",background:"#555",border:0}}>
                            Name
                        </Button>
                        <Button size="large" type="submit" style={{color:"white",background:"#e5660e",border:0}}>
                            Finish Test
                        </Button>
                    </div>
                </Form>
                <Form style={{width: "100%", height: "4.3rem", paddingTop: "1.0em",paddingLeft: "1.0em", color: "#5B5B5F",display:"flex" }}>
                    {/* <div margin={0}> */}
                    <img src={userpic} style={{height:"50px",paddingLeft: "0.9375rem",paddingRight: "0.9375rem",}}></img>

                    {/* <Image src={userpic} style={{height:"8.33333%",width: "8.33333%",paddingRight:0,marginRight:0}} preview={false}></Image> */}
                    <p style={{
                        width: "83.33333%",
                        fontSize: "1rem",
                        fontWeight: 300,
                        lineHeight: "1.6",
                        marginBottom: "1.25rem",
                        textRendering: "optimizeLegibility",
                        paddingLeft: "0.9375rem",paddingRight: "0.9375rem",
                        fontFamily: "Roboto Slab,Arial,sans-serif",
                        fontStyle: "normal",

                        }}>
                        ‘Attitudes’ are conceived as the motivators of performance, the basis for continued competent performance. They include values, aspirations and priorities.
                    </p>
                </Form>
                <Card style={{
                    background: "none",
                    borderColor: "#2e9dea",
                    color: "#1a773c", 
                    borderRadius: 6,
                    marginTop: "1em",
                    marginBottom: "1em",
                    fontSize: "1em",
                    borderStyle: "solid",
                    borderWidth: 1,
                    display: "block",
                    fontWeight: 300,fontFamily: "Roboto Slab,Arial,sans-serif",
                    fontStyle: "normal",
                    // padding: "0.875rem 1.5rem 0.875rem 0.875rem"
                    // padding:0,
                    }}
                    padding={0}
                    >
                        Rank each item based on your criteria
                </Card>
                <Button size="large" type="submit" style={{color:"white", borderRadius: 6, background:"#2eadb2"}}>
                    Phản hồi
                </Button>
            </Col>
            
        </Row>,
        
        </div>
    )
}

export default TestPage
