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

            document.getElementsByClassName('content')[0].style.width = document.getElementsByClassName('content')[0].offsetWidth + 'px';
            document.getElementsByClassName('content-container')[0].style.width = document.getElementsByClassName('content-container')[0].offsetWidth + self.drawerWidth + 'px';

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
                self.dragElement.addEventListener('touchstart',function(e){self.utils.onStart(e)});
                self.dragElement.addEventListener('touchmove',function(e){self.utils.drag(e,self.nav,self.dragElement,self.drawerWidth,self.handleWidth,self.pushContent,self.contentContainer)});
                self.dragElement.addEventListener('touchend',function(e){self.utils.snap(e,self.nav,self.dragElement,self.drawerWidth,self.handleWidth,self.openThreshold,self.closeThreshold,self.pushContent,self.contentContainer)});
            }
            else {
                self.dragElement.addEventListener('dragstart',function(e){self.utils.onStart(e)});
                self.dragElement.addEventListener('dragmove',function(e){self.utils.drag(e,self.nav, self.dragElement, self.drawerWidth, self.handleWidth,self.pushContent,self.contentContainer)});
                self.dragElement.addEventListener('dragend',function(e){self.utils.snap(e,self.nav, self.dragElement,self.drawerWidth,self.handleWidth,self.openThreshold,self.closeThreshold,self.pushContent,self.contentContainer)});
            }
        },
        onStart: function(x){
            // Prevent background scrolling
            x.preventDefault();

            // Store the start value as the first last value
            this.startPageX = x.pageX;
            this.lastX = x.pageX;
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
                pushContent ? contentContainer.style.marginLeft = handleWidth + 'px' : null;
            }
            if(parseInt(dragElement.getBoundingClientRect().left)<x && dragElement.getBoundingClientRect().right < drawerWidth) {
                nav.style.left = x - drawerWidth + dragElement.offsetWidth/2 + 'px';
                pushContent ? contentContainer.style.marginLeft = x + dragElement.offsetWidth/2 + 'px' : null;
            }
            else {
                nav.style.left = 0 + 'px';
                pushContent ? contentContainer.style.marginLeft = handleWidth + 'px' : null;
            }
        },
        moveLeft: function(x,startX,nav,dragElement,drawerWidth,handleWidth,pushContent,contentContainer) {
            if (x + dragElement.offsetWidth/2 > drawerWidth) {
                nav.style.left = drawerWidth*-1 + handleWidth + 'px';
                pushContent ? contentContainer.style.marginLeft = drawerWidth + 'px' : null;
            }
            else if (dragElement.getBoundingClientRect().left > 0 && x < drawerWidth) {
                nav.style.left = x - drawerWidth + dragElement.offsetWidth/2 + 'px';
                pushContent ? contentContainer.style.marginLeft = x + dragElement.offsetWidth/2 + 'px' : null;
            }
            else {
                nav.style.left = drawerWidth*-1 + handleWidth + 'px';
                pushContent ? contentContainer.style.marginLeft = drawerWidth + 'px' : null;
            }
        },
        snap: function(e, nav,dragElement,drawerWidth,handleWidth,openThreshold,closeThreshold,pushContent,contentContainer) {
            e.preventDefault();

            if(this.lastDirection=="right" && dragElement.getBoundingClientRect().left < openThreshold) {
                nav.style.left = drawerWidth*-1 + handleWidth + 'px';
                pushContent ? contentContainer.style.marginLeft = handleWidth + 'px' : null;
            }
            else if(this.lastDirection=="right") {
                nav.style.left = 0 + 'px';
                pushContent ? contentContainer.style.marginLeft = drawerWidth + 'px' : null;
            }
            else if(this.lastDirection=="left" && dragElement.getBoundingClientRect().left > closeThreshold) {
                nav.style.left = 0 + 'px';            
                pushContent ? contentContainer.style.marginLeft = drawerWidth + 'px' : null;
            }
            else {
                nav.style.left = drawerWidth*-1 + handleWidth + 'px';
                pushContent ? contentContainer.style.marginLeft = handleWidth + 'px' : null;
            }
        },
    },
    // Begin public methods
    open: function(){
        this.nav.classList.add('transition');
        this.nav.style.left = 0 + 'px';
    },
    close: function() {
        this.nav.classList.add('transition');
        this.nav.style.left = this.drawerWidth*-1 + this.handleWidth + 'px';
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