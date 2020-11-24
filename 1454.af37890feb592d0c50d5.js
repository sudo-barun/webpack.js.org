(self.webpackChunk=self.webpackChunk||[]).push([[1454],{1454:n=>{n.exports='<p><a href="https://npmjs.com/package/expose-loader"><img src="https://img.shields.io/npm/v/expose-loader.svg" alt="npm"></a> <a href="https://nodejs.org"><img src="https://img.shields.io/node/v/expose-loader.svg" alt="node"></a> <a href="https://david-dm.org/webpack-contrib/expose-loader"><img src="https://david-dm.org/webpack-contrib/expose-loader.svg" alt="deps"></a> <a href="https://github.com/webpack-contrib/expose-loader/actions"><img src="https://github.com/webpack-contrib/expose-loader/workflows/expose-loader/badge.svg" alt="tests"></a> <a href="https://codecov.io/gh/webpack-contrib/expose-loader"><img src="https://codecov.io/gh/webpack-contrib/expose-loader/branch/master/graph/badge.svg" alt="coverage"></a> <a href="https://gitter.im/webpack/webpack"><img src="https://badges.gitter.im/webpack/webpack.svg" alt="chat"></a> <a href="https://packagephobia.now.sh/result?p=expose-loader"><img src="https://packagephobia.now.sh/badge?p=expose-loader" alt="size"></a></p> <p>The <code>expose-loader</code> loader allows to expose a module (in whole or in part) to global object (<code>self</code>, <code>window</code> and <code>global</code>).</p> <p>For further hints on compatibility issues, check out <a href="/guides/shimming/">Shimming</a> of the official docs.</p> <h2 id="getting-started">Getting Started<a href="#getting-started" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h2> <p>To begin, you\'ll need to install <code>expose-loader</code>:</p> <pre><code class="hljs language-console">$ npm install expose-loader --save-dev\n</code></pre> <p>Then you can use the <code>expose-loader</code> using two approaches.</p> <h2 id="inline">Inline<a href="#inline" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h2> <p>The <code>|</code> or <code>%20</code> (space) allow to separate the <code>globalName</code>, <code>moduleLocalName</code> and <code>override</code> of expose. The documentation and syntax examples can be read <a href="#syntax">here</a>.</p> <blockquote> <p>⚠ <code>%20</code> is space in a query string, because you can\'t use spaces in URLs</p> </blockquote> <pre><code class="hljs language-js"><span class="token keyword">import</span> $ <span class="token keyword">from</span> <span class="token string">\'expose-loader?exposes[]=$&#x26;exposes[]=jQuery!jquery\'</span><span class="token punctuation">;</span>\n<span class="token comment">//</span>\n<span class="token comment">// Adds the `jquery` to the global object under the names `$` and `jQuery`</span></code></pre> <pre><code class="hljs language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> concat <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'expose-loader?exposes=_.concat!lodash/concat\'</span><span class="token punctuation">;</span>\n<span class="token comment">//</span>\n<span class="token comment">// Adds the `lodash/concat` to the global object under the name `_.concat`</span></code></pre> <pre><code class="hljs language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span>\n  map<span class="token punctuation">,</span>\n  reduce<span class="token punctuation">,</span>\n<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'expose-loader?exposes[]=_.map|map&#x26;exposes[]=_.reduce|reduce!underscore\'</span><span class="token punctuation">;</span>\n<span class="token comment">//</span>\n<span class="token comment">// Adds the `map` and `reduce` method from `underscore` to the global object under the name `_.map` and `_.reduce`</span></code></pre> <h2 id="using-configuration">Using Configuration<a href="#using-configuration" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h2> <p><strong>src/index.js</strong></p> <pre><code class="hljs language-js"><span class="token keyword">import</span> $ <span class="token keyword">from</span> <span class="token string">\'jquery\'</span><span class="token punctuation">;</span></code></pre> <p><strong>webpack.config.js</strong></p> <pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  module<span class="token operator">:</span> <span class="token punctuation">{</span>\n    rules<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token operator">:</span> require<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">\'jquery\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        loader<span class="token operator">:</span> <span class="token string">\'expose-loader\'</span><span class="token punctuation">,</span>\n        options<span class="token operator">:</span> <span class="token punctuation">{</span>\n          exposes<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">\'$\'</span><span class="token punctuation">,</span> <span class="token string">\'jQuery\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        test<span class="token operator">:</span> require<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">\'underscore\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        loader<span class="token operator">:</span> <span class="token string">\'expose-loader\'</span><span class="token punctuation">,</span>\n        options<span class="token operator">:</span> <span class="token punctuation">{</span>\n          exposes<span class="token operator">:</span> <span class="token punctuation">[</span>\n            <span class="token string">\'_.map|map\'</span><span class="token punctuation">,</span>\n            <span class="token punctuation">{</span>\n              globalName<span class="token operator">:</span> <span class="token string">\'_.reduce\'</span><span class="token punctuation">,</span>\n              moduleLocalName<span class="token operator">:</span> <span class="token string">\'reduce\'</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">{</span>\n              globalName<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">\'_\'</span><span class="token punctuation">,</span> <span class="token string">\'filter\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n              moduleLocalName<span class="token operator">:</span> <span class="token string">\'filter\'</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <p>The <a href="https://nodejs.org/api/modules.html#modules_require_resolve_request_options"><code>require.resolve</code></a> call is a Node.js function (unrelated to <code>require.resolve</code> in webpack processing). <code>require.resolve</code> gives you the absolute path to the module (<code>"/.../app/node_modules/jquery/dist/jquery.js"</code>). So the expose only applies to the <code>jquery</code> module. And it\'s only exposed when used in the bundle.</p> <p>And run <code>webpack</code> via your preferred method.</p> <h2 id="options">Options<a href="#options" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h2> <table> <thead> <tr> <th align="center">Name</th> <th align="center">Type</th> <th align="center">Default</th> <th align="left">Description</th> </tr> </thead> <tbody> <tr> <td align="center"><div class="title"><p>Name</p><p>Type</p><p>Default</p><p>Description</p></div><div class="content"><p><strong><a href="#exposes"><code>exposes</code></a></strong></p><p class="description mobile"><code>{String\\|Object\\|Array&#x3C;String\\|Object>}</code></p><p></p></div></td> <td align="center" class="description desktop"><code>{String\\|Object\\|Array&#x3C;String\\|Object>}</code></td> <td align="center"><code>undefined</code></td> <td align="left">List of exposes</td> </tr> </tbody> </table> <h3 id="exposes"><code>exposes</code><a href="#exposes" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h3> <p>Type: <code>String|Object|Array&#x3C;String|Object></code> Default: <code>undefined</code></p> <p>List of exposes.</p> <h4 id="string"><code>String</code><a href="#string" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h4> <p>Allows to use a string to describe an expose.</p> <h5 id="syntax"><code>Syntax</code><a href="#syntax" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h5> <p>The <code>|</code> or <code>%20</code> (space) allow to separate the <code>globalName</code>, <code>moduleLocalName</code> and <code>override</code> of expose.</p> <p>String syntax - <code>[[globalName] [moduleLocalName] [override]]</code> or <code>[[globalName]|[moduleLocalName]|[override]]</code>, where:</p> <ul> <li><code>globalName</code> - the name in the global object, for example <code>window.$</code> for a browser environment (<strong>required</strong>)</li> <li><code>moduleLocalName</code> - the name of method/variable/etc of the module (the module must export it) (<strong>may be omitted</strong>)</li> <li><code>override</code> - allows to override existing value in the global object (<strong>may be omitted</strong>)</li> </ul> <p>If <code>moduleLocalName</code> is not specified, it exposes the entire module to the global object, otherwise it exposes only the value of <code>moduleLocalName</code>.</p> <p><strong>src/index.js</strong></p> <pre><code class="hljs language-js"><span class="token keyword">import</span> _ <span class="token keyword">from</span> <span class="token string">\'underscore\'</span><span class="token punctuation">;</span></code></pre> <p><strong>webpack.config.js</strong></p> <pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  module<span class="token operator">:</span> <span class="token punctuation">{</span>\n    rules<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token operator">:</span> require<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">\'jquery\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        loader<span class="token operator">:</span> <span class="token string">\'expose-loader\'</span><span class="token punctuation">,</span>\n        options<span class="token operator">:</span> <span class="token punctuation">{</span>\n          <span class="token comment">// For `underscore` library, it can be `_.map map` or `_.map|map`</span>\n          exposes<span class="token operator">:</span> <span class="token string">\'jquery\'</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <h4 id="object"><code>Object</code><a href="#object" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h4> <p>Allows to use an object to describe an expose.</p> <h5 id="globalname"><code>globalName</code><a href="#globalname" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h5> <p>Type: <code>String|Array&#x3C;String></code> Default: <code>undefined</code></p> <p>The name in the global object. (<strong>required</strong>).</p> <p><strong>src/index.js</strong></p> <pre><code class="hljs language-js"><span class="token keyword">import</span> _ <span class="token keyword">from</span> <span class="token string">\'underscore\'</span><span class="token punctuation">;</span></code></pre> <p><strong>webpack.config.js</strong></p> <pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  module<span class="token operator">:</span> <span class="token punctuation">{</span>\n    rules<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token operator">:</span> require<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">\'underscore\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        loader<span class="token operator">:</span> <span class="token string">\'expose-loader\'</span><span class="token punctuation">,</span>\n        options<span class="token operator">:</span> <span class="token punctuation">{</span>\n          exposes<span class="token operator">:</span> <span class="token punctuation">{</span>\n            <span class="token comment">// Can be `[\'_\', \'filter\']`</span>\n            globalName<span class="token operator">:</span> <span class="token string">\'_.filter\'</span><span class="token punctuation">,</span>\n            moduleLocalName<span class="token operator">:</span> <span class="token string">\'filter\'</span><span class="token punctuation">,</span>\n          <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <h5 id="modulelocalname"><code>moduleLocalName</code><a href="#modulelocalname" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h5> <p>Type: <code>String</code> Default: <code>undefined</code></p> <p>The name of method/variable/etc of the module (the module must export it). If <code>moduleLocalName</code> is specified, it exposes only the value of <code>moduleLocalName</code>.</p> <p><strong>src/index.js</strong></p> <pre><code class="hljs language-js"><span class="token keyword">import</span> _ <span class="token keyword">from</span> <span class="token string">\'underscore\'</span><span class="token punctuation">;</span></code></pre> <p><strong>webpack.config.js</strong></p> <pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  module<span class="token operator">:</span> <span class="token punctuation">{</span>\n    rules<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token operator">:</span> require<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">\'underscore\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        loader<span class="token operator">:</span> <span class="token string">\'expose-loader\'</span><span class="token punctuation">,</span>\n        options<span class="token operator">:</span> <span class="token punctuation">{</span>\n          exposes<span class="token operator">:</span> <span class="token punctuation">{</span>\n            globalName<span class="token operator">:</span> <span class="token string">\'_.filter\'</span><span class="token punctuation">,</span>\n            moduleLocalName<span class="token operator">:</span> <span class="token string">\'filter\'</span><span class="token punctuation">,</span>\n          <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <h5 id="override"><code>override</code><a href="#override" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h5> <p>Type: <code>Boolean</code> Default: <code>false</code></p> <p>By default loader does not override the existing value in the global object, because it is unsafe. In <code>development</code> mode, we throw an error if the value already present in the global object. But you can configure loader to override the existing value in the global object using this option.</p> <p>To force override the value that is already present in the global object you can set the <code>override</code> option to the <code>true</code> value.</p> <p><strong>src/index.js</strong></p> <pre><code class="hljs language-js"><span class="token keyword">import</span> $ <span class="token keyword">from</span> <span class="token string">\'jquery\'</span><span class="token punctuation">;</span></code></pre> <p><strong>webpack.config.js</strong></p> <pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  module<span class="token operator">:</span> <span class="token punctuation">{</span>\n    rules<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token operator">:</span> require<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">\'jquery\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        loader<span class="token operator">:</span> <span class="token string">\'expose-loader\'</span><span class="token punctuation">,</span>\n        options<span class="token operator">:</span> <span class="token punctuation">{</span>\n          exposes<span class="token operator">:</span> <span class="token punctuation">{</span>\n            globalName<span class="token operator">:</span> <span class="token string">\'$\'</span><span class="token punctuation">,</span>\n            override<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n          <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <h4 id="array"><code>Array</code><a href="#array" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h4> <p><strong>src/index.js</strong></p> <pre><code class="hljs language-js"><span class="token keyword">import</span> _ <span class="token keyword">from</span> <span class="token string">\'underscore\'</span><span class="token punctuation">;</span></code></pre> <p><strong>webpack.config.js</strong></p> <pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  module<span class="token operator">:</span> <span class="token punctuation">{</span>\n    rules<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token operator">:</span> require<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">\'underscore\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        loader<span class="token operator">:</span> <span class="token string">\'expose-loader\'</span><span class="token punctuation">,</span>\n        options<span class="token operator">:</span> <span class="token punctuation">{</span>\n          exposes<span class="token operator">:</span> <span class="token punctuation">[</span>\n            <span class="token string">\'_.map map\'</span><span class="token punctuation">,</span>\n            <span class="token punctuation">{</span>\n              globalName<span class="token operator">:</span> <span class="token string">\'_.filter\'</span><span class="token punctuation">,</span>\n              moduleLocalName<span class="token operator">:</span> <span class="token string">\'filter\'</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">{</span>\n              globalName<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">\'_\'</span><span class="token punctuation">,</span> <span class="token string">\'find\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n              moduleLocalName<span class="token operator">:</span> <span class="token string">\'myNameForFind\'</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <p>It will expose <strong>only</strong> <code>map</code>, <code>filter</code> and <code>find</code> (under <code>myNameForFind</code> name) methods to the global object.</p> <p>In a browser these methods will be available under <code>windows._.map(..args)</code>, <code>windows._.filter(...args)</code> and <code>windows._.myNameForFind(...args)</code> methods.</p> <h2 id="contributing">Contributing<a href="#contributing" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h2> <p>Please take a moment to read our contributing guidelines if you haven\'t yet done so.</p> <p><a href="https://github.com/webpack-contrib/expose-loader/blob/master/.github/CONTRIBUTING.md">CONTRIBUTING</a></p> <h2 id="license">License<a href="#license" aria-hidden="true" tabindex="-1"><span class="icon icon-link"></span></a></h2> <p><a href="https://github.com/webpack-contrib/expose-loader/blob/master/LICENSE">MIT</a></p> '}}]);