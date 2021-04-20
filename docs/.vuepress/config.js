module.exports = {
    title: '前端开发手册',
    description: '前端开发手册，打造完善的知识体系',
    base: '/',
    dest: './dist',
    themeConfig: {
        lastUpdated: 'Last Updated',
        // smoothScroll: true,
        sidebar: 'auto',
        sidebarDepth: 2,
        repo: 'https://github.com/gaohongwei11',
        repoLabel: 'Github',
        nav: [
            {
                text: 'H5坑位指南',
                items: [
                    { text: 'H5坑位指南', link: '/H5/' },
                ]
            },
            {
                text: 'Css',
                items: [
                    { text: 'css文字', link: '/Css/' },
                ]
            },
            {
                text: '代码块',
                items: [
                    { text: '插件系列', link: '/Utils/' },
                    { text: '图片系列', link: '/Utils/image' },
                ]
            },
            {
                text: '项目搭建',
                items: [
                    { text: 'React', link: '/React/' },
                    { text: 'Vue', link: '/Vue/' }
                ]
            },
            { text: 'Three.js', link: '/Three.js/' },
        ],
    }
};