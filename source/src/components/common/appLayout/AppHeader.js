import React from 'react'
import { Layout, Menu, Space, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'

import { sitePathConfig } from '../../../constants/sitePathConfig'
import { useLocation } from 'react-router'

import { UserOutlined } from '@ant-design/icons'
import logo from '../../../assets/images/logo.png'

import { MenuOutlined } from '@ant-design/icons'

const { Header } = Layout
const { Text } = Typography
const { SubMenu } = Menu

const menus = [
    {
        title: 'Về chúng tôi',
        path: sitePathConfig.aboutUs.path,
    },
    {
        title: 'Hồ sơ',
        subs: [
            {
                title: 'Hồ sơ cá nhân',
                path: sitePathConfig.updateProfile.path,
            },
            {
                title: 'Hồ sơ năng lực',
                path: sitePathConfig.competences.path,
            },
        ],
    },
    {
        title: 'Khảo sát',
        path: sitePathConfig.exams.path,
    },
]

const AppHeader = ({ isAuth, onLogout, shortName, avatar }) => {
    const location = useLocation()

    return (
        <Header className="app-header">
            <div className="logo">
                <img src={logo} />
            </div>
            <Menu
                className="app-menu d-none d-md-block"
                theme="light"
                mode="horizontal"
                selectedKeys={[location.pathname]}
                overflowedIndicator={
                    <MenuOutlined style={{ fontSize: '20px' }} />
                }
            >
                {menus.map(menu =>
                    menu.subs ? (
                        <SubMenu
                            className="menu-left"
                            key="SubMenu"
                            title={menu.title}
                        >
                            {menu.subs.map(subMenu => (
                                <Menu.Item key={subMenu.path}>
                                    <Link to={subMenu.path}>
                                        {subMenu.title}
                                    </Link>
                                </Menu.Item>
                            ))}
                        </SubMenu>
                    ) : (
                        <Menu.Item className="menu-left" key={menu.path}>
                            <Link to={menu.path}>{menu.title}</Link>
                        </Menu.Item>
                    )
                )}
                {isAuth ? (
                    <SubMenu
                        key="logged-subMenu"
                        title={<Text strong>{shortName}</Text>}
                        icon={
                            <Avatar
                                size={24}
                                src={avatar}
                                icon={<UserOutlined />}
                            />
                        }
                    >
                        <Menu.Item
                            key={sitePathConfig.updateProfile.path + '2'}
                        >
                            <Link to={sitePathConfig.updateProfile.path}>
                                <Text strong>Hồ sơ</Text>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="#" onClick={onLogout}>
                            <Text strong>Đăng xuất</Text>
                        </Menu.Item>
                    </SubMenu>
                ) : (
                    <>
                        <Menu.Item key={sitePathConfig.login.path}>
                            <Link to={sitePathConfig.login.path}>
                                <Text strong>Đăng nhập</Text>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={sitePathConfig.register.path}>
                            <Link to={sitePathConfig.register.path}>
                                <Text strong>Đăng ký</Text>
                            </Link>
                        </Menu.Item>
                    </>
                )}
            </Menu>

            {/* Mobile */}
            <Menu
                className="app-menu d-block d-md-none"
                theme="light"
                mode="horizontal"
                selectedKeys={[location.pathname]}
                overflowedIndicator={
                    <MenuOutlined style={{ fontSize: '20px' }} />
                }
                triggerSubMenuAction="click"
            >
                <SubMenu
                    key="SubMenu-mobile"
                    title={<MenuOutlined style={{ fontSize: '20px' }} />}
                    className="toggle-menu-mobile"
                >
                    {menus.map(menu =>
                        menu.subs ? (
                            <SubMenu
                                className="menu-left"
                                key="SubMenu"
                                title={menu.title}
                            >
                                {menu.subs.map(subMenu => (
                                    <Menu.Item key={subMenu.path}>
                                        <Link to={subMenu.path}>
                                            {subMenu.title}
                                        </Link>
                                    </Menu.Item>
                                ))}
                            </SubMenu>
                        ) : (
                            <Menu.Item className="menu-left" key={menu.path}>
                                <Link to={menu.path}>{menu.title}</Link>
                            </Menu.Item>
                        )
                    )}
                    {isAuth ? (
                        <SubMenu
                            key="logged-subMenu"
                            title={<Text strong>{shortName}</Text>}
                            icon={
                                <Avatar
                                    size={24}
                                    src={avatar}
                                    icon={<UserOutlined />}
                                />
                            }
                        >
                            <Menu.Item
                                key={sitePathConfig.updateProfile.path + '2'}
                            >
                                <Link to={sitePathConfig.updateProfile.path}>
                                    <Text strong>Hồ sơ</Text>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="#" onClick={onLogout}>
                                <Text strong>Đăng xuất</Text>
                            </Menu.Item>
                        </SubMenu>
                    ) : (
                        <>
                            <Menu.Item key={sitePathConfig.login.path}>
                                <Link to={sitePathConfig.login.path}>
                                    <Text strong>Đăng nhập</Text>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key={sitePathConfig.register.path}>
                                <Link to={sitePathConfig.register.path}>
                                    <Text strong>Đăng ký</Text>
                                </Link>
                            </Menu.Item>
                        </>
                    )}
                </SubMenu>
            </Menu>
        </Header>
    )
}

export default AppHeader
