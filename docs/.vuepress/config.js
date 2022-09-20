module.exports = {
    title: 'xxx用户手册',
    description: '一个基于VuePress打造的文档',
    dest: 'dist/docs',
    base: '/xxx/docs/',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            {
                text: 'Language',
                ariaLabel: 'Language Menu',
                items: [
                { text: 'Chinese', link: '/language/chinese/' },
                { text: 'Japanese', link: '/language/japanese/' }
                ]
            }
        ]
    }
  }