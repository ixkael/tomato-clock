class Notifications {
	constructor(settings) {
		this.settings = settings;

		this.notificationSound = new Audio('/assets/sounds/Portal2_sfx_button_positive.m4a');

		this.setListeners();
	}

	createBrowserNotification(timerType) {

		let quotes= Array('You can do it!','Do not give up', 'You is perfect', 'You is kind', 'You is beautiful', 'If not us, who?','If not now, when?','Fear is absence of love.', 'A pint filled drop by drop', 'Every moment is a fresh beginning', 'The best way is always through', 'You better werk','We are born naked and the rest is Drag', 'We all have our pupropses, we all have our strengths', 'Mistakes make you who you are','This is the beginning of the rest of your life', 'And If I fly or if I fall, at least I can  say I gave it all.');

		let message = quotes[Math.floor(Math.random()*quotes.length)];

		switch (timerType) {
			case TIMER_TYPE.TOMATO:
				break;
			case TIMER_TYPE.SHORT_BREAK:
				break;
			case TIMER_TYPE.LONG_BREAK:
				break;
			default:
				break;
		}

		browser.notifications.create(NOTIFICATION_ID, {
			type: 'basic',
			iconUrl: '/assets/img/tomato-icon-64.png',
			title: 'Motivator',
			message
		});

		this.settings.getSettings().then(settings => {
			if (settings.isNotificationSoundEnabled) {
				this.notificationSound.play();
			}
		});
	}

	setListeners() {
		browser.notifications.onClicked.addListener(notificationId => {
			if (notificationId === NOTIFICATION_ID) {
				browser.notifications.clear(notificationId);
			}
		});
	}
}
