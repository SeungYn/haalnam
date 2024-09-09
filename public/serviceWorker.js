self.addEventListener('activate', (e) => {
	// console.log('activate');
	// self.registration.showNotification('타이틀', {
	// 	body: '21312',
	// 	data: { type: 'PLAN_START_TIME' },
	// });
});

self.addEventListener('push', (event) => {
	const data = event.data.json();

	if (data.type === 'PLAN_START_TIME') {
		self.registration.showNotification(data.title, {
			body: '오늘도 화이팅👏',
			icon: '/thumnail/haalnam_thumnail.png',
			data: { type: 'PLAN_START_TIME' },
			vibrate: [500],
		});
	}
});

self.addEventListener('notificationclick', (e) => {
	e.notification.close();
	const data = e.notification.data;

	const domain = 'https://haalnam.site';

	if (data.type === 'PLAN_START_TIME') {
		console.log('plan');
		e.waitUntil(
			self.clients.matchAll().then(function (activeClients) {
				if (activeClients.length > 0) {
					activeClients[0].navigate(domain + '/plan');
				} else {
					self.clients.openWindow(domain + '/plan');
				}
			})
		);
	}
});
