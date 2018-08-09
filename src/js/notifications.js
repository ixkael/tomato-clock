class Notifications {
	constructor(settings) {
		this.settings = settings;

		this.notificationSound = new Audio('/assets/sounds/Portal2_sfx_button_positive.m4a');

		this.setListeners();
	}

	createBrowserNotification(timerType) {

		let quotes= Array('Whether you think you can, or you think you can’t – you’re right. —Henry Ford','Oh yes, the past can hurt. But you can either run from it, or learn from it. —Rafiki, The Lion King','If I had nine hours to chop down a tree, I’d spend the first six sharpening my axe. —Abraham Lincoln','The mind is its own place, and in itself can make a heaven of hell, a hell of heaven. —   John Milton, Paradise Lost','Intelligence is the ability to adapt to change. —Stephen Hawking','Leaders can let you fail and yet not let you be a failure. —Stanley McChrystal','Fight till the last gasp. —William Shakespeare, Henry VI','Do or do not. There is no try. —Yoda, The Empire Strikes Back','Intelligence without ambition is a bird without wings. —Salvador Dali','Life’s like a movie, write your own ending. Keep believing, keep pretending. —Jim Hensen','In matters of style, swim with the current; in matters of principle, stand like a rock. — Thomas Jefferson');

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
			title: 'Tomato Clock',
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
