$(document).ready(function () {
	const API_URL = 'http://localhost:3000/api'
	const ENDPOINTS = {
		register: `${API_URL}/students`,
		departments: `${API_URL}/departments`,
	}

	// Load departments on page load
	loadDepartments()
	setupFormValidation()

	function loadDepartments() {
		$.get(ENDPOINTS.departments)
			.done((departments) => {
				const options = departments
					.map((dept) => `<option value="${dept.departmentId}">${dept.departmentName}</option>`)
					.join('')
				$('select[name="departmentId"]').append(options)
			})
			.fail(handleError)
	}

	function setupFormValidation() {
		// Set current year as default for batch year
		$('input[name="batchYear"]').val(new Date().getFullYear())

		// Phone number validation
		$('input[name="phoneNumber"]').on('input', function () {
			this.value = this.value.replace(/[^0-9]/g, '')
		})

		// Form submission
		$('#addStudentForm').on('submit', handleRegistration)
	}

	function handleRegistration(e) {
		e.preventDefault()

		const form = e.target
		if (!form.checkValidity()) {
			e.stopPropagation()
			$(form).addClass('was-validated')
			return
		}

		const formData = new FormData(form)
		const registrationData = {
			registrationNumber: generateRegistrationNumber(),
			// profilePicture: 'default.jpg',
			attendance: 100,
		}

		// Convert FormData to JSON
		formData.forEach((value, key) => {
			registrationData[key] = value
		})

		submitRegistration(registrationData)

		// Convert FormData to JSON, handling the profile picture separately
		// formData.forEach((value, key) => {
		// 	if (key !== 'profilePicture') {
		// 		registrationData[key] = value
		// 	}
		// })

		// Generate registration number
		// registrationData.registrationNumber = generateRegistrationNumber()
		// console.log(registrationData.registrationNumber)

		// // Set default attendance for new registration
		// registrationData.attendance = 100

		// // Handle file upload first if there's a profile picture
		// const profilePicture = formData.get('profilePicture')
		// if (profilePicture.size > 0) {
		// 	uploadProfilePicture(profilePicture)
		// 		.then((picturePath) => {
		// 			registrationData.profilePicture = picturePath
		// 			submitRegistration(registrationData)
		// 		})
		// 		.catch(handleError)
		// } else {
		// 	registrationData.profilePicture = 'default/profile.jpg'
		// 	submitRegistration(registrationData)
		// }
	}

	function generateRegistrationNumber() {
		const year = new Date().getFullYear()
		const random = Math.floor(Math.random() * 1000)
			.toString()
			.padStart(3, '0')
		return `REG${year}${random}`
	}

	// function uploadProfilePicture(file) {
	// 	return new Promise((resolve, reject) => {
	// 		const formData = new FormData()
	// 		formData.append('file', file)

	// 		$.ajax({
	// 			url: `${API_URL}/upload`,
	// 			method: 'POST',
	// 			data: formData,
	// 			processData: false,
	// 			contentType: false,
	// 			success: (response) => resolve(response.path),
	// 			error: reject,
	// 		})
	// 	})
	// }

	function submitRegistration(data) {
		$.ajax({
			url: ENDPOINTS.register,
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data),
			success: function (response) {
				showSuccess('Registration successful! Please login to continue.')
				setTimeout(() => {
					window.location.href = '/public/login.html'
				}, 2000)
			},
			error: handleError,
		})
	}

	function showSuccess(message) {
		const alert = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
              ${message}
              <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          </div>
      `
		$('#errorMessage').hide()
		$('.card-body').prepend(alert)
	}

	function handleError(xhr) {
		const message = xhr.responseJSON?.error || 'Registration failed. Please try again.'
		$('#errorMessage').text(message).show()
	}
})
