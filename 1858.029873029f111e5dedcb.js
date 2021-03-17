(self.webpackChunk=self.webpackChunk||[]).push([[1858],{1858:function(n,a,s){"use strict";s.r(a),a.default='<p>Plugins expose the full potential of the webpack engine to third-party developers. Using staged build callbacks, developers can introduce their own behaviors into the webpack build process. Building plugins is a bit more advanced than building loaders, because you\'ll need to understand some of the webpack low-level internals to hook into them. Be prepared to read some source code!</p> <h2 id="creating-a-plugin">Creating a Plugin<a href="#creating-a-plugin" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>A plugin for webpack consists of:</p> <ul> <li>A named JavaScript function or a JavaScript class.</li> <li>Defines <code>apply</code> method in its prototype.</li> <li>Specifies an <a href="/api/compiler-hooks/">event hook</a> to tap into.</li> <li>Manipulates webpack internal instance specific data.</li> <li>Invokes webpack provided callback after functionality is complete.</li> </ul> <pre><code class="hljs language-javascript"><span class="token comment">// A JavaScript class.</span>\n<span class="token keyword">class</span> <span class="token class-name">MyExampleWebpackPlugin</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Define `apply` as its prototype method which is supplied with compiler as its argument</span>\n  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// Specify the event hook to attach to</span>\n    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>emit<span class="token punctuation">.</span><span class="token function">tapAsync</span><span class="token punctuation">(</span>\n      <span class="token string">\'MyExampleWebpackPlugin\'</span><span class="token punctuation">,</span>\n      <span class="token punctuation">(</span><span class="token parameter">compilation<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'This is an example plugin!\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>\n          <span class="token string">\'Here’s the `compilation` object which represents a single build of assets:\'</span><span class="token punctuation">,</span>\n          compilation\n        <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// Manipulate the build using the plugin API provided by webpack</span>\n        compilation<span class="token punctuation">.</span><span class="token function">addModule</span><span class="token punctuation">(</span><span class="token comment">/* ... */</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre> <h2 id="basic-plugin-architecture">Basic plugin architecture<a href="#basic-plugin-architecture" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>Plugins are instantiated objects with an <code>apply</code> method on their prototype. This <code>apply</code> method is called once by the webpack compiler while installing the plugin. The <code>apply</code> method is given a reference to the underlying webpack compiler, which grants access to compiler callbacks. A simple plugin is structured as follows:</p> <pre><code class="hljs language-javascript"><span class="token keyword">class</span> <span class="token class-name">HelloWorldPlugin</span> <span class="token punctuation">{</span>\n  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>done<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token string">\'Hello World Plugin\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>\n      stats <span class="token comment">/* stats is passed as an argument when done hook is tapped.  */</span>\n    <span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Hello World!\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> HelloWorldPlugin<span class="token punctuation">;</span></code></pre> <p>Then to use the plugin, include an instance in your webpack configuration <code>plugins</code> array:</p> <pre><code class="hljs language-javascript"><span class="token comment">// webpack.config.js</span>\n<span class="token keyword">var</span> HelloWorldPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'hello-world\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">// ... configuration settings here ...</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">HelloWorldPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span> options<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <p>Use <a href="https://github.com/webpack/schema-utils"><code>schema-utils</code></a> in order to validate the options being passed through the plugin options. Here is an example:</p> <pre><code class="hljs language-javascript"><span class="token keyword">import</span> <span class="token punctuation">{</span> validate <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'schema-utils\'</span><span class="token punctuation">;</span>\n\n<span class="token comment">// schema for options object</span>\n<span class="token keyword">const</span> schema <span class="token operator">=</span> <span class="token punctuation">{</span>\n  type<span class="token operator">:</span> <span class="token string">\'object\'</span><span class="token punctuation">,</span>\n  properties<span class="token operator">:</span> <span class="token punctuation">{</span>\n    test<span class="token operator">:</span> <span class="token punctuation">{</span>\n      type<span class="token operator">:</span> <span class="token string">\'string\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorldPlugin</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">validate</span><span class="token punctuation">(</span>schema<span class="token punctuation">,</span> options<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n      name<span class="token operator">:</span> <span class="token string">\'Hello World Plugin\'</span><span class="token punctuation">,</span>\n      baseDataPath<span class="token operator">:</span> <span class="token string">\'options\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre> <h2 id="compiler-and-compilation">Compiler and Compilation<a href="#compiler-and-compilation" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>Among the two most important resources while developing plugins are the <a href="/api/node/#compiler-instance"><code>compiler</code></a> and <a href="/api/compilation-hooks/"><code>compilation</code></a> objects. Understanding their roles is an important first step in extending the webpack engine.</p> <pre><code class="hljs language-javascript"><span class="token keyword">class</span> <span class="token class-name">HelloCompilationPlugin</span> <span class="token punctuation">{</span>\n  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// Tap into compilation hook which gives compilation as argument to the callback function</span>\n    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>compilation<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token string">\'HelloCompilationPlugin\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">compilation</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token comment">// Now we can tap into various hooks available through compilation</span>\n      compilation<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>optimize<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token string">\'HelloCompilationPlugin\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Assets are being optimized.\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> HelloCompilationPlugin<span class="token punctuation">;</span></code></pre> <p>The list of hooks available on the <code>compiler</code>, <code>compilation</code>, and other important objects, see the <a href="/api/plugins/">plugins API</a> docs.</p> <h2 id="async-event-hooks">Async event hooks<a href="#async-event-hooks" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>Some plugin hooks are asynchronous. To tap into them, we can use <code>tap</code> method which will behave in synchronous manner or use one of <code>tapAsync</code> method or <code>tapPromise</code> method which are asynchronous methods.</p> <h3 id="tapasync">tapAsync<a href="#tapasync" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h3> <p>When we use <code>tapAsync</code> method to tap into plugins, we need to call the callback function which is supplied as the last argument to our function.</p> <pre><code class="hljs language-javascript"><span class="token keyword">class</span> <span class="token class-name">HelloAsyncPlugin</span> <span class="token punctuation">{</span>\n  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>emit<span class="token punctuation">.</span><span class="token function">tapAsync</span><span class="token punctuation">(</span>\n      <span class="token string">\'HelloAsyncPlugin\'</span><span class="token punctuation">,</span>\n      <span class="token punctuation">(</span><span class="token parameter">compilation<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token comment">// Do something async...</span>\n        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Done with async work...\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> HelloAsyncPlugin<span class="token punctuation">;</span></code></pre> <h4 id="tappromise">tapPromise<a href="#tappromise" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h4> <p>When we use <code>tapPromise</code> method to tap into plugins, we need to return a promise which resolves when our asynchronous task is completed.</p> <pre><code class="hljs language-javascript"><span class="token keyword">class</span> <span class="token class-name">HelloAsyncPlugin</span> <span class="token punctuation">{</span>\n  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>emit<span class="token punctuation">.</span><span class="token function">tapPromise</span><span class="token punctuation">(</span><span class="token string">\'HelloAsyncPlugin\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">compilation</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token comment">// return a Promise that resolves when we are done...</span>\n      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Done with async work...\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> HelloAsyncPlugin<span class="token punctuation">;</span></code></pre> <h2 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>Once we can latch onto the webpack compiler and each individual compilations, the possibilities become endless for what we can do with the engine itself. We can reformat existing files, create derivative files, or fabricate entirely new assets.</p> <p>Let\'s write a simple example plugin that generates a new build file called <code>filelist.md</code>; the contents of which will list all of the asset files in our build. This plugin might look something like this:</p> <pre><code class="hljs language-javascript"><span class="token keyword">class</span> <span class="token class-name">FileListPlugin</span> <span class="token punctuation">{</span>\n  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well</span>\n    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>emit<span class="token punctuation">.</span><span class="token function">tapAsync</span><span class="token punctuation">(</span><span class="token string">\'FileListPlugin\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">compilation<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token comment">// Create a header string for the generated file:</span>\n      <span class="token keyword">var</span> filelist <span class="token operator">=</span> <span class="token string">\'In this build:\\n\\n\'</span><span class="token punctuation">;</span>\n\n      <span class="token comment">// Loop through all compiled assets,</span>\n      <span class="token comment">// adding a new line item for each filename.</span>\n      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> filename <span class="token keyword">in</span> compilation<span class="token punctuation">.</span>assets<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        filelist <span class="token operator">+=</span> <span class="token string">\'- \'</span> <span class="token operator">+</span> filename <span class="token operator">+</span> <span class="token string">\'\\n\'</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n\n      <span class="token comment">// Insert this list into the webpack build as a new file asset:</span>\n      compilation<span class="token punctuation">.</span>assets<span class="token punctuation">[</span><span class="token string">\'filelist.md\'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n        <span class="token function-variable function">source</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token keyword">return</span> filelist<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token function-variable function">size</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token keyword">return</span> filelist<span class="token punctuation">.</span>length<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n      <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> FileListPlugin<span class="token punctuation">;</span></code></pre> <h2 id="different-plugin-shapes">Different Plugin Shapes<a href="#different-plugin-shapes" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>A plugin can be classified into types based on the event hooks it taps into. Every event hook is pre-defined as synchronous or asynchronous or waterfall or parallel hook and hook is called internally using call/callAsync method. The list of hooks that are supported or can be tapped into are generally specified in <code>this.hooks</code> property.</p> <p>For example:</p> <pre><code class="hljs language-javascript"><span class="token keyword">this</span><span class="token punctuation">.</span>hooks <span class="token operator">=</span> <span class="token punctuation">{</span>\n  shouldEmit<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">SyncBailHook</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'compilation\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <p>It represents that the only hook supported is <code>shouldEmit</code> which is a hook of <code>SyncBailHook</code> type and the only parameter which will be passed to any plugin that taps into <code>shouldEmit</code> hook is <code>compilation</code>.</p> <p>Various types of hooks supported are :</p> <h3 id="synchronous-hooks">Synchronous Hooks<a href="#synchronous-hooks" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h3> <ul> <li> <p><strong>SyncHook</strong></p> <ul> <li>Defined as <code>new SyncHook([params])</code></li> <li>Tapped into using <code>tap</code> method.</li> <li>Called using <code>call(...params)</code> method.</li> </ul> </li> <li> <p><strong>Bail Hooks</strong></p> <ul> <li>Defined using <code>SyncBailHook[params]</code></li> <li>Tapped into using <code>tap</code> method.</li> <li>Called using <code>call(...params)</code> method.</li> </ul> <p>In these type of hooks, each of the plugin callbacks will be invoked one after the other with the specific <code>args</code>. If any value is returned except undefined by any plugin, then that value is returned by hook and no further plugin callback is invoked. Many useful events like <code>optimizeChunks</code>, <code>optimizeChunkModules</code> are SyncBailHooks.</p> </li> <li> <p><strong>Waterfall Hooks</strong></p> <ul> <li>Defined using <code>SyncWaterfallHook[params]</code></li> <li>Tapped into using <code>tap</code> method.</li> <li>Called using <code>call(...params)</code> method</li> </ul> <p>Here each of the plugins are called one after the other with the arguments from the return value of the previous plugin. The plugin must take the order of its execution into account. It must accept arguments from the previous plugin that was executed. The value for the first plugin is <code>init</code>. Hence at least 1 param must be supplied for waterfall hooks. This pattern is used in the Tapable instances which are related to the webpack templates like <code>ModuleTemplate</code>, <code>ChunkTemplate</code> etc.</p> </li> </ul> <h3 id="asynchronous-hooks">Asynchronous Hooks<a href="#asynchronous-hooks" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h3> <ul> <li> <p><strong>Async Series Hook</strong></p> <ul> <li>Defined using <code>AsyncSeriesHook[params]</code></li> <li>Tapped into using <code>tap</code>/<code>tapAsync</code>/<code>tapPromise</code> method.</li> <li>Called using <code>callAsync(...params)</code> method</li> </ul> <p>The plugin handler functions are called with all arguments and a callback function with the signature <code>(err?: Error) -> void</code>. The handler functions are called in order of registration. <code>callback</code> is called after all the handlers are called. This is also a commonly used pattern for events like <code>emit</code>, <code>run</code>.</p> </li> <li> <p><strong>Async waterfall</strong> The plugins will be applied asynchronously in the waterfall manner.</p> <ul> <li>Defined using <code>AsyncWaterfallHook[params]</code></li> <li>Tapped into using <code>tap</code>/<code>tapAsync</code>/<code>tapPromise</code> method.</li> <li>Called using <code>callAsync(...params)</code> method</li> </ul> <p>The plugin handler functions are called with the current value and a callback function with the signature <code>(err: Error, nextValue: any) -> void.</code> When called <code>nextValue</code> is the current value for the next handler. The current value for the first handler is <code>init</code>. After all handlers are applied, callback is called with the last value. If any handler passes a value for <code>err</code>, the callback is called with this error and no more handlers are called. This plugin pattern is expected for events like <code>before-resolve</code> and <code>after-resolve</code>.</p> </li> <li> <p><strong>Async Series Bail</strong></p> <ul> <li>Defined using <code>AsyncSeriesBailHook[params]</code></li> <li>Tapped into using <code>tap</code>/<code>tapAsync</code>/<code>tapPromise</code> method.</li> <li>Called using <code>callAsync(...params)</code> method</li> </ul> </li> <li> <p><strong>Async Parallel</strong></p> <ul> <li>Defined using <code>AsyncParallelHook[params]</code></li> <li>Tapped into using <code>tap</code>/<code>tapAsync</code>/<code>tapPromise</code> method.</li> <li>Called using <code>callAsync(...params)</code> method</li> </ul> </li> </ul> <h3 id="configuration-defaults">Configuration defaults<a href="#configuration-defaults" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h3> <p>webpack applies configuration defaults after plugins defaults are applied. This allows plugins to feature their own defaults and provides a way to create configuration preset plugins.</p> '}}]);