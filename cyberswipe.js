var Cyberswipe = Cyberswipe || function(options) {
    // Manage scope
    var self = this;

    // Add user-selected options, or fall back to defaults
    this.drawerWidth =  options.drawerWidth || 250;
    this.handleWidth = options.handleWidth || 60;
    this.threshold = options.threshold || 50;
    this.openThreshold = options.threshold || this.threshold;
    this.closeThreshold = options.drawerWidth - options.threshold || this.drawerWidth - this.threshold;
    this.dragElement = options.dragElement || document.getElementById('drag-handle');
    this.nav = options.nav || document.getElementsByTagName('nav')[0];
    this.contentContainer = options.contentContainer || document.getElementsByClassName('content-container')[0];
    this.contentElement = options.contentElement || document.getElementsByClassName('content')[0];
    this.contentMargin = options.contentMargin || 10;
    this.pushContent = options.pushContent || false;
    // Make the navigation
    this.utils.makeNav(self);

    // Define norms based on current offsets
    this.utils.defineNorms(self);
}

Cyberswipe.prototype = {
    utils: {
        hasTouch: (document.ontouchstart===null),
        hasWebkit: function(nav) {
            return nav.style.hasOwnProperty('webkitTransition');
        },
        makeNav: function(self) {
            // Draw the nav
            self.nav.style.width = self.drawerWidth + 'px';
            self.nav.style.left = self.drawerWidth * -1 + self.handleWidth + 'px';

            self.nav.children[0].style.width = self.drawerWidth - self.handleWidth + 'px'

            self.contentContainer.style.marginLeft = self.handleWidth + 'px';
            self.contentElement.style.marginLeft = self.contentMargin + 'px';
            self.contentElement.style.marginRight = self.contentMargin + 'px';

            // Add transition end event listener once, so that case open() or close() animation transitions do not interfere with dragging animation
            if(this.hasWebkit(self.nav)) {
                self.nav.addEventListener('webkitTransitionEnd',function() {
                    self.nav.classList.remove('transition');
                    self.contentContainer.classList.remove('transition');
                })
            }
            else {
                self.nav.addEventListener('transitionend',function() {
                    self.nav.classList.remove('transition');
                    self.contentContainer.classList.remove('transition');
                })
            }       

            // Add native JS event listeners            
            if(this.hasTouch) {
                self.dragElement.addEventListener('touchstart',function(e){self.utils.onStart(e,self.pushContent,self.contentContainer,self.contentElement,self.drawerWidth)});
                self.dragElement.addEventListener('touchmove',function(e){self.utils.drag(e,self.nav,self.dragElement,self.drawerWidth,self.handleWidth,self.pushContent,self.contentContainer)});
                self.dragElement.addEventListener('touchend',function(e){self.utils.snap(e,self.nav,self.dragElement,self.drawerWidth,self.handleWidth,self.openThreshold,self.closeThreshold,self.pushContent,self.contentElement,self.contentContainer)});
            }
            else {
                self.dragElement.addEventListener('dragstart',function(e){self.utils.onStart(e,self.pushContent,self.contentContainer,self.contentElement,self.drawerWidth)});
                self.dragElement.addEventListener('dragmove',function(e){self.utils.drag(e,self.nav,self.dragElement, self.drawerWidth, self.handleWidth,self.pushContent,self.contentContainer)});
                self.dragElement.addEventListener('dragend',function(e){self.utils.snap(e,self.nav,self.dragElement,self.drawerWidth,self.handleWidth,self.openThreshold,self.closeThreshold,self.pushContent,self.contentElement,self.contentContainer)});
            }

            // Redefine norms if screen size or orientation change
            window.addEventListener("orientationchange", function(e){self.utils.defineNorms(self);});
            window.addEventListener("resize",function(e){self.utils.defineNorms(self)});
        },
        defineNorms: function(self){
            this.normalContentOffset = self.contentElement.offsetWidth;
            this.normalContainerOffset = self.contentContainer.offsetWidth;
        },
        onStart: function(x,pushContent,contentContainer,contentElement,drawerWidth){
            var stopScroll = this.preventDefault;
            // Prevent background scrolling
            x.preventDefault();

            // Store the start value as the first last value
            this.startPageX = x.pageX;
            this.lastX = x.pageX;

            if(pushContent) {
                window.addEventListener('touchmove',stopScroll);
                contentElement.style.width = contentElement.offsetWidth + 'px';
                contentContainer.style.width = contentContainer.offsetWidth + drawerWidth + 'px';
            }
        },
        preventDefault: function(e){
            e.preventDefault();
        },
        drag: function(e,nav,dragElement,drawerWidth,handleWidth,pushContent,contentContainer){
            e.preventDefault();

            this.lastX = this.currentX;
            this.currentX = e.pageX;
            
            var direction = this.getDirection(this.lastX,this.currentX);

            if(direction === "right") {
                this.moveRight(e.pageX,nav,dragElement,drawerWidth,handleWidth,pushContent,contentContainer);
            }
            else {
                this.moveLeft(e.pageX,this.startX,nav,dragElement,drawerWidth,handleWidth,pushContent,contentContainer)
            }
        },
        getDirection: function (lastX, currentX) {
            var direction = '';
            if(lastX - currentX > 0) {
                direction = 'left;'
            }
            else {
                direction = 'right';
            }
            this.lastDirection = direction;
            return direction;
        },
        moveRight: function(x,nav,dragElement,drawerWidth,handleWidth,pushContent,contentContainer) {    
            if(x > this.drawerWidth) {
                nav.style.left = 0 + 'px';
                pushContent ? contentContainer.style.marginLeft = drawerWidth + 'px' : null;
            }
            if(parseInt(dragElement.getBoundingClientRect().left)<x && dragElement.getBoundingClientRect().right < drawerWidth) {
                nav.style.left = x - drawerWidth + dragElement.offsetWidth/2 + 'px';
                pushContent ? contentContainer.style.marginLeft = x + dragElement.offsetWidth/2 + 'px' : null;
            }
            else {
                nav.style.left = 0 + 'px';
                pushContent ? contentContainer.style.marginLeft = drawerWidth + 'px' : null;
            }
        },
        moveLeft: function(x,startX,nav,dragElement,drawerWidth,handleWidth,pushContent,contentContainer) {
            if (x + dragElement.offsetWidth/2 > drawerWidth) {
                nav.style.left = drawerWidth*-1 + handleWidth + 'px';
                pushContent ? contentContainer.style.marginLeft = handleWidth + 'px' : null;
            }
            else if (dragElement.getBoundingClientRect().left > 0 && x < drawerWidth) {
                nav.style.left = x - drawerWidth + dragElement.offsetWidth/2 + 'px';
                pushContent ? contentContainer.style.marginLeft = x + dragElement.offsetWidth/2 + 'px' : null;
            }
            else {
                nav.style.left = drawerWidth*-1 + handleWidth + 'px';
                pushContent ? contentContainer.style.marginLeft = handleWidth + 'px' : null;
            }
        },
        snap: function(e,nav,dragElement,drawerWidth,handleWidth,openThreshold,closeThreshold,pushContent,contentElement,contentContainer) {
            var stopScroll = this.preventDefault;
            e.preventDefault();

            if(this.lastDirection=="right" && dragElement.getBoundingClientRect().left < openThreshold) {
                this.close(nav,pushContent,contentContainer,contentElement,drawerWidth,handleWidth,stopScroll);
            }
            else if(this.lastDirection=="right") {
                this.open(nav,pushContent,contentContainer,drawerWidth);
            }
            else if(this.lastDirection=="left" && dragElement.getBoundingClientRect().left > closeThreshold) {
                this.open(nav,pushContent,contentContainer,drawerWidth);
            }
            else {
                this.close(nav,pushContent,contentContainer,contentElement,drawerWidth,handleWidth,stopScroll);
            }
        },
        open: function(nav,pushContent,contentContainer,drawerWidth) {
            nav.style.left = 0 + 'px';
            pushContent ? contentContainer.style.marginLeft = drawerWidth + 'px' : null;
        },
        close: function(nav,pushContent,contentContainer,contentElement,drawerWidth,handleWidth,stopScroll) {
            nav.style.left = drawerWidth*-1 + handleWidth + 'px';
            // Restore widths and margins to normal
            pushContent ? contentContainer.style.marginLeft = handleWidth + 'px' : null;
            pushContent ? contentContainer.style.width = this.normalContainerOffset + 'px' : null;
            pushContent ? contentElement.style.width = this.normalContentOffset + 'px' : null;
            // Restart scrolling
            pushContent ? window.removeEventListener('touchmove',stopScroll) : null;
        }
    },
    // Begin public methods
    open: function(){
        this.nav.classList.add('transition');
        this.nav.style.left = 0 + 'px';

        if(this.pushContent) {
            this.contentContainer.classList.add('transition');
            this.contentContainer.style.marginLeft = this.drawerWidth + 'px';
            this.contentElement.style.width = this.contentElement.offsetWidth + 'px';
            this.contentContainer.style.width = this.contentContainer.offsetWidth + this.drawerWidth + 'px';
            window.addEventListener('touchmove',this.utils.preventDefault);
        }
    },
    close: function() {
        this.nav.classList.add('transition');
        this.nav.style.left = this.drawerWidth*-1 + this.handleWidth + 'px';

        if(this.pushContent) {
            this.contentContainer.classList.add('transition');
            this.contentContainer.style.marginLeft = this.handleWidth + 'px';
            this.contentElement.style.width = this.utils.normalContentOffset + 'px';
            this.contentContainer.style.width = this.utils.normalContainerOffset + 'px';
            window.removeEventListener('touchmove',this.utils.preventDefault);
        }
    },
    isOpen: function() {
        if(this.nav.style.left == 0 + 'px' || this.nav.style.left == 0) {
            return true;
        }
        else {
            return false;
        }
    }
}