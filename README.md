<h1>Cyberswipe.js</h1>
<h2>A Microlibrary for Swipeable Drawer Navigation</h2>
<p>Cyberswipe gives you primary and secondary drawer elements to organize your navigation, and is targeted at touchscreens 7" and up. If you would like to add </p>
<p><strong>Quickstart:</strong></p>
<p>Download the <code>cyberswipe.js</code> file and save it. For newbies, save it in the same folder as your <code>index.html</code> file, aka your <code>root</code> directory.</p>
<p>Link to <code>cyberswipe.js</code> before the closing <code>&lt;/head&gt;</code> tag:
                    <pre><code>
    &lt;script src="cyberswipe.js"&gt;&lt;/script&gt;
                    </code></pre>
</p>
<p>You will need the following styles, either between <code>&lt;style&gt;</code> tags between the <code>&lt;head&gt;</code> tags, or in your stylesheet:
<pre><code>
    nav {
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
<pre><code>
    &lt;nav&gt;
        &lt;div class="drawer"&gt;
        &lt;/div&gt;
        &lt;div id="drag-handle"&gt;
        &lt;/div&gt;
    &lt;/nav&gt;
    &lt;div class="content-container"&gt;
        &lt;div class="content"&gt;
        &lt;/div&gt;
    &lt;/div&gt;
</code></pre>
</p>
<p>Right before the closing <code>&lt;/body&gt;</code> tag, instantiate a <code>new Cyberswipe</code> like this:
<pre><code>
    var mySwiper = new Cyberswipe(<em>options</em>);
</code></pre>
</p>
<p>The <code><em>options</em></code> can be set with an <code>object</code>. Here are the basic parameters with their defaults:
<pre><code>
    {
        drawerWidth: 250, // All units are in px
        handleWidth: 60,
        threshold: 50, // The threshold at which the drawer will snap open or shut
        dragElement: document.getElementById('drag-handle'),
        pushContent: false
    }
</code></pre>
</p>
<p>Advanced users may find the following additional options useful. These may assist in re-structuring the <code>HTML</code> tags, classes, and ids:
<pre><code> 
    {
        nav: document.getElementsByTagName('nav')[0],
        navContent: document.getElementsByClassName('drawer')[0],
        contentContainer: document.getElementsByClassName('content-container')[0],
        contentElement: document.getElementsByClassName('content')[0],
        contentMargin: 10
    }
</code></pre>
</p>
<p>Now that you've instantiated a new Cyberswipe, you may want to use one of the following public methods in the rest of your JavaScript:
<pre><code>
    mySwiper.open(); 
    mySwiper.close();
    mySwiper.isOpen();
</code></pre>