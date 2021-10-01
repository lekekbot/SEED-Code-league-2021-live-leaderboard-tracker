"use strict";

var puppeteer = require('puppeteer');

var express = require('express');

var cors = require('cors');

var app = express(); //middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
var browser, page;
var scraper = {
  open: function open(url) {
    return regeneratorRuntime.async(function open$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(puppeteer.launch());

          case 2:
            browser = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(browser.newPage());

          case 5:
            page = _context.sent;
            //headers
            page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
            _context.next = 9;
            return regeneratorRuntime.awrap(page["goto"](url));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  getdata: function getdata() {
    var gay, data, leaderboarddata, i;
    return regeneratorRuntime.async(function getdata$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(page.reload({
              waitUntil: ["networkidle0", "domcontentloaded"]
            }));

          case 2:
            _context2.next = 4;
            return regeneratorRuntime.awrap(page.evaluate(function () {
              return Array.from(document.getElementsByClassName('leaderboard-row'), function (e) {
                return e.innerText;
              });
            }));

          case 4:
            gay = _context2.sent;
            data = [];
            leaderboarddata = {
              rank: [],
              username: [],
              score: [],
              time: []
            }; //split and throw into object arrays

            gay.forEach(function (e) {
              data.push(e.split('\n'));
            });

            for (i = 0; i < data.length; i++) {
              leaderboarddata.rank.push(data[i][0]);
              leaderboarddata.username.push(data[i][2]);
              leaderboarddata.score.push(data[i][4]);
              leaderboarddata.time.push(data[i][6]);
            }

            return _context2.abrupt("return", leaderboarddata);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  stop: function stop() {
    browser.close();
  }
}; // APIs

app.get('/open', function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(scraper.open(req.query.url));

        case 2:
          res.status(200).end();

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.get('/data', function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(scraper.getdata());

        case 2:
          data = _context4.sent;
          return _context4.abrupt("return", res.status(200).send(data));

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.get('/stop', function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(scraper.stop());

        case 2:
          console.log('stopped');
          return _context5.abrupt("return", res.status(200));

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.listen(4000);