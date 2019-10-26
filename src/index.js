const express = require('express');
const app = express();
const faker = require('faker');
const cmd = require('node-cmd');
const map = new Map();
require('dotenv').config();
app.use(express.static('dist'));
app.get('/', function(req, res) {
  res.sendfile('index.html');
  res.end();
});
app.get('/regme/:id', (req, res) => {
  console.log('route REGME');
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE'
  );
  res.setHeader('Content-Type', 'text/html');
  map.set(req.params.id, 0);
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"/><link rel="icon" href="/favicon.ico"/><meta name="viewport" content="width=device-width,initial-scale=0.86,maximum-scale=3,minimum-scale=0.86"/><meta name="theme-color" content="red"/><meta name="mobile-web-app-capable" content="yes"/><meta name="apple-mobile-web-app-title" content="Application Title"/><meta name="apple-mobile-web-app-capable" content="yes"/><meta name="apple-mobile-web-app-status-bar-style" content="default"/><meta name="msapplication-navbutton-color" content="red"/><meta name="msapplication-TileColor" content="red"/><meta name="msapplication-TileImage" content="ms-icon-144x144.png"/><meta name="msapplication-config" content="browserconfig.xml"/><meta name="application-name" content="Application Name"/><meta name="msapplication-tooltip" content="Tooltip Text"/><meta name="msapplication-starturl" content="/"/><meta name="msapplication-tap-highlight" content="no"/><meta name="full-screen" content="yes"/><meta name="browsermode" content="application"/><meta name="nightmode" content="enable/disable"/><meta name="viewport" content="uc-fitscreen=yes"/><meta name="layoutmode" content="fitscreen/standard"/><meta name="imagemode" content="force"/><meta name="screen-orientation" content="portrait"/><link rel="apple-touch-icon" href="logo192.png"/><link rel="manifest" href="/manifest.json"/><title>Flugegehainem</title><link href="/static/css/main.fca21b11.chunk.css" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div><script>!function(i){function e(e){for(var t,r,n=e[0],o=e[1],u=e[2],l=0,f=[];l<n.length;l++)r=n[l],Object.prototype.hasOwnProperty.call(p,r)&&p[r]&&f.push(p[r][0]),p[r]=0;for(t in o)Object.prototype.hasOwnProperty.call(o,t)&&(i[t]=o[t]);for(s&&s(e);f.length;)f.shift()();return c.push.apply(c,u||[]),a()}function a(){for(var e,t=0;t<c.length;t++){for(var r=c[t],n=!0,o=1;o<r.length;o++){var u=r[o];0!==p[u]&&(n=!1)}n&&(c.splice(t--,1),e=l(l.s=r[0]))}return e}var r={},p={1:0},c=[];function l(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return i[e].call(t.exports,t,t.exports,l),t.l=!0,t.exports}l.m=i,l.c=r,l.d=function(e,t,r){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)l.d(r,n,function(e){return t[e]}.bind(null,n));return r},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/";var t=this.webpackJsonpbutton=this.webpackJsonpbutton||[],n=t.push.bind(t);t.push=e,t=t.slice();for(var o=0;o<t.length;o++)e(t[o]);var s=n;a()}([])</script><script src="/static/js/2.9da3450f.chunk.js"></script><script src="/static/js/main.7ab93945.chunk.js"></script></body></html>
`);
  res.end();
});
app.get('/get/:id', (req, res) => {
  console.log('route GET', req.params.id);
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE'
  );
  map.set(req.params.id, 0);
  res.send({
    status: 0,
    message: {
      count: map.get(req.params.id),
      file: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
      helper: null,
    },
  });
  res.end();
});
app.get('/more/:id', (req, res) => {
  cmd.get(`echo -e -n 'AT+STEP:360\r' > ttyACM1`, function(data) {
    console.log('route MORE', req.params.id);
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE'
    );
    map.set(req.params.id, map.get(req.params.id) + 1);
    res.send({
      status: 0,
      message: {
        count: map.get(req.params.id),
        helper: faker.random.arrayElement([
          'Для тебя нет ничего невозможного если ты действительно этого хочешь',
          'Just do it',
          'Никто кроме нас!',
          'Давай щикатун...',
        ]),
        file:
          map.get(req.params.id) === 5
            ? 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'
            : '',
      },
    });
    res.end();
  });
});
app.listen(3001, function() {
  console.log('Example app listening on port 3001!');
});
