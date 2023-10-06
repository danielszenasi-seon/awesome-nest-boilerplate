import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Awesome nestjs boilerplate",
  description: "A VitePress Site",
  base: "/awesome-nest-boilerplate/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Architecture', link: '/architecture' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Architecture', link: '/architecture' },
          { text: 'Monitoring', link: '/monitoring' },
          { text: 'Database', link: '/database' },
          { text: 'Pipelines', link: '/pipelines' },
          { text: 'Contributing', link: '/contributing' },
          { text: 'Code quality', link: '/code-quality' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
