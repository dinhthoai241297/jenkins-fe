export const sitePathConfig = {
    login: {
        path: '/login',
        title: 'Đăng nhập',
        layoutConfig: {
            contentClass: 'login-page',
        },
    },
    register: {
        path: '/register',
        title: 'Đăng ký',
    },
    updateProfile: {
        path: '/update-profile',
        title: 'Cập nhật hồ sơ điện tử',
    },
    homePage: {
        path: '/',
        title: 'Trang chủ',
    },
    aboutUs: {
        path: '/about',
        title: 'Về chúng tôi',
        layoutConfig: {
            contentClass: 'aboutUs-page',
        },
    },
    exams: {
        path: '/exams',
        title: 'Khảo sát',
    },
    forbidden: {
        path: '/forbidden',
        title: 'Forbidden',
    },
    competences: {
        path: '/competences',
        title: 'Hồ sơ năng lực',
        layoutConfig: {
            contentClass: 'competences-page',
        },
    },
    verifyAccount: {
        path: '/verify-account',
        title: 'Xác thực tài khoản',
    },
    forgotPassword: {
        path: '/forgot-password',
        title: 'Quên mật khẩu',
    },
    preLogin: {
        path: '/prelogin',
        title: 'Trước khi trả lời câu hỏi',
    },
    test: {
        path: '/test',
        title: 'Kiểm tra',
    },
}

export default sitePathConfig
