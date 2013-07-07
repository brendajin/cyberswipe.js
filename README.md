<h1>Cyberswipe.js</h1>
<h2>A Microlibrary for Swipeable Drawer Navigation</h2>
<p>Cyberswipe gives you primary and secondary drawer elements to organize your navigation, and is targeted at touchscreens 7" and up. <a href="http://brendajin.github.io/cyberswipe.js/">Demo and API helper</a></p>
<p><strong>Directions:</strong></p>
<p>Download the <code>cyberswipe.js</code> file and save it. For newbies, save it in the same folder as your <code>index.html</code> file, aka your <code>root</code> directory.</p>
<p>Link to <code>cyberswipe.js</code> before the closing <code>&lt;/head&gt;</code> tag:
    
<pre><code>    &lt;script src="cyberswipe.js"&gt;&lt;/script&gt;</code></pre>
</p>
<p>You will need the following styles, either between <code>&lt;style&gt;</code> tags between the <code>&lt;head&gt;</code> tags, or in your stylesheet:
<pre><code>    nav {
        position:fixed;
        top: 0;
        height:100%;
        background-color:#FABD4A; /* your choice here */
        z-index:3; /* make sure this is the highest z-index on the page */
    }
    .drawer {
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;
        position:relative;
        top:0;
        height:100%;
        color:#002E40; /* your choice here */
    }
    .transition {
        -webkit-transition:all 0.25s ease-in-out; /* for the .open() and .close() methods */
        -moz-transition:all 0.25s ease-in-out; /* you can pick the timing */
        -o-transition:all 0.25s ease-in-out;
        transition:all 0.25s ease-in-out;
    }
    #drag-handle {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        background-color: #2A5769; /* your choice here */
    }
</code></pre>
</p>
<p>Use the following structure in the between the <code>&lt;body&gt;</code> tags in your <code>index.html</code> file:

<pre><code>    &lt;nav&gt;
        &lt;div class="drawer"&gt;
            <em>&lt;!-- Your Navigation Drawer Contents go here --&gt;</em>
        &lt;/div&gt;
        &lt;div id="drag-handle"&gt;
            <em>&lt;!-- Your icons, buttons, and other primary navigational elements go here --&gt;</em>
        &lt;/div&gt;
    &lt;/nav&gt;
    &lt;div class="content-container"&gt;
        &lt;div class="content"&gt;
            <em>&lt;!-- Your main page content goes here --&gt;</em>
        &lt;/div&gt;
    &lt;/div&gt;
</code></pre>
</p>
<p>Right before the closing <code>&lt;/body&gt;</code> tag, instantiate a <code>new Cyberswipe</code> like this:

<pre><code>    var mySwiper = new Cyberswipe(<em>options</em>);</code></pre>

</p>
<p>The <code><em>options</em></code> can be set with an <code>object</code>. Here are the basic parameters with their defaults:
<pre><code>    {
        drawerWidth: 250, // All units are in px
        handleWidth: 60,
        threshold: 50, // The threshold at which the drawer will snap open or shut
        dragElement: document.getElementById('drag-handle'),
        pushContent: false // If set to true, content will be pushed over when nav drawer opens
    }
</code></pre>
</p>
<p>Advanced users may find the following additional options useful. These may assist in re-structuring the <code>HTML</code> tags, classes, and ids:
<pre><code>    {
        nav: document.getElementsByTagName('nav')[0],
        navContent: document.getElementsByClassName('drawer')[0],
        contentContainer: document.getElementsByClassName('content-container')[0],
        contentElement: document.getElementsByClassName('content')[0],
        contentMargin: 10
    }
</code></pre>
</p>
<p>Now that you've instantiated a new Cyberswipe, you may want to use one of the following public methods in the rest of your JavaScript:
<pre><code>    mySwiper.open(); 
    mySwiper.close();
    mySwiper.isOpen();
</code></pre>
<h2>Credits</h2>
<p>This project was heavily inspired by the following microlibraries:
    <ul>
        <li><a href="https://github.com/jakiestfu/Snap.js/">Snap.js</a></li>
        <li><a href="https://github.com/alexgibson/tap.js">Tap.js</a></li>
        <li><a href="http://swipejs.com/">Swipe.js</a></li>
    </ul>
</p>
<p>In addition, this project would not have been possible without the following people:
    <ul>
        <li><strong><a href="https://github.com/icyfenix/">Liz Howard</a> @icyfenix</strong> who led the very first hackathon team I was on, and who taught the incredible JS 101 class that gave me developer wings</li>
        <li><strong><a href="https://github.com/pamelafox">Pamela Fox</a> @pamelafox</strong> who taught many of the advanced JS classes where I learned cool DOM stuff, and whose contributions to tablet browser issue threads have saved my sanity a few times</li>
        <li><strong><a href="https://github.com/NevenaDjaja">Nevena Djaja</a> @nevenadjaja</strong> who taught me the proper way to do prototypal inheritance with pen and paper over lunch one day</li>
        <li><strong><a href="https://github.com/acalub">Angelo Calub</a> @acalub</strong> who took the time to talk and draw through what eventually became the pushContent feature</li>
    </ul>
<h2>The MIT License (MIT)</h2>
<p>Copyright (c) 2013 Brenda Jin</p>

<p>Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:</p>

<p>The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.</p>

<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.</p>