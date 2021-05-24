(self.webpackChunk=self.webpackChunk||[]).push([[2721],{2721:function(n,s,a){"use strict";a.r(s),s.default='<p>As mentioned in <a href="/guides/getting-started/#using-a-configuration">Getting Started</a>, there are multiple ways to define the <code>entry</code> property in your webpack configuration. We will show you the ways you <strong>can</strong> configure the <code>entry</code> property, in addition to explaining why it may be useful to you.</p> <h2 id="single-entry-shorthand-syntax">Single Entry (Shorthand) Syntax<a href="#single-entry-shorthand-syntax" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>Usage: <code>entry: string | [string]</code></p> <p><strong>webpack.config.js</strong></p> <pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  entry<span class="token operator">:</span> <span class="token string">\'./path/to/my/entry/file.js\'</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <p>The single entry syntax for the <code>entry</code> property is a shorthand for:</p> <p><strong>webpack.config.js</strong></p> <pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  entry<span class="token operator">:</span> <span class="token punctuation">{</span>\n    main<span class="token operator">:</span> <span class="token string">\'./path/to/my/entry/file.js\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <p>We can also pass an array of file paths to the <code>entry</code> property which creates what is known as a <strong>"multi-main entry"</strong>. This is useful when you would like to inject multiple dependent files together and graph their dependencies into one "chunk".</p> <p><strong>webpack.config.js</strong></p> <pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  entry<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">\'./src/file_1.js\'</span><span class="token punctuation">,</span> <span class="token string">\'./src/file_2.js\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  output<span class="token operator">:</span> <span class="token punctuation">{</span>\n    filename<span class="token operator">:</span> <span class="token string">\'bundle.js\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <p>Single Entry Syntax is a great choice when you are looking to quickly setup a webpack configuration for an application or tool with one entry point (i.e. a library). However, there is not much flexibility in extending or scaling your configuration with this syntax.</p> <h2 id="object-syntax">Object Syntax<a href="#object-syntax" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>Usage: <code>entry: { &#x3C;entryChunkName> string | [string] } | {}</code></p> <p><strong>webpack.config.js</strong></p> <pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  entry<span class="token operator">:</span> <span class="token punctuation">{</span>\n    app<span class="token operator">:</span> <span class="token string">\'./src/app.js\'</span><span class="token punctuation">,</span>\n    adminApp<span class="token operator">:</span> <span class="token string">\'./src/adminApp.js\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <p>The object syntax is more verbose. However, this is the most scalable way of defining entry/entries in your application.</p> <aside class="tip"><h6 class="tip__prefix">tip</h6><p><strong>"Scalable webpack configurations"</strong> are ones that can be reused and combined with other partial configurations. This is a popular technique used to separate concerns by environment, build target, and runtime. They are then merged using specialized tools like <a href="https://github.com/survivejs/webpack-merge">webpack-merge</a>.</p></aside> <aside class="tip"><h6 class="tip__prefix">tip</h6><p>You can pass empty object <code>{}</code> to <code>entry</code> when you have only entry points generated by plugins.</p></aside> <h3 id="entrydescription-object">EntryDescription object<a href="#entrydescription-object" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h3> <p>An object with entry point description. You can specify the following properties.</p> <ul> <li><code>dependOn</code>: The entry points that the current entry point depends on. They must be loaded before this entry point is loaded.</li> <li><code>filename</code>: Specifies the name of each output file on disk.</li> <li><code>import</code>: Module(s) that are loaded upon startup.</li> <li><code>library</code>: Specify <a href="/configuration/output/#outputlibrary">library options</a> to bundle a library from current entry.</li> <li><code>runtime</code>: The name of the runtime chunk. If set, a runtime chunk with this name is created otherwise an existing entry point is used as runtime.</li> <li><code>publicPath</code>: Specify a public URL address for the output files of this entry when they are referenced in a browser. Also see <a href="/configuration/output/#outputpublicpath">output.publicPath</a>.</li> </ul> <p><strong>webpack.config.js</strong></p> <pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  entry<span class="token operator">:</span> <span class="token punctuation">{</span>\n    a2<span class="token operator">:</span> <span class="token string">\'dependingfile.js\'</span><span class="token punctuation">,</span>\n    b2<span class="token operator">:</span> <span class="token punctuation">{</span>\n      dependOn<span class="token operator">:</span> <span class="token string">\'a2\'</span><span class="token punctuation">,</span>\n      <span class="token keyword">import</span><span class="token operator">:</span> <span class="token string">\'./src/app.js\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <p><code>runtime</code> and <code>dependOn</code> should not be used together on a single entry, so the following config is invalid and would throw an error:</p> <p><strong>webpack.config.js</strong></p> <pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  entry<span class="token operator">:</span> <span class="token punctuation">{</span>\n    a2<span class="token operator">:</span> <span class="token string">\'./a\'</span><span class="token punctuation">,</span>\n    b2<span class="token operator">:</span> <span class="token punctuation">{</span>\n      runtime<span class="token operator">:</span> <span class="token string">\'x2\'</span><span class="token punctuation">,</span>\n      dependOn<span class="token operator">:</span> <span class="token string">\'a2\'</span><span class="token punctuation">,</span>\n      <span class="token keyword">import</span><span class="token operator">:</span> <span class="token string">\'./b\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <p>Make sure <code>runtime</code> must not point to an existing entry point name, for example the below config would throw an error:</p> <pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  entry<span class="token operator">:</span> <span class="token punctuation">{</span>\n    a1<span class="token operator">:</span> <span class="token string">\'./a\'</span><span class="token punctuation">,</span>\n    b1<span class="token operator">:</span> <span class="token punctuation">{</span>\n      runtime<span class="token operator">:</span> <span class="token string">\'a1\'</span><span class="token punctuation">,</span>\n      <span class="token keyword">import</span><span class="token operator">:</span> <span class="token string">\'./b\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <p>Also <code>dependOn</code> must not be circular, the following example again would throw an error:</p> <pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  entry<span class="token operator">:</span> <span class="token punctuation">{</span>\n    a3<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token keyword">import</span><span class="token operator">:</span> <span class="token string">\'./a\'</span><span class="token punctuation">,</span>\n      dependOn<span class="token operator">:</span> <span class="token string">\'b3\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    b3<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token keyword">import</span><span class="token operator">:</span> <span class="token string">\'./b\'</span><span class="token punctuation">,</span>\n      dependOn<span class="token operator">:</span> <span class="token string">\'a3\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <h2 id="scenarios">Scenarios<a href="#scenarios" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>Below is a list of entry configurations and their real-world use cases:</p> <h3 id="separate-app-and-vendor-entries">Separate App and Vendor Entries<a href="#separate-app-and-vendor-entries" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h3> <p><strong>webpack.config.js</strong></p> <pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  entry<span class="token operator">:</span> <span class="token punctuation">{</span>\n    main<span class="token operator">:</span> <span class="token string">\'./src/app.js\'</span><span class="token punctuation">,</span>\n    vendor<span class="token operator">:</span> <span class="token string">\'./src/vendor.js\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <p><strong>webpack.prod.js</strong></p> <pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  output<span class="token operator">:</span> <span class="token punctuation">{</span>\n    filename<span class="token operator">:</span> <span class="token string">\'[name].[contenthash].bundle.js\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <p><strong>webpack.dev.js</strong></p> <pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  output<span class="token operator">:</span> <span class="token punctuation">{</span>\n    filename<span class="token operator">:</span> <span class="token string">\'[name].bundle.js\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <p><strong>What does this do?</strong> We are telling webpack that we would like 2 separate entry points (like the above example).</p> <p><strong>Why?</strong> With this you can import required libraries or files that aren\'t modified (e.g. Bootstrap, jQuery, images, etc) inside <code>vendor.js</code> and they will be bundled together into their own chunk. Content hash remains the same, which allows the browser to cache them separately thereby reducing load time.</p> <aside class="tip"><h6 class="tip__prefix">tip</h6><p>In webpack version &#x3C; 4 it was common to add vendors as a separate entry point to compile it as a separate file (in combination with the <code>CommonsChunkPlugin</code>). <br><br> This is discouraged in webpack 4. Instead, the <a href="/configuration/optimization/#optimizationsplitchunks"><code>optimization.splitChunks</code></a> option takes care of separating vendors and app modules and creating a separate file. <strong>Do not</strong> create an entry for vendors or other stuff that is not the starting point of execution.</p></aside> <h3 id="multi-page-application">Multi Page Application<a href="#multi-page-application" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h3> <p><strong>webpack.config.js</strong></p> <pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  entry<span class="token operator">:</span> <span class="token punctuation">{</span>\n    pageOne<span class="token operator">:</span> <span class="token string">\'./src/pageOne/index.js\'</span><span class="token punctuation">,</span>\n    pageTwo<span class="token operator">:</span> <span class="token string">\'./src/pageTwo/index.js\'</span><span class="token punctuation">,</span>\n    pageThree<span class="token operator">:</span> <span class="token string">\'./src/pageThree/index.js\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <p><strong>What does this do?</strong> We are telling webpack that we would like 3 separate dependency graphs (like the above example).</p> <p><strong>Why?</strong> In a multi-page application, the server is going to fetch a new HTML document for you. The page reloads this new document and assets are redownloaded. However, this gives us the unique opportunity to do things like using <a href="/configuration/optimization/#optimizationsplitchunks"><code>optimization.splitChunks</code></a> to create bundles of shared application code between each page. Multi-page applications that reuse a lot of code/modules between entry points can greatly benefit from these techniques, as the number of entry points increases.</p> <aside class="tip"><h6 class="tip__prefix">tip</h6><p>As a rule of thumb: Use exactly one entry point for each HTML document. See the issue <a href="https://bundlers.tooling.report/code-splitting/multi-entry/#webpack">described here</a> for more details.</p></aside> '}}]);