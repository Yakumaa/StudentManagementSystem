const utils = {
	checkAuth() {
		const token = localStorage.getItem('token')
		if (!token) {
			window.location.href = '/public/login.html'
			return false
		}

		// Add token to all future AJAX requests
		$.ajaxSetup({
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		return true
	},

	logout() {
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		window.location.href = '/public/login.html'
	},
}
