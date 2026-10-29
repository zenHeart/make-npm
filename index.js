import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import Search from 'reveal.js/plugin/search/search.esm.js';
import Zoom from 'reveal.js/plugin/zoom/zoom.esm.js';
import Notes from 'reveal.js/plugin/notes/notes.esm.js';

Reveal.initialize({
  width: 960,
  height: 700,
  margin: 0,
  minScale: 0.9,
  controls: true,
  progress: true,
  history: true,
  transition: 'slide',
  plugins: [Markdown, Highlight, Search, Zoom, Notes],
});
