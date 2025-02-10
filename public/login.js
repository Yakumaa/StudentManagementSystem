$(document).ready(function () {
	const API_URL = 'http://localhost:3000/api'
	const ENDPOINTS = {
		login: `${API_URL}/login`,
	}
	const REDIRECTS = {
		admin: '/public/admin-dashboard.html',
		student: '/public/student-dashboard.html',
	}

	// Handle form submission
	$('#loginForm').on('submit', handleLogin)

	function handleLogin(e) {
		e.preventDefault()

		const loginData = {
			email: $('#email').val(),
			password: $('#password').val(),
			userType: $('#userType').val(),
		}

		$.ajax({
			url: ENDPOINTS.login,
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(loginData),
			success: handleLoginSuccess,
			error: handleLoginError,
		})
	}

	function handleLoginSuccess(response) {
		// Store user data
		storeUserData(response)

		// Redirect based on user type
		const redirectUrl = REDIRECTS[response.user.userType]
		window.location.href = redirectUrl
	}

	function handleLoginError(xhr) {
		const errorMessage = xhr.responseJSON?.error || 'Login failed. Please try again.'
		showError(errorMessage)
	}

	function storeUserData(response) {
		localStorage.setItem('token', response.token)
		localStorage.setItem('user', JSON.stringify(response.user))
	}

	function showError(message) {
		$('#errorMessage').text(message).show().delay(5000).fadeOut()
	}
})
