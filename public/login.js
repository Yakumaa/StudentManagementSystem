$(document).ready(function () {
	const API_URL = 'http://localhost:3000/api'
	const ENDPOINTS = {
		login: `${API_URL}/login`,
	}
	const REDIRECTS = {
		1: '/public/admin-dashboard.html', // Admin
		2: '/public/user-dashboard.html', // Normal User
	}

	// Handle form submission
	$('#loginForm').on('submit', handleLogin)

	function handleLogin(e) {
		e.preventDefault()

		// Reset any previous validation states
		$('.is-invalid').removeClass('is-invalid')

		const email = $('#email').val().trim()
		const password = $('#password').val()

		// Basic validation
		let isValid = true
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			$('#email').addClass('is-invalid')
			isValid = false
		}
		if (!password) {
			$('#password').addClass('is-invalid')
			isValid = false
		}

		if (!isValid) return

		const loginData = {
			email: email,
			password: password,
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

		// Redirect based on user type ID
		const redirectUrl = REDIRECTS[response.user.userType]
		if (redirectUrl) {
			window.location.href = redirectUrl
		} else {
			showError('Invalid user type')
		}
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
