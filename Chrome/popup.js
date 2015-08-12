var pomodoroButton = document.getElementById('pomodoro-button');
var fiveMinuteButton = document.getElementById('five-minute-button');
var tenMinuteButton = document.getElementById('ten-minute-button');
var fifteenMinuteButton = document.getElementById('fifteen-minute-button');
var resetTimeoutButton = document.getElementById('reset-timeout-button');

var currentTimeText = document.getElementById('current-time-text');
var statsLink = document.getElementById('stats-link');
var pomodoroTechniqueLink = document.getElementById('pomodoro-technique-link');

var pomodoroAlarmId = 'pomodoroClockAlarm';

var currentTime;
var interval;

function setTimeInterval(time) {
	resetTimeInterval();

	currentTime = time;
	setTimeText(currentTime);

	interval = setInterval(function() {
		currentTime -= 1000;
		setTimeText(currentTime);

		if (currentTime <= 0) {
			clearInterval(interval);
		}
	}, 1000);
}

function setTimeText(time) {
	currentTimeText.textContent = msToTime(time);
}

function resetTimeInterval() {
	setTimeText(0);
	clearInterval(interval);
}

function msToTime(time) {
	var seconds = parseInt((time / 1000) % 60);
	var minutes = parseInt((time / (1000 * 60)) % 60);

	minutes = (minutes < 10) ? '0' + minutes : minutes;
	seconds = (seconds < 10) ? '0' + seconds : seconds;

	return minutes + ':' + seconds;
}



pomodoroButton.addEventListener('click', function(event) {
	setTimeInterval(1500000);
	chrome.alarms.create(pomodoroAlarmId, {
		delayInMinutes: 25
	});
});

fiveMinuteButton.addEventListener('click', function(event) {
	setTimeInterval(300000);
	chrome.alarms.create(pomodoroAlarmId, {
		delayInMinutes: 5
	});
});

tenMinuteButton.addEventListener('click', function(event) {
	setTimeInterval(600000);
	chrome.alarms.create(pomodoroAlarmId, {
		delayInMinutes: 10
	});
});

fifteenMinuteButton.addEventListener('click', function(event) {
	setTimeInterval(900000);
	chrome.alarms.create(pomodoroAlarmId, {
		delayInMinutes: 15
	});
});

resetTimeoutButton.addEventListener('click', function(event) {
	resetTimeInterval();
	chrome.alarms.clear(pomodoroAlarmId);
});

pomodoroTechniqueLink.addEventListener('click', function(event) {
	chrome.tabs.create({
		url: 'http://pomodorotechnique.com'
	});
});

statsLink.addEventListener('click', function(event) {
	chrome.tabs.create({
		url: 'stats.html'
	});
});



chrome.alarms.get(pomodoroAlarmId, function(alarm) {
	setTimeInterval(alarm.scheduledTime - Date.now());
});