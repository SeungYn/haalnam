'use client';

import { ToastContainer } from 'react-toastify';

export default function ReactToastContainer() {
	return (
		<ToastContainer
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss={false}
			draggable
			position="top-right"
			pauseOnHover
			theme="light"
		/>
	);
}
