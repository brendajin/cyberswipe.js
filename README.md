# Cyberswipe.js

**A Microlibrary for Swipeable Drawer Navigation**

Cyberswipe gives you primary and secondary drawer elements to organize your navigation, targeted at touchscreens 7" and up.

[Demo, docs, and interactive API helper](http://brendajin.github.io/cyberswipe.js/)

**Directions:**

Download the `cyberswipe.js` file and save it. For newbies, save it in the same folder as your `index.html` file, aka your `root` directory.

Link to `cyberswipe.js` before the closing `</head>` tag:
    
```html
    <script src="cyberswipe.js"></script>
```

You will need the following styles, either between `<style>` tags between the `</head>` tags, or in your stylesheet:

```css
    nav {
        position:fixed;
        top: 0;
        height:100%;
        background-color:#FABD4A; /* your choice here */
        z-index:3; /* make sure this is the highest z-index on the page */
    }
    .cyber-drawer {
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;
        position:relative;
        top:0;
        height:100%;
        color:#002E40; /* your choice here */
    }
    .cyber-transition {
        -webkit-transition:all 0.25s ease-in-out; /* for the .open() and .close() methods */
        -moz-transition:all 0.25s ease-in-out; /* you can pick the timing */
        -o-transition:all 0.25s ease-in-out;
        transition:all 0.25s ease-in-out;
    }
    #cyber-drag-handle {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        background-color: #2A5769; /* your choice here */
    }
```

Use the following structure in between the `<body>` tags in your `index.html` file:

```html
    <nav>
        <div class="cyber-drawer">
            <!-- Your Navigation Drawer Contents go here -->
        </div>
        <div id="cyber-drag-handle">
            <!-- Your icons, buttons, and other primary navigational elements go here -->
        </div>
    </nav>
    <div class="cyber-content-container">
        <div class="cyber-content">
            <!-- Your main page content goes here -->
        </div>
    </div>
```

Right before the closing `</body>` tag, instantiate a `new Cyberswipe` like this:

```javascript
    var mySwiper = new Cyberswipe(options);
```

The <code><em>options</em></code> can be set with an `Object`. Here are the basic parameters with their defaults:
```javascript
    {
        drawerWidth: 250, // All units are in px
        handleWidth: 60,
        threshold: 50, // The threshold at which the drawer will snap open or shut
        dragElement: document.getElementById('cyber-drag-handle'),
        pushContent: false // If set to true, content will be pushed over when nav drawer opens
    }
```

Advanced users may find the following additional options useful. These may assist in re-structuring the `HTML` tags, classes, and ids:

```javascript
    {
        nav: document.getElementsByTagName('nav')[0],
        navContent: document.getElementsByClassName('cyber-drawer')[0],
        contentContainer: document.getElementsByClassName('cyber-content-container')[0],
        contentElement: document.getElementsByClassName('cyber-content')[0],
        contentMargin: 10
    }
```

Now that you've instantiated a new Cyberswipe, you may want to use one of the following public methods in the rest of your JavaScript:
```javascript
    mySwiper.open(); 
    mySwiper.close();
    mySwiper.isOpen();
```
## Credits
This project was heavily inspired by the following microlibraries:
 * [Snap.js](https://github.com/jakiestfu/Snap.js/)
 * [Tap.js](https://github.com/alexgibson/tap.js)
 * [Swipe.js](http://swipejs.com/)

In addition, this project would not have been possible without the following people:
 * **[Liz Howard](https://github.com/icyfenix/) @lizthedeveloper** who led the very first hackathon team I was on, and who taught the incredible JS 101 class that gave me developer wings
 * **[Pamela Fox](https://github.com/pamelafox) @pamelafox** who taught many of the advanced JS classes where I learned cool DOM stuff, and whose contributions to tablet browser issue threads have saved my sanity a few times
 * **[Nevena Djaja](https://github.com/NevenaDjaja) @nevenadjaja** who taught me the proper way to do prototypal inheritance with pen and paper over lunch one day
 * **[Angelo Calub](https://github.com/acalub) @acalub** who took the time to talk and draw through what eventually became the pushContent feature

## The MIT License (MIT)

Copyright (c) 2013 Brenda Jin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.</p>

<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
