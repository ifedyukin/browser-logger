'use strict';

(function () {
  const SUPPORTED_METHODS = [
    'log',
    'debug',
    'error',
    'info',
    'warn',
  ];

  const classPrefix = `l${(Math.random() + 1).toString(36).substring(7)}`;
  const prefixedClass = c => `${classPrefix}_${c}`;

  const logsStyles = window.document.createElement('style');
  logsStyles.innerText = `
    #logs-render.${prefixedClass('closed')} {
      display: none;
    }

    #logs-render {
      display: block;
      position: fixed;
      inset: 10%;
      background: #ffffff;
      border: 1px solid #000000;
      overflow: auto;
      font-family: monospace;
      font-size: 18px;
    }

    #logs-render .${prefixedClass('heading')} {
      font-size: 48px;
      margin: 8px;
    }

    #logs-render .${prefixedClass('log-item')} {
      padding: 8px;
      border-bottom: 1px solid #d3e3fe;
    }

    #logs-render .${prefixedClass('log-item')}:last-of-type {
      border-bottom: none;
    }

    #logs-button {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999999999;
      border-radius: 0;
      background: #ffffff;
      color: #000000;
      border: 1px solid #000000;
      cursor: pointer;
    }

    #logs-render .${prefixedClass('log')} { background: #ffffff; }
    #logs-render .${prefixedClass('debug')} { background: #dddddd; }
    #logs-render .${prefixedClass('error')} { background: #fcebeb; }
    #logs-render .${prefixedClass('info')} { background: #d8edff; }
    #logs-render .${prefixedClass('warn')} { background: #fef3dc; }

    #logs-render .${prefixedClass('number')} { color: #1a1aa6; }
    #logs-render .${prefixedClass('boolean')} { color: #1a1aa6; }
    #logs-render .${prefixedClass('empty')} { color: #80868b; }
    #logs-render .${prefixedClass('bigint')} { color: #236e25; }
    #logs-render .${prefixedClass('symbol')} { color: #c80000; }
    #logs-render .${prefixedClass('key')} { color: #5f6368; }
    #logs-render .${prefixedClass('function')} { color: #303943; font-style: italic; }
  `;
  window.document.head.appendChild(logsStyles);

  const logsContainer = window.document.createElement('div');
  logsContainer.id = 'logs-render';
  logsContainer.innerHTML = `<div class="${prefixedClass('heading')}">Logs</div>`;
  window.document.body.appendChild(logsContainer);

  const logsButton = window.document.createElement('button');
  logsButton.id = 'logs-button';
  logsButton.innerText = 'logs';
  logsButton.onclick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    logsContainer.classList.toggle(prefixedClass('closed'));
  };
  window.document.body.appendChild(logsButton);

  const transformToString = (entity, tabs = 1) => {
    const type = typeof entity;

    if (type === 'number') {
      return `<span class="${prefixedClass('number')}">${`${entity}`}</span>`;
    }

    if (type === 'boolean') {
      return `<span class="${prefixedClass('boolean')}">${`${entity}`}</span>`;
    }

    if (type === 'undefined' || type === 'object' && entity === null) {
      return `<span class="${prefixedClass('empty')}">${`${entity}`}</span>`;
    }

    if (type === 'bigint') {
      return `<span class="${prefixedClass('bigint')}">${`${entity}`}</span>`;
    }

    if (type === 'function') {
      return `<span class="${prefixedClass('function')}">${`${entity}`}</span>`;
    }

    if (type === 'symbol') {
      return `<span class="${prefixedClass('symbol')}">${`Symbol(${entity.description})`}</span>`;
    }

    if (Array.isArray(entity)) {
      return `<span>[<br/>${entity.map(e => `${'&nbsp;&nbsp;&nbsp;&nbsp'.repeat(tabs)}${transformToString(e, tabs + 1)}`).join(',<br/>')}<br/>${'&nbsp;&nbsp;&nbsp;&nbsp'.repeat(tabs - 1)}]</span>`;
    }

    if (type === 'object') {
      console.log(tabs)
      return `<span>{<br/>${Object.entries(entity).map(([key, value]) => `${'&nbsp;&nbsp;&nbsp;&nbsp'.repeat(tabs)}<span class="${prefixedClass('key')}">${key}</span>: ${transformToString(value, tabs + 1)}`).join(',<br/>')}<br/>${'&nbsp;&nbsp;&nbsp;&nbsp'.repeat(tabs - 1)}}</span>`;
    }

    return `${entity}`;
  };

  const renderLogItem = (method, ...args) => {
    const logItem = window.document.createElement('div');
    logItem.classList.add(prefixedClass(method));
    logItem.classList.add(prefixedClass('log-item'));
    logItem.innerHTML = [`[${method}]`].concat(args.map(e => transformToString(e))).join('<br/>');
    logsContainer.appendChild(logItem);
  };

  SUPPORTED_METHODS.forEach(method => {
    const original = window.console[method];
    window.console[method] = (...args) => {
      renderLogItem(method, ...args);
      original(...args);
    };
  });
})();
