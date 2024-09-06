self.addEventListener('activate', () => {});

self.addEventListener('push', (event) => {
	const data = event.data.json();

	if (data.type === 'PLAN_START_TIME') {
		self.registration.showNotification(data.title, {
			body: '오늘도 화이팅👏',
			icon: '/thumnail/haalnam_thumnail.png',
			vibrate: [500],
		});
	}
});
