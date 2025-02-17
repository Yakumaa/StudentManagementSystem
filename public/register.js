$(document).ready(function () {
	// // Password visibility toggle
	// $('.password-toggle').click(function () {
	// 	const input = $(this).prev('input')
	// 	const icon = $(this).find('i')

	// 	if (input.attr('type') === 'password') {
	// 		input.attr('type', 'text')
	// 		icon.removeClass('fa-eye').addClass('fa-eye-slash')
	// 	} else {
	// 		input.attr('type', 'password')
	// 		icon.removeClass('fa-eye-slash').addClass('fa-eye')
	// 	}
	// })

	// Form submission
	$('#registrationForm').on('submit', function (e) {
		e.preventDefault()
		const form = $(this)
		let isValid = true

		// Reset previous validation states
		form.find('.is-invalid').removeClass('is-invalid')

		// Validate username
		const username = $('#username').val().trim()
		if (username.length < 3) {
			$('#username').addClass('is-invalid')
			isValid = false
		}

		// Validate email
		const email = $('#email').val().trim()
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			$('#email').addClass('is-invalid')
			isValid = false
		}

		// Validate password and confirmation
		const passwordHash = $('#passwordHash').val()
		const confirmPassword = $('#confirmPassword').val()
		if (passwordHash !== confirmPassword) {
			$('#confirmPassword').addClass('is-invalid')
			isValid = false
		}

		// Validate user type
		if (!$('#userTypeID').val()) {
			$('#userTypeID').addClass('is-invalid')
			isValid = false
		}

		if (isValid) {
			// Prepare data for submission
			const formData = {
				username: username,
				email: email,
				passwordHash: passwordHash,
				userTypeID: parseInt($('#userTypeID').val()),
			}

			console.log('formdata', formData)

			// Submit form data
			$.ajax({
				url: 'http://localhost:3000/api/users',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(formData),
				success: function (response) {
					// Show success message
					alert('Registration successful! Please login to continue.')
					window.location.href = '/public/login.html'
				},
				error: function (xhr) {
					// Show error message
					const error = xhr.responseJSON?.error || 'Registration failed. Please try again.'
					alert(error)
				},
			})
		}
	})
})
