class Notifications {
	constructor(settings) {
		this.settings = settings;

		this.notificationSound = new Audio('/assets/sounds/Portal2_sfx_button_positive.m4a');

		this.setListeners();
	}

	createBrowserNotification(timerType) {

		let message = "HELLO";

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
