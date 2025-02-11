$(document).ready(function () {
	// Check authentication
	if (!utils.checkAuth()) return

	// Constants
	const API_URL = 'http://localhost:3000/api'
	const ENDPOINTS = {
		students: `${API_URL}/students`,
		admins: `${API_URL}/admins`,
		departments: `${API_URL}/departments`,
	}

	// Initialize
	loadUserInfo()
	loadStudents()
	// loadDepartments()
	// setupFormValidation()
	setupEventListeners()

	function loadUserInfo() {
		const user = JSON.parse(localStorage.getItem('user'))
		console.log('user', user)
		$('#adminName').text(user.name)
	}

	function setupEventListeners() {
		// Navigation
		$('.nav-link[data-section]').click(handleNavigation)
		$('#logoutBtn').click(utils.logout)

		// Form submissions
		$('#saveStudentBtn').click(() => handleSave('student'))
		$('#saveAdminBtn').click(() => handleSave('admin'))
	}

	function handleNavigation(e) {
		e.preventDefault()
		const section = $(this).data('section')

		// Update active state
		$('.nav-link[data-section]').removeClass('active')
		$(this).addClass('active')

		// Show/hide sections
		if (section === 'students') {
			$('#studentsSection').show()
			$('#adminsSection').hide()
			loadStudents()
		} else {
			$('#studentsSection').hide()
			$('#adminsSection').show()
			loadAdmins()
		}
	}

	function loadStudents() {
		$.get(ENDPOINTS.students)
			.done((students) => {
				const rows = students
					.map(
						(student) => `
                <tr>
                    <td>${student.studentId}</td>
                    <td>${student.firstName + ' ' + student.lastName}</td>
                    <td>${student.email}</td>
                    <td>${student.gender}</td>
                    <td>${student.dateOfBirth}</td>
                    <td>${student.address}</td>
                    <td>${student.phoneNumber}</td>
                    <td>${student.batchYear}</td>
                    <td>${student.currentSemester}</td>
                    <td>${student.shift}</td>
                    <td>${student.attendance + '%'}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="deleteStudent(${student.studentId})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
              `
					)
					.join('')
				$('#studentsTableBody').html(rows)
			})
			.fail(handleError)
	}

	function loadAdmins() {
		$.get(ENDPOINTS.admins)
			.done((admins) => {
				const rows = admins
					.map(
						(admin) => `
                  <tr>
                      <td>${admin.adminId}</td>
                      <td>${admin.name}</td>
                      <td>${admin.email}</td>
                      <td>${admin.contactNumber}</td>

                      <td>
                          <button class="btn btn-sm btn-danger" onclick="deleteAdmin(${admin.adminId})">
                              <i class="bi bi-trash"></i>
                          </button>
                      </td>
                  </tr>
              `
					)
					.join('')
				$('#adminsTableBody').html(rows)
			})
			.fail(handleError)
	}

	function handleSave(type) {
		if (type === 'student') {
			handleStudentSave()
		} else {
			handleAdminSave()
		}
	}

	function handleStudentSave() {
		const form = $('#addStudentForm')[0]
		if (!form.checkValidity()) {
			form.classList.add('was-validated')
			return
		}

		const formData = new FormData(form)
		const studentData = {
			registrationNumber: generateRegistrationNumber(),
			// profilePicture: 'default.jpg',
			attendance: 100,
		}

		// Convert FormData to JSON
		formData.forEach((value, key) => {
			studentData[key] = value
		})

		$.ajax({
			url: ENDPOINTS.students,
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(studentData),
			success: function (response) {
				$('#addStudentModal').modal('hide')
				form.reset()
				loadStudents()
				showAlert('Success', 'Student added successfully!', 'success')
			},
			error: handleError,
		})
	}

	function handleAdminSave() {
		const formId = '#addAdminForm'
		const modalId = '#addAdminModal'

		const formData = {}
		$(formId)
			.serializeArray()
			.forEach((item) => {
				formData[item.name] = item.value
			})

		$.ajax({
			url: ENDPOINTS.admins,
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(formData),
			success: function (response) {
				$(modalId).modal('hide')
				$(formId)[0].reset()
				loadAdmins()
				showAlert('Success', 'Administrator added successfully!', 'success')
			},
			error: handleError,
		})
	}

	function generateRegistrationNumber() {
		const year = new Date().getFullYear()
		const random = Math.floor(Math.random() * 1000)
			.toString()
			.padStart(3, '0')
		return `REG${year}${random}`
	}

	$('#addStudentModal').on('show.bs.modal', function () {
		$.get(ENDPOINTS.departments)
			.done((departments) => {
				const options = departments
					.map((dept) => `<option value="${dept.departmentId}">${dept.departmentName}</option>`)
					.join('')
				$('select[name="departmentId"]').html('<option value="">Choose...</option>' + options)
			})
			.fail(handleError)

		// Set default batch year
		$('input[name="batchYear"]').val(new Date().getFullYear())
	})

	// Add phone number validation
	$('input[name="phoneNumber"]').on('input', function () {
		this.value = this.value.replace(/[^0-9]/g, '')
	})

	// function deleteStudent(id) {
	// 	if (confirm('Are you sure you want to delete this student?')) {
	// 		$.ajax({
	// 			url: `${ENDPOINTS.students}/${id}`,
	// 			method: 'DELETE',
	// 			success: function () {
	// 				loadStudents()
	// 				showAlert('Success', 'Student deleted successfully!', 'success')
	// 			},
	// 			error: handleError,
	// 		})
	// 	}
	// }

	// function deleteAdmin(id) {
	// 	if (confirm('Are you sure you want to delete this administrator?')) {
	// 		$.ajax({
	// 			url: `${ENDPOINTS.admins}/${id}`,
	// 			method: 'DELETE',
	// 			success: function () {
	// 				loadAdmins()
	// 				showAlert('Success', 'Administrator deleted successfully!', 'success')
	// 			},
	// 			error: handleError,
	// 		})
	// 	}
	// }

	function handleError(xhr) {
		const message = xhr.responseJSON?.error || 'An error occurred. Please try again.'
		showAlert('Error', message, 'danger')
	}

	function showAlert(title, message, type) {
		const alert = `
          <div class="alert alert-${type} alert-dismissible fade show" role="alert">
              <strong>${title}:</strong> ${message}
              <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          </div>
      `

		// Remove any existing alerts
		$('.alert').remove()

		// Add new alert at the top of the container
		$('.alert-toast').prepend(alert)
	}
})
