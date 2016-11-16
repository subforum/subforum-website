(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("src/actions/index.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.case1 = case1;
var CASE_1 = exports.CASE_1 = 'CASE_1';

function case1(id) {
    return {
        type: CASE_1, id: id
    };
}
});

;require.register("src/components/App.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _redux = require('redux');

var _redux2 = _interopRequireDefault(_redux);

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _sagas = require('../sagas/sagas.jsx');

var _sagas2 = _interopRequireDefault(_sagas);

var _index = require('../reducers/index.jsx');

var _index2 = _interopRequireDefault(_index);

var _Shell = require('./Shell.jsx');

var _Shell2 = _interopRequireDefault(_Shell);

var _Home = require('../containers/Home.jsx');

var _Home2 = _interopRequireDefault(_Home);

var _Home3 = require('./Home.jsx');

var _Home4 = _interopRequireDefault(_Home3);

var _TopicsList = require('../containers/TopicsList.jsx');

var _TopicsList2 = _interopRequireDefault(_TopicsList);

var _TopicsList3 = require('./TopicsList.jsx');

var _TopicsList4 = _interopRequireDefault(_TopicsList3);

var _Topic = require('../containers/Topic.jsx');

var _Topic2 = _interopRequireDefault(_Topic);

var _Topic3 = require('./Topic.jsx');

var _Topic4 = _interopRequireDefault(_Topic3);

var _Project = require('../containers/Project.jsx');

var _Project2 = _interopRequireDefault(_Project);

var _Project3 = require('./Project.jsx');

var _Project4 = _interopRequireDefault(_Project3);

var _Article = require('../containers/Article.jsx');

var _Article2 = _interopRequireDefault(_Article);

var _Article3 = require('./Article.jsx');

var _Article4 = _interopRequireDefault(_Article3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Redux


// Containers


// Create saga
var sagaMiddleware = (0, _reduxSaga2.default)();

// initialState 
var store = (0, _redux.createStore)(_index2.default, initialState, (0, _redux.applyMiddleware)(sagaMiddleware));

// Create an enhanced history that syncs navigation events with the store
var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);

sagaMiddleware.run(_sagas2.default);

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _reactRedux.Provider,
                { store: store },
                _react2.default.createElement(_Home4.default, null)
            );
        }
    }]);

    return App;
}(_react2.default.Component);

(0, _reactDom.render)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
        _reactRouter.Router,
        { history: history },
        _react2.default.createElement(
            _reactRouter.Route,
            { path: '/' },
            _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/home', component: _Home2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/topics/', component: _TopicsList2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/topic/:id', component: _Topic2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/topic/:id/project/:id', component: _Project2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/topic/:id/project/:id/article/:id', component: _Article2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/team/:id', component: _Topic2.default })
        )
    )
), document.getElementById('app'));
});

require.register("src/components/Article.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Shell = require('./Shell.jsx');

var _Shell2 = _interopRequireDefault(_Shell);

var _reactRemarkable = require('react-remarkable');

var _reactRemarkable2 = _interopRequireDefault(_reactRemarkable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Article = function (_React$Component) {
    _inherits(Article, _React$Component);

    function Article(props) {
        _classCallCheck(this, Article);

        return _possibleConstructorReturn(this, (Article.__proto__ || Object.getPrototypeOf(Article)).call(this, props));
    }

    _createClass(Article, [{
        key: 'render',
        value: function render() {
            var article = this.props.subforum_data;
            var options = {
                xhtmlOut: true,
                breaks: true,
                linkify: true
            };

            return _react2.default.createElement(
                _Shell2.default,
                null,
                _react2.default.createElement(
                    'header',
                    { className: 'Topic-heading' },
                    _react2.default.createElement(
                        'div',
                        { className: 'Grid Grid--gutterHorizontal' },
                        _react2.default.createElement(
                            'div',
                            { className: 'Grid-item' },
                            _react2.default.createElement(
                                'h1',
                                { className: 'Topic-title' },
                                article.name
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'Grid-item Grid-item--autoSize u-textRight' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'Topic-status' },
                                'Authors'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'Topic-status-text' },
                                article.authors
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'Topic-body' },
                    _react2.default.createElement(
                        'p',
                        { className: 'u-muted u-fontWeightBold' },
                        article.edit_date
                    ),
                    _react2.default.createElement(_reactRemarkable2.default, { source: article.content, options: options })
                )
            );
        }
    }]);

    return Article;
}(_react2.default.Component);

exports.default = Article;
});

require.register("src/components/Home.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Shell = require('./Shell.jsx');

var _Shell2 = _interopRequireDefault(_Shell);

var _reactRemarkable = require('react-remarkable');

var _reactRemarkable2 = _interopRequireDefault(_reactRemarkable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
    _inherits(Home, _React$Component);

    function Home(props) {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));
    }

    _createClass(Home, [{
        key: 'render',
        value: function render() {
            var topics = this.props.subforum_data;
            console.log(topics);

            return _react2.default.createElement(
                _Shell2.default,
                null,
                _react2.default.createElement(
                    'div',
                    { id: 'Main' },
                    _react2.default.createElement(
                        'h1',
                        null,
                        'Welcome!'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                            'a',
                            { href: '/topics/' },
                            'See all topics'
                        )
                    )
                )
            );
        }
    }]);

    return Home;
}(_react2.default.Component);

exports.default = Home;
});

require.register("src/components/Project.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Shell = require('./Shell.jsx');

var _Shell2 = _interopRequireDefault(_Shell);

var _reactRemarkable = require('react-remarkable');

var _reactRemarkable2 = _interopRequireDefault(_reactRemarkable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Article = function (_React$Component) {
    _inherits(Article, _React$Component);

    function Article() {
        _classCallCheck(this, Article);

        return _possibleConstructorReturn(this, (Article.__proto__ || Object.getPrototypeOf(Article)).apply(this, arguments));
    }

    _createClass(Article, [{
        key: 'render',
        value: function render() {
            var article = this.props.article;
            var link = '/topic/' + this.props.topic_id + '/project/' + this.props.project_id + '/article/' + article.id + '/';

            return _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                        'a',
                        { href: link },
                        article.name
                    )
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    article.authors
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    article.edit_date
                )
            );
        }
    }]);

    return Article;
}(_react2.default.Component);

var Project = function (_React$Component2) {
    _inherits(Project, _React$Component2);

    function Project(props) {
        _classCallCheck(this, Project);

        return _possibleConstructorReturn(this, (Project.__proto__ || Object.getPrototypeOf(Project)).call(this, props));
    }

    _createClass(Project, [{
        key: 'render',
        value: function render() {
            var project = this.props.subforum_data;
            var topic_id = this.props.params.id[0];
            var project_id = project.id;

            return _react2.default.createElement(
                _Shell2.default,
                null,
                _react2.default.createElement(
                    'header',
                    { className: 'Topic-heading' },
                    _react2.default.createElement(
                        'div',
                        { className: 'Grid Grid--gutterHorizontal' },
                        _react2.default.createElement(
                            'div',
                            { className: 'Grid-item' },
                            _react2.default.createElement(
                                'h1',
                                { className: 'Topic-title' },
                                project.name
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'Grid-item Grid-item--autoSize u-textRight' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'Topic-status' },
                                'Leads'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'Topic-status-text' },
                                project.contributors
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'Topic-body' },
                    _react2.default.createElement(
                        'p',
                        null,
                        project.description
                    ),
                    _react2.default.createElement(
                        'table',
                        { className: 'Table Table--dividers' },
                        _react2.default.createElement(
                            'thead',
                            { className: 'Table-head' },
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Title'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Authors'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Updated'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            project.articles.map(function (article) {
                                return _react2.default.createElement(Article, { key: article.id, article: article, topic_id: topic_id, project_id: project_id });
                            })
                        )
                    )
                )
            );
        }
    }]);

    return Project;
}(_react2.default.Component);

exports.default = Project;
});

require.register("src/components/Shell.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shell = function (_React$Component) {
    _inherits(Shell, _React$Component);

    function Shell(props) {
        _classCallCheck(this, Shell);

        return _possibleConstructorReturn(this, (Shell.__proto__ || Object.getPrototypeOf(Shell)).call(this, props));
    }

    _createClass(Shell, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'Shell' },
                _react2.default.createElement(
                    'header',
                    { className: 'Shell-heading' },
                    _react2.default.createElement('img', { src: '/static/images/logo-subforum.png', alt: 'Subforum Design Group', className: 'Shell-logo' }),
                    _react2.default.createElement(
                        'nav',
                        { className: 'Shell-navigation' },
                        _react2.default.createElement(
                            'span',
                            { className: 'Shell-navigation-item Shell-navigation-item--label' },
                            'Research'
                        ),
                        _react2.default.createElement(
                            'a',
                            { href: '/topics/', className: 'Shell-navigation-item' },
                            'Topics'
                        ),
                        _react2.default.createElement(
                            'a',
                            { href: '#', className: 'Shell-navigation-item' },
                            'Projects'
                        ),
                        _react2.default.createElement(
                            'a',
                            { href: '/', className: 'Shell-navigation-item' },
                            'Articles'
                        ),
                        _react2.default.createElement(
                            'a',
                            { href: '#', className: 'Shell-navigation-item' },
                            'Team'
                        )
                    )
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'Shell-main' },
                    this.props.children
                ),
                _react2.default.createElement(
                    'footer',
                    { className: 'Shell-footer' },
                    _react2.default.createElement(
                        'nav',
                        { className: 'Shell-navigation Shell-navigation--footer' },
                        _react2.default.createElement(
                            'span',
                            { className: 'Shell-navigation-item Shell-navigation-item--label' },
                            '\xA92012 \u2013 2016 Subforum'
                        ),
                        _react2.default.createElement(
                            'a',
                            { href: '/', className: 'Shell-navigation-item' },
                            'Contact'
                        ),
                        _react2.default.createElement(
                            'a',
                            { href: '#', className: 'Shell-navigation-item' },
                            'About Us'
                        )
                    ),
                    _react2.default.createElement(
                        'a',
                        { href: 'https://twitter.com/subforum/', target: '_blank', className: 'Button u-marginBottomHalf' },
                        'Follow @subforum'
                    )
                )
            );
        }
    }]);

    return Shell;
}(_react2.default.Component);

exports.default = Shell;
});

require.register("src/components/Topic.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Shell = require('./Shell.jsx');

var _Shell2 = _interopRequireDefault(_Shell);

var _reactRemarkable = require('react-remarkable');

var _reactRemarkable2 = _interopRequireDefault(_reactRemarkable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Project = function (_React$Component) {
    _inherits(Project, _React$Component);

    function Project() {
        _classCallCheck(this, Project);

        return _possibleConstructorReturn(this, (Project.__proto__ || Object.getPrototypeOf(Project)).apply(this, arguments));
    }

    _createClass(Project, [{
        key: 'render',
        value: function render() {
            var project = this.props.project;
            var link = '/topic/' + this.props.topicId + '/project/' + project.id + '/';

            return _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                        'a',
                        { href: link },
                        project.name
                    )
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    project.contributors
                ),
                _react2.default.createElement(
                    'td',
                    { className: 'u-textRight' },
                    project.edit_date
                )
            );
        }
    }]);

    return Project;
}(_react2.default.Component);

var Article = function (_React$Component2) {
    _inherits(Article, _React$Component2);

    function Article() {
        _classCallCheck(this, Article);

        return _possibleConstructorReturn(this, (Article.__proto__ || Object.getPrototypeOf(Article)).apply(this, arguments));
    }

    _createClass(Article, [{
        key: 'render',
        value: function render() {
            var article = this.props.article;
            var projectLink = '/topic/' + this.props.topicId + '/project/' + article.project_id + '/';
            var articleLink = '/topic/' + this.props.topicId + '/project/' + article.project_id + '/article/' + article.id + '/';

            return _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                        'a',
                        { href: articleLink },
                        article.name
                    )
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                        'a',
                        { href: projectLink },
                        article.project_name
                    )
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    article.authors
                ),
                _react2.default.createElement(
                    'td',
                    { className: 'u-textRight' },
                    article.edit_date
                )
            );
        }
    }]);

    return Article;
}(_react2.default.Component);

var Topic = function (_React$Component3) {
    _inherits(Topic, _React$Component3);

    function Topic(props) {
        _classCallCheck(this, Topic);

        return _possibleConstructorReturn(this, (Topic.__proto__ || Object.getPrototypeOf(Topic)).call(this, props));
    }

    _createClass(Topic, [{
        key: 'render',
        value: function render() {
            var id = this.props.routeParams.id - 1;
            var topic = this.props.subforum_data[id];
            var projectCount = topic.projects.length;
            var articleCount = topic.articles.length;
            var options = {
                xhtmlOut: true,
                breaks: true,
                linkify: true
            };
            var columnWidth = 200;

            var imgSrc = '';
            if (topic.image) {
                var src = "/static/" + topic.image;
                imgSrc = _react2.default.createElement(
                    'div',
                    { className: 'Grid-item Grid-item--autoSize' },
                    _react2.default.createElement('img', { src: src, className: 'Topic-image', alt: '' })
                );
            }

            return _react2.default.createElement(
                _Shell2.default,
                null,
                _react2.default.createElement(
                    'header',
                    { className: 'Topic-heading' },
                    _react2.default.createElement(
                        'div',
                        { className: 'Grid Grid--gutterHorizontal' },
                        _react2.default.createElement(
                            'div',
                            { className: 'Grid-item' },
                            _react2.default.createElement(
                                'h1',
                                { className: 'Topic-title' },
                                topic.name
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'Grid-item Grid-item--autoSize u-textRight' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'Topic-status' },
                                'Status'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'Topic-status-text' },
                                topic.status
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'Grid-item Grid-item--autoSize u-textRight' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'Topic-status' },
                                'Projects'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'Topic-status-text' },
                                projectCount
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'Grid-item Grid-item--autoSize u-textRight' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'Topic-status' },
                                'Articles'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'Topic-status-text' },
                                articleCount
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'Topic-body' },
                    _react2.default.createElement(
                        'div',
                        { className: 'Grid Grid--full b2-Grid--fit Grid--gutterHorizontal u-marginBottom' },
                        imgSrc,
                        _react2.default.createElement(
                            'div',
                            { className: 'Grid-item' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'u-subheadText u-paddingTop b2-u-paddingFlush' },
                                'About this Topic'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'u-fontWeightLight' },
                                _react2.default.createElement(_reactRemarkable2.default, { source: topic.description, options: options })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'h2',
                        { className: 'Topic-statusHeading' },
                        'Projects'
                    ),
                    _react2.default.createElement(
                        'table',
                        { className: 'Table Table--dividers u-marginBottomOneAndHalf' },
                        _react2.default.createElement(
                            'thead',
                            { className: 'Table-head' },
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'th',
                                    { style: { width: columnWidth + 'px' } },
                                    'Name'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Leads'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: 'u-textRight' },
                                    'Updated'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            topic.projects.map(function (project) {
                                return _react2.default.createElement(Project, { key: project.id, project: project, topicId: topic.id });
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'h2',
                        { className: 'Topic-statusHeading' },
                        'Articles'
                    ),
                    _react2.default.createElement(
                        'table',
                        { className: 'Table Table--dividers' },
                        _react2.default.createElement(
                            'thead',
                            { className: 'Table-head' },
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'th',
                                    { style: { width: columnWidth + 'px' } },
                                    'Name'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Project'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Authors'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: 'u-textRight' },
                                    'Published'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            topic.articles.map(function (article) {
                                return _react2.default.createElement(Article, { key: article.id, article: article, topicId: topic.id });
                            })
                        )
                    )
                )
            );
        }
    }]);

    return Topic;
}(_react2.default.Component);

exports.default = Topic;
});

require.register("src/components/TopicsList.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Shell = require('./Shell.jsx');

var _Shell2 = _interopRequireDefault(_Shell);

var _reactRemarkable = require('react-remarkable');

var _reactRemarkable2 = _interopRequireDefault(_reactRemarkable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Topic = function (_React$Component) {
    _inherits(Topic, _React$Component);

    function Topic() {
        _classCallCheck(this, Topic);

        return _possibleConstructorReturn(this, (Topic.__proto__ || Object.getPrototypeOf(Topic)).apply(this, arguments));
    }

    _createClass(Topic, [{
        key: 'render',
        value: function render() {
            var topic = this.props.topic;
            var link = '/topic/' + topic.id + '/';
            var options = {
                xhtmlOut: true,
                breaks: true,
                linkify: true
            };

            return _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                        'a',
                        { href: link },
                        topic.name
                    )
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(_reactRemarkable2.default, { source: topic.description, options: options })
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    topic.status
                )
            );
        }
    }]);

    return Topic;
}(_react2.default.Component);

var TopicsList = function (_React$Component2) {
    _inherits(TopicsList, _React$Component2);

    function TopicsList(props) {
        _classCallCheck(this, TopicsList);

        return _possibleConstructorReturn(this, (TopicsList.__proto__ || Object.getPrototypeOf(TopicsList)).call(this, props));
    }

    _createClass(TopicsList, [{
        key: 'render',
        value: function render() {
            var topics = this.props.subforum_data;
            var columnWidth = 150;

            console.log(this.props);

            return _react2.default.createElement(
                _Shell2.default,
                null,
                _react2.default.createElement(
                    'header',
                    { className: 'Topic-heading' },
                    _react2.default.createElement(
                        'div',
                        { className: 'Grid Grid--gutterHorizontal' },
                        _react2.default.createElement(
                            'div',
                            { className: 'Grid-item' },
                            _react2.default.createElement(
                                'h1',
                                { className: 'Topic-title' },
                                'Topics'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'Topic-body' },
                    _react2.default.createElement(
                        'table',
                        { className: 'Table Table--dividers' },
                        _react2.default.createElement(
                            'thead',
                            { className: 'Table-head' },
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'th',
                                    { style: { width: columnWidth + 'px' } },
                                    'Name'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Description'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Status'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            topics.map(function (topic) {
                                return _react2.default.createElement(Topic, { key: topic.id, topic: topic });
                            })
                        )
                    )
                )
            );
        }
    }]);

    return TopicsList;
}(_react2.default.Component);

exports.default = TopicsList;
});

require.register("src/containers/Article.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _index = require('../actions/index.jsx');

var _Article = require('../components/Article.jsx');

var _Article2 = _interopRequireDefault(_Article);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getData = function getData(subforum_data, ownProps) {
  var topic_id = ownProps.params.id[0] - 1;
  var article_id = ownProps.params.id[2];

  var articles = subforum_data[topic_id].articles;
  var article = void 0;
  for (var i = 0; i < articles.length; i++) {
    if (articles[i].id === Number(article_id)) {
      article = articles[i];
    }
  }

  return article;
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    subforum_data: getData(state.subforum_data, ownProps)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    // onFormatDate: (date) => {
    //   dispatch(formatDate(date))
    // }
  };
};

var ShowArticle = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Article2.default);

exports.default = ShowArticle;
});

;require.register("src/containers/Home.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _index = require('../actions/index.jsx');

var _Home = require('../components/Home.jsx');

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getData = function getData(subforum_data) {
  return subforum_data;
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    subforum_data: getData(state.subforum_data)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    // onFormatDate: (date) => {
    //   dispatch(formatDate(date))
    // }
  };
};

var ShowHome = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Home2.default);

exports.default = ShowHome;
});

;require.register("src/containers/Project.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _index = require('../actions/index.jsx');

var _Project = require('../components/Project.jsx');

var _Project2 = _interopRequireDefault(_Project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getData = function getData(subforum_data, ownProps) {
  var topic_id = ownProps.params.id[0] - 1;
  var project_id = ownProps.params.id[1];
  var projects = subforum_data[topic_id].projects;
  var project = void 0;
  for (var i = 0; i < projects.length; i++) {
    if (projects[i].id === Number(project_id)) {
      project = projects[i];
    }
  }

  return project;
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    subforum_data: getData(state.subforum_data, ownProps)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    // onFormatDate: (date) => {
    //   dispatch(formatDate(date))
    // }
  };
};

var ShowProject = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Project2.default);

exports.default = ShowProject;
});

;require.register("src/containers/Topic.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _index = require('../actions/index.jsx');

var _Topic = require('../components/Topic.jsx');

var _Topic2 = _interopRequireDefault(_Topic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getData = function getData(subforum_data) {
  return subforum_data;
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    subforum_data: getData(state.subforum_data)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    // onFormatDate: (date) => {
    //   dispatch(formatDate(date))
    // }
  };
};

var ShowTopic = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Topic2.default);

exports.default = ShowTopic;
});

;require.register("src/containers/TopicsList.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _index = require('../actions/index.jsx');

var _TopicsList = require('../components/TopicsList.jsx');

var _TopicsList2 = _interopRequireDefault(_TopicsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getData = function getData(subforum_data) {
  return subforum_data;
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    subforum_data: getData(state.subforum_data)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    // onFormatDate: (date) => {
    //   dispatch(formatDate(date))
    // }
  };
};

var ShowTopicsList = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_TopicsList2.default);

exports.default = ShowTopicsList;
});

;require.register("src/initialize.js", function(exports, require, module) {
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
});

require.register("src/reducers/index.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _index = require('../actions/index.jsx');

function subforum_data() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _index.CASE_1:
            return state;

        default:
            return state;
    }
}

var ReducerApp = (0, _redux.combineReducers)({
    subforum_data: subforum_data,
    routing: _reactRouterRedux.routerReducer
});

exports.default = ReducerApp;
});

;require.register("src/sagas/sagas.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.doSomething = doSomething;
exports.watchSomething = watchSomething;
exports.default = rootSaga;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _marked = [doSomething, watchSomething, rootSaga].map(regeneratorRuntime.mark);

// Send invitation
function doSomething() {
    return regeneratorRuntime.wrap(function doSomething$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked[0], this);
}

// Our watcher Sagas
function watchSomething() {
    return regeneratorRuntime.wrap(function watchSomething$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    return _context2.delegateYield((0, _reduxSaga.takeEvery)('DO_SOMETHING', doSomething), 't0', 1);

                case 1:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked[1], this);
}

// single entry point to start all Sagas at once
function rootSaga() {
    return regeneratorRuntime.wrap(function rootSaga$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.next = 2;
                    return [watchSomething()];

                case 2:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _marked[2], this);
}
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map