$( document ).ready(function() {

    // HALLOWEEN
    (function ($) {
        "use strict";
        $.fn.halloweenBats = function (options) {
            var Bat,
                bats = [],
                $body= $('#bats'),
                innerWidth = $body.innerWidth(),
                innerHeight = $body.innerHeight(),
                counter,
                defaults = {
                    image: 'img/bats.svg', // Path to the image.
                    zIndex: 10000, // The z-index you need.
                    amount: 10, // Bat amount.
                    width: 35, // Image width.
                    height: 20, // Animation frame height.
                    frames: 4, // Amount of animation frames.
                    speed: 5, // Higher value = faster.
                    flickering: 30 // Higher value = slower.
                };
            options = $.extend({}, defaults, options);
            Bat = function () {
                var self = this,
                    $bat = $('<div class="halloweenBat"/>'),
                    x,
                    y,
                    tx,
                    ty,
                    dx,
                    dy,
                    frame;
                // @param {string} direction
                // @returns {number}
                self.randomPosition = function (direction) {
                    var screenLength,
                        imageLength;

                    if (direction === 'horizontal') {
                        screenLength = innerWidth;
                        imageLength = options.width;
                    }
                    else {
                        screenLength = innerHeight;
                        imageLength = options.height;
                    }

                    return Math.random() * (screenLength - imageLength);
                };
                self.applyPosition = function () {
                    $bat.css({
                        left: x + 'px',
                        top: y + 'px'
                    });
                };
                self.move = function () {
                    var left,
                        top,
                        length,
                        dLeft,
                        dTop,
                        ddLeft,
                        ddTop;
                    left = tx - x;
                    top = ty - y;
                    length = Math.sqrt(left * left + top * top);
                    length = Math.max(1, length);
                    dLeft = options.speed * (left / length);
                    dTop = options.speed * (top / length);
                    ddLeft = (dLeft - dx) / options.flickering;
                    ddTop = (dTop - dy) / options.flickering;
                    dx += ddLeft;
                    dy += ddTop;
                    x += dx;
                    y += dy;
                    x = Math.max(0, Math.min(x, innerWidth - options.width));
                    y = Math.max(0, Math.min(y, innerHeight - options.height));
                    self.applyPosition();
                    if (Math.random() > 0.95 ) {
                        tx = self.randomPosition('horizontal');
                        ty = self.randomPosition('vertical');
                    }
                };
                self.animate = function () {
                    frame += 1;
                    if (frame >= options.frames) {
                        frame -= options.frames;
                    }
                    $bat.css(
                        'backgroundPosition',
                        '0 ' + (frame * -options.height) + 'px'
                    );
                };
                x = self.randomPosition('horizontal');
                y = self.randomPosition('vertical');
                tx = self.randomPosition('horizontal');
                ty = self.randomPosition('vertical');
                dx = -5 + Math.random() * 10;
                dy = -5 + Math.random() * 10;
                frame = Math.random() * options.frames;
                frame = Math.round(frame);
                $body.append($bat);
                $bat.css({
                    position: 'absolute',
                    left: x + 'px',
                    top: y + 'px',
                    zIndex: options.zIndex,
                    width: options.width + 'px',
                    height: options.height + 'px',
                    backgroundImage: 'url(' + options.image + ')',
                    backgroundRepeat: 'no-repeat'
                });
                window.setInterval(self.move, 40);
                window.setInterval(self.animate, 200);
            };
            for (counter = 0; counter < options.amount; ++counter) {
                bats.push(new Bat());
            }
            $(window).resize(function() {
                innerWidth = $body.innerWidth();
                innerHeight = $body.innerHeight();
            });
        };
    }(jQuery));
    $.fn.halloweenBats({});

    var pumY = 0;
    var pumYdir = 10;
    window.setInterval(
    function drawPum(timePassed) {
        if (pumYdir == 1) {
            pumY++;
        } else {
            pumY--;
        }
        scarry.style.top = pumY + 'px';
        if (pumY > 10) {
            pumYdir = 0;
        }
        if (pumY < 0) {
            pumYdir = 1;
        }
    }, 200);
    window.setInterval(
        function drawPum(timePassed) {
            scarry.style.left = Math.random() * (-1) + 2 + 'px';
        }, 1000);


    /**
     * jquery.snow - jQuery Snow Effect Plugin
     * @params flakeChar - the HTML char to animate
     * @params minSize - min size of snowflake, 10 by default
     * @params maxSize - max size of snowflake, 20 by default
     * @params newOn - frequency in ms of appearing of new snowflake, 500 by default
     * @params flakeColors - array of colors , #FFFFFF by default
     * @params durationMillis - stop effect after duration
     * @example $.fn.snow({ maxSize: 200, newOn: 1000 });
     */
    (function($) {

        $.fn.snow = function(options) {
            var $flake          = $('<div class="flake" />').css({'position': 'absolute', 'top': '-50px'}),
                snowContainer   = $("#snow"),
                documentHeight 	= snowContainer.height() + 20,
                documentWidth   = snowContainer.width(),
                defaults        = {
                    flakeChar   : "&#10052;",
                    minSize     : 10,
                    maxSize     : 20,
                    newOn       : 500,
                    flakeColor  : ["#ffffff"],
                    durationMillis: null
                },
                options         = $.extend({}, defaults, options);
            $flake.html(options.flakeChar);
            var interval                = setInterval( function() {
                var startPositionLeft   = Math.random() * documentWidth + snowContainer.position().left + defaults.maxSize,
                    startOpacity        = 0.5 + Math.random(),
                    sizeFlake           = options.minSize + Math.random() * options.maxSize,
                    endPositionTop      = documentHeight - defaults.maxSize - 40,
                    endPositionLeft     = startPositionLeft - 100 + Math.random() * 200,
                    durationFall        = documentHeight * 10 + Math.random() * 5000;
                $flake
                    .clone()
                    .appendTo('#snow')
                    .css(
                        {
                            left: startPositionLeft,
                            opacity: startOpacity,
                            'font-size': sizeFlake,
                            'transform': 'rotate(' + Math.random() * 90 + 'deg)',
                            color: options.flakeColor[Math.floor((Math.random() * options.flakeColor.length))]
                        }
                    )
                    .animate(
                        {
                            top: endPositionTop,
                            left: endPositionLeft,
                            opacity: 0.2
                        },
                        durationFall,
                        'linear',
                        function() {
                            $(this).remove()
                        }
                    );
            }, options.newOn);

            if (options.durationMillis) {
                setTimeout(function() {
                    removeInterval(interval);
                }, options.durationMillis);
            }
        };
    })(jQuery);
    $.fn.snow({ minSize: 10, maxSize: 40, newOn: 400 });


    /* Valentine's Day */
    var love = setInterval(function() {
        var w = window.screen.availWidth;
        var r_size = Math.floor(Math.random() * 65 - w/200) + 10;
        var r_left = Math.floor(Math.random() * 100) + 1;
        var r_bg = Math.floor(Math.random() * 25) + 100;
        var r_time = Math.floor(Math.random() * 5) + 10;

        $('#hearts').append("<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);-webkit-animation:love " + r_time + "s ease;-moz-animation:love " + r_time + "s ease;-ms-animation:love " + r_time + "s ease;animation:love " + r_time + "s ease'></div>");

        $('.heart').each(function() {
            var top = $(this).css("top").replace(/[^-\d\.]/g, '');
            var width = $(this).css("width").replace(/[^-\d\.]/g, '');
            if (top <= -100 || width >= 150) {
                $(this).detach();
            }
        });
    }, 500);

});