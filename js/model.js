var Model = function() {
	var self = this;

	self.mode = ko.observable('off');
	self.instruction = ko.observable('Tap to begin');
	self.switch_time = ko.observable(moment());
	self.foo = ko.observable();
	self.remaining_time = ko.computed(function() {
		self.foo();
		return Math.round(self.switch_time().diff(moment()) / 1000);
	});

	self.switch_mode = function() {
		if(self.mode() == 'off') {
			self.pomodoro();
			self.instruction('Tap to stop');
			self.counting_timer = setInterval(function() {
				self.foo.notifySubscribers();
			}, 1000);
		}
		else {
			self.finish();
			self.instruction('Tap to begin');
			clearInterval(self.counting_timer);
		}
	}

	self.pomodoro = function() {
        self.mode('pomodoro');
        self.switch_time(moment().add('seconds', 5));

        self.timer = setTimeout(function() {
        	self.rest();
        }, 5000);
	}

	self.rest = function() {
		self.mode('rest');
		self.switch_time(moment().add('seconds', 5));

		self.timer = setTimeout(function() {
        	self.pomodoro();
        }, 5000);
	}

	self.finish = function() {
		clearTimeout(self.timer);
		self.mode('off');
	}
}