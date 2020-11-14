module.exports = {
  title: "welecome to my blog",
  description: 'A simple and beautiful blog',
  // base:"",
  dest: 'docs',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],

  locales: {
    '/': {
      lang: 'zh-CN',
      title: '远妹子的博客',
      description: '这是一个vue-press的博客'
    },
    '/en/': {
      lang: 'en-US',
      title: 'yuanmeiziのblog',
      description: 'this is my vue-press blog'
    }
  },

  theme: 'reco',
  themeConfig: {
    type: 'blog',

    mode: 'auto', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
    modePicker: false, // 默认 true，false 不显示模式调节按钮，true 则显示

    // 需要密码才能进入
    keyPage: {
      keys: ['e10adc3949ba59abbe56e057f20f883e'], // 1.3.0 版本后需要设置为32位的 md5 加密密文
      color: '#42b983', // 登录页动画球的颜色
      lineColor: '#42b983' // 登录页动画线的颜色
    },

    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
      { text: 'Contact', 
        icon: 'reco-message',
        items: [
          { text: 'GitHub', link: 'https://github.com/yuanmeizi', icon: 'reco-github' },
          { text: 'Hexo', link: 'https://blog.yuanmeizi.tk', icon: 'reco-blog' }
        ]
      }
    ],
    
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: 'Tag' // 默认 “标签”
      }
    },
    // 多语言设置
    locales: {
       '/': {
          // 多语言下拉菜单的标题
          selectText: '选择语言',
          // 该语言在下拉菜单中的标签
          label: '简体中文',
          // navbar里一些字
          // recoLocales: {
          //   homeBlog: {
          //     Home:'首页',
          //     TimeLine:'时间线',
          //     Contact:'联系',
          //     GitHub:'GitHub',
          //     Hexo:'Hexo'
          //   },
          //   pagation: {
          //     prev: '上一页',
          //     next: '下一页',
          //     go: '前往',
          //     jump: '跳转至'
          //   }
          // }
        },
        '/en/': {
          selectText: 'language',
          label: 'English',

          // recoLocales: {
          //   homeBlog: {
          //     Home:'Home',
          //     TimeLine:'TimeLine',
          //     Contact:'Contact',
          //     GitHub:'GitHub',
          //     Hexo:'Hexo'
          //   },
          //   pagation: {
          //     prev: '上一页',
          //     next: '下一页',
          //     go: '前往',
          //     jump: '跳转至'
          //   }
          // }
        },
    },
    // 404公益
    noFoundPageByTencent: true,

    /**
    代码块主题
     * support for
     * 'default'
     * 'funky'
     * 'okaidia'
     * 'solarizedlight'
     * 'tomorrow'
     */
    codeTheme: 'tomorrow', // default 'tomorrow'
    // 友情链接
    friendLink: [
      {
        title: '哔哩哔哩',
        desc: '知名的视频弹幕网站',
        logo: 'http://dwz.date/dkr2',
        link: 'https://www.bilibili.com'
      },
      // {
      //   title: '午后南杂',
      //   desc: 'Enjoy when you can, and endure when you must.',
      //   email: '1156743527@qq.com',
      //   link: 'https://www.recoluan.com'
      // },
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      },
    ],
    logo: '/logo.png',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    // sidebar: 'auto',
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: 'yuanmeizi',
    // 作者头像
    authorAvatar: '/avatar.jpg',
    // 备案号
    record: 'xxxx',
    // 项目开始时间
    startYear: '2017'
    


    /**
     * valine 设置 (if you need valine comment )
     */

    // valineConfig: {
    //   appId: '...',// your appId
    //   appKey: '...', // your appKey
    // }
  },
  markdown: {
    lineNumbers: true
  },

  // 插件 https://vuepress-theme-reco.recoluan.com/views/plugins/
   plugins: [
    [
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        theme: ['miku', 'z16', 'blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko'],
        clean: false,
        message: {
          welcome: '欢迎来到这里',
          home: '心里的花，我想要带你回家。',
          theme: '好吧，希望你能喜欢我的其他小伙伴。',
          close: '你知道我喜欢吃什么吗？痴痴地望着你。'
        },
        messageStyle:{
          right: '68px',
          bottom: '190px'
        },
        modelStyle: {
          right: '90px',
          bottom: '0px',
          opacity: '0.9',
          zIndex: 99999
        },
        btnStyle:{
          right: '90px',
          bottom: '40px',
        },
        width:150,
        height:220
      }
    ]
    // ["@vuepress-reco/vuepress-plugin-bgm-player",
    //   {
    //     // 播放列表(多个歌曲本地或网络链接都可)
    //     audios:[
    //       {
    //         name: '红色高跟鞋',
    //         artist: '蔡健雅',
    //         url: 'https://webfs.yun.kugou.com/202011141137/5ba2f3344c079bcef72959d8fc372dfa/part/0/964146/G193/M06/1D/13/oZQEAF5Pv4yAWinjADKHLjwI7Y4133.mp3',
    //         cover: 'http://p1.music.126.net/DmOH1DlbPOy-yG0jXVKAbw==/109951164795907027.jpg?param=130y130'
    //       },
    //       {
    //         name: '高潔なる教皇',
    //         artist: '菅野祐悟',
    //         url: '/mp3/高洁的教皇.mp3',
    //         cover: '/mp3/高洁的教皇.jpg'
    //       }
    //     ],
    //     position:{
    //       left: '10px',
    //       bottom: '10px',
    //       'z-index': '999999'
    //     },
    //     autoShrink:true,
    //     shrinkMode:'mini',// mini或者float
    //     // floatPosition:'left'或者'right'
    //     // floatStyle:{
    //     //   bottom: '200px',
    //     //   'z-index': '999999'
    //     // }
    //   }
    // ]
  ]
}  
