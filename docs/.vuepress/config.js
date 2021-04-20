module.exports = {
    title: '前端开发手册',
    description: '前端开发手册，打造完善的知识体系',
    base: '/blog/dist/',
    dest: '/blog/dist',
    themeConfig: {
        lastUpdated: 'Last Updated',
        // smoothScroll: true,
        sidebar: 'auto',
        sidebarDepth: 2,
        repo: 'https://github.com/gaohongwei11',
        repoLabel: 'Github',
        nav: [
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