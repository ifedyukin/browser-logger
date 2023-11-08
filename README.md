# Browser Logger

Simple script to render basic console methods (log, debug, error, info, warn) to div in DOM.
Maybe useful for modile devices debug.

Add script to the document:

```html
<script defer src="https://ifedyukin.ru/shared/browser-logger.js"></script>
```

Or use bookmarklet:

```url
javascript:(function()%7Bconst%20browserLoggerScript%20%3D%20document.createElement('script')%3B%0AbrowserLoggerScript.defer%20%3D%20true%3B%0AbrowserLoggerScript.src%20%3D%20'https%3A%2F%2Fifedyukin.ru%2Fshared%2Fbrowser-logger.js'%3B%0Awindow.document.head.appendChild(browserLoggerScript)%3B%7D)()%3B
```
