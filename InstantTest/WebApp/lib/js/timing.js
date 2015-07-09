var Timer = function (duration, interval, call) {
	this.duration = duration;
	this.interval = interval;
	this.called = call;
	var p = duration.split(":")
	var t = new Number(p[0]) * 3600 + new Number(p[1]) * 60 + new Number(p[2] + 1);
	this.time = t;
};

Timer.prototype.update = function(time) {
	this.time = time;
}

Timer.prototype.start = function(timeUp) {
	window.clearInterval(this.timer);
	var t = this.time;
	var call = this.called;
	var Timer = this;

	this.timer = window.setInterval(function(){
					t = t - 1;
					var s = t % 60
			        var h = Math.floor(t / 3600)
			        var m = Math.floor((((t - h * 3600) / 60)))
			        call(h, m, s);
			        Timer.update(t);

			        if (t == 0) {
			        	timeUp.apply();
			        };
				}, this.interval)
};

Timer.prototype.pause = function () {
	window.clearInterval(this.timer);
};

Timer.prototype.stop = function () {
	window.clearInterval(this.timer);
	var p = this.duration.split(":")
	this.time = new Number(p[0]) * 3600 + new Number(p[1]) * 60 + new Number(p[2] + 1);
};