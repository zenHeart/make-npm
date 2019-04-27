//包含 css 文件
import 'reveal.js/css/theme/black.css'; // 配置 PPT 主题,只需替换 css 文件名即可,详见 https://www.npmjs.com/package/reveal.js#theming
import 'reveal.js/lib/css/monokai.css'; // 配置 highlight 风格,详见 https://www.npmjs.com/package/reveal.js#code-syntax-highlighting

Reveal.initialize (
  {
    width: 960,
    height: 700,
    margin: 0,
    minScale: 0.9,
    controls: true,
    progress: true,
    history: true,
    transition: 'slide',

    dependencies: [
      {
        src: 'reveal.js/lib/js/classList.js',
        condition: function () {
          return !document.body.classList;
        },
      },
      {
        src: 'reveal.js/plugin/markdown/marked.js',
        condition: function () {
          return !!document.querySelector ('[data-markdown]');
        },
      },
      {
        src: 'reveal.js/plugin/markdown/markdown.js',
        condition: function () {
          return !!document.querySelector ('[data-markdown]');
        },
      },
      {
        src: 'reveal.js/plugin/highlight/highlight.js',
        async: true,
        callback: function () {
          hljs.initHighlightingOnLoad ();
        },
      },
      {src: 'reveal.js/plugin/search/search.js', async: true},
      {src: 'reveal.js/plugin/zoom-js/zoom.js', async: true},
      {src: 'reveal.js/plugin/notes/notes.js', async: true},
    ],
  }
);