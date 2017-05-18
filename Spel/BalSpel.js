

var roller = function () {
	var timer,
		events = {
			timers: [],
			keys: []
		},
		level = 0,
		keys = {
			38: false,
			40: false,
			37: false,
			39: false
		},
		clock = function() {
			for (var i=0, lng = events.timers.length; i<lng; i++) {
				events.timers[i](keys);
			}
		},
		keyUp = function(ev) {
			if (keys[ev.keyCode] === true) {
				keys[ev.keyCode] = false;
				clock();
			}
		},
		keyDown = function(ev) {
			if (keys[ev.keyCode] === false) {
				keys[ev.keyCode] = true;
				clock();
			}
		},
		start = function() {
			$("#level").text('Level: '+(level+1));
			plane.loadLevel(level);
			ball.go();
		},
		selectLevel = function(ev) {
			if ($(ev.target).is('a')) {
				level = $('#splash a').index(ev.target);
				start();
				$('#splash').animate({
					top: -400
				}, 600, 'easeOutBounce');
			}
			return false;
		},
		showSplash = function() {
			$('#splash').animate({
				top: 0
			}, 600, 'easeOutBounce');
			return false;
		};
	return {
		init: function() {
			var html = [];
			$.each(levels, function(nr) {
				html.push('<a href="#">');
				html.push(nr+1);
				html.push('</a>');
			});
			$('#splash')
				.find('div').html(html.join('')).end()
				.bind('click', selectLevel);
			$('#back').bind('click', showSplash);
			plane.init();
			ball.init();
			$('#roller')
				.bind('keydown', keyDown)
				.bind('keyup', keyUp)
				.focus();
			timer = setInterval(clock, 20);
		},
		register: function(fnc, type) {
			switch (type) {
				case 'key':
					events.keys.push(fnc);
					break;
				case 'time':
					events.timers.push(fnc);
					break;
			}
		},
		endLevel: function() {
			level ++;
			if (level == levels.length) {
				level = 0;
			}
			$("#level").text('Level: '+(level+1));
			plane.loadLevel(level);
		}
	};
}();
//tile object
var tile = function (type,i,j, indx) {
	this.x = j;
	this.y = i;
	this.type = type;
	this.active = true;
	this.ends = false;
	this.power = 0.4;
	this.friction = 0.99;
	this.breaks = false;
	this.reverse = false;
	this.indx = indx;
	this.xwind = 0;
	this.ywind = 0;
	this.checkpoint = false;
	switch (type) {
		//ice
		case 2:
			this.power = 0.02;
			this.friction = 1;
			break;
		//glass
		case 3:
			this.breaks = true;
			break;
		//reverse
		case 4:
			this.reverse = true;
			break;
		//sand
		case 5:
			this.friction = 0.7;
			break;
		//windy left
		case 6:
			this.xwind = -0.3;
			break;
		//windy right
		case 7:
			this.xwind = 0.3;
			break;
		//windy top
		case 8:
			this.ywind = -0.3;
			break;
		//windy down
		case 9:
			this.ywind = 0.3;
			break;
		//checkpoint
		case 11:
			this.checkpoint = true;
			break;
		//end level
		case 12:
			this.ends = true;
			break;
	}
	this.getHTML = function () {
		return '<div class="tile tile'+this.type+'" style="left:'+this.x*100+'px; top:'+this.y*100+'px"></div>';
	};
	this.isOn = function (x, y) {
		var isOnIt = this.active && this.x == x && this.y == y;
		if (isOnIt) {
			if (this.ends) {
				ball.end(this.x, this.y);
			}
			if (this.breaks) {
				$('#roller div').eq(this.indx+1).data('tile', this).animate({opacity: 0}, 1300, this.breakAway);
			}
			return true;
		}
		return false;
	};
	this.modify = function() {
		ball.modify(this.friction, this.power, this.reverse, this.xwind, this.ywind);
		if (this.checkpoint) {
			ball.reset(this.x*100+50, this.y*100+50);
		}
	};
	this.breakAway = function() {
		var tile = $(this).data('tile');
		tile.active = false;
		plane.breaked(tile.x, tile.y);
	};
	this.reset = function() {
		$('#roller div').eq(this.indx+1).stop().css('opacity', 1);
		this.active = true;
	};
};
var plane = function() {
	var el,
		back,
		oldTileX,
		oldTileY,
		level = 0,
		tiles = [];
	return {
		init: function(newLevel) {
			el = document.getElementById('plane');
			back = document.getElementById('roller');
		},
		loadLevel: function(newLevel) {
			level = newLevel;
			tiles = [];
			var html = [];
			for (var i=0, lngi = levels[level].length; i<lngi; i++) {
				for (var j=0, lngj = levels[level][i].length; j<lngj; j++) {
					if (levels[level][i][j]>0) {
						var curIndex = tiles.length;
						tiles[curIndex] = new tile(levels[level][i][j],i,j, curIndex);
						html.push(tiles[curIndex].getHTML());
					}
				}
			}
			el.innerHTML = html.join('');
		},
		move: function(x,y){
			var onAny = false,
				tileX = x < 0 ? -1 :parseInt(x/100, 10),
				tileY = y < 0 ? -1 :parseInt(y/100, 10);
			el.style.left = 300 - x + 'px';
			el.style.top = 200 - y + 'px';
			back.style.backgroundPosition = '-'+(300 + x/10) + 'px -' + (300 + y/10)+'px';
			if (oldTileX != tileX || oldTileY != tileY) {
				for (var i=0, lng = tiles.length; i<lng; i++) {
					if (tiles[i].isOn(tileX, tileY)) {
						onAny = true;
						break;
					}
				}
				if (onAny === false) {
					ball.die();
					return;
				}
				tiles[i].modify();
				oldTileX = tileX;
				oldTileY = tileY;
			}
		},
		breaked: function(tileX, tileY) {
			if (oldTileX == tileX && oldTileY == tileY) {
				ball.die();
			}
		},
		reset: function() {
			for (var i=0, lng = tiles.length; i<lng; i++) {
				tiles[i].reset();
			}
		}
	};
}();
var ball = function  () {
	var inited = false,
		el,
		xcheck = 50,
		x = 50,
		ycheck = 50,
		y = 50,
		xspeed = 0,
		yspeed = 0,
		power = 0.4,
		friction = 0.99,
		xwind = 0,
		ywind = 0,
		dead = true,
		timer = function(keys) {
			if (dead === true) {
				return;
			}
			if (keys[38] === true) {
				yspeed += power;
			}
			if (keys[40] === true) {
				yspeed -= power;
			}
			if (keys[37] === true) {
				xspeed += power;
			}
			if (keys[39] === true) {
				xspeed -= power;
			}
			xspeed = xspeed * friction - xwind;
			yspeed = yspeed * friction - ywind;
			if (Math.abs(xspeed) < 0.004) {
				xspeed = 0;
			}
			if (Math.abs(xspeed) < 0.004) {
				xspeed = 0;
			}
			x -= xspeed;
			y -= yspeed;
			plane.move(x,y);
		},
		revive = function() {
			dead = false;
		},
		start = function() {
			x = xcheck;
			y = ycheck;
			xspeed = 0;
			yspeed = 0;
			power = 0.4;
			friction = 0.99;
			xwind = 0;
			ywind = 0;
			plane.move(x,y);
			$(el).css({
				width: 104,
				height: 104,
				marginTop: -40,
				marginLeft: -40,
				left: 292,
				top: 192,
				opacity: 0
			}).animate({
				width: 24,
				height: 24,
				marginTop: 0,
				marginLeft: 0,
				opacity: 1
			}, 800, 'easeOutBounce', revive);
			plane.reset();
		},
		loadLevel = function() {
			roller.endLevel();
			ball.reset(0,0);
			start();
		};
	return {
		init: function() {
			if (inited != true) {
				inited = true;
				el = document.getElementById('ball');
				roller.register(timer, 'time');
			}
		},
		die: function() {
			dead = true;
			$(el).animate({
				width: 0,
				height: 0,
				marginTop: 12,
				marginLeft: 12,
				opacity: 0
			}, 500, start);
		},
		modify: function (newFriction, newPower, reverse, newXwind, newYwind) {
			if (newPower != false) {
				power = newPower;
			}
			if (newFriction != false) {
				friction = newFriction;
			}
			if (reverse) {
				power *= -1;
			}
			xwind = newXwind || 0;
			ywind = newYwind || 0;
		},
		end: function (tileX, tileY) {
			dead = true;
			$(el).animate({
				left: tileX*100 - x + 342,
				top: tileY*100 - y + 242
			}, 800, 'easeInCirc', loadLevel);
		},
		reset: function (newX, newY) {
			xcheck = newX ? newX : 50;
			ycheck = newY ? newY : 50;
		},
		go: function() {
			ball.reset(50,50);
			start();
		}
	};
}();

var levels = [
	[
		[1,1,1,1,12]
	],
	[
		[1,1,1,0,1,1,1,0,0,1,1,12],
		[0,0,1,1,1,0,1,1,1,1,0,0]
	],
	[
		[1,6,6,1,1,0,0,0,12],
		[0,0,0,0,1,7,7,7,1]
	],
	[
		[1,2,2,5,0],
		[0,0,0,2,12]
	],
	[
		[1,4,4,4,0,0,0],
		[0,0,0,4,0,0,0],
		[0,0,0,4,0,0,0],
		[0,0,0,4,0,0,0],
		[0,0,0,4,4,4,12]
	],
	[
		[1,3,0,12],
		[0,3,0,3],
		[0,3,0,3],
		[0,3,0,3],
		[0,3,3,3]
	],
	[
		[ 1,  1,  4,  4,  5,  1,  2,  2,  3,  0,  0,  0],
		[ 0,  0,  0,  0,  0,  0,  0,  0,  3, 11,  6,  1],
		[ 1, 11,  3,  0,  7,  1,  1,  0,  0,  0,  0,  8],
		[ 1,  0,  3,  3,  3,  0,  3,  3,  7,  3,  7,  1], 
		[ 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], 
		[ 1,  0,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1], 
		[ 1,  0,  1,  0,  0,  0,  0,  1,  0,  1,  0,  1], 
		[ 1,  0,  1,  1,  0,  0,  0,  1,  0,  1,  0,  1], 
		[ 1,  0,  0,  1,  0,  1,  1,  1,  0,  1,  0,  1], 
		[ 1,  1,  0,  1,  0,  1,  0,  0,  0,  1,  0,  1], 
		[ 0,  1,  1,  1,  0,  1,  1,  1,  1,  1,  0,  12]
	]
];



jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	}
});
$(document).ready(roller.init);