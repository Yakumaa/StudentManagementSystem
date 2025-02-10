$(document).ready(function () {
	// Check authentication
	if (!utils.checkAuth()) return

	// Constants
	const API_URL = 'http://localhost:3000/api'
	const ENDPOINTS = {
		students: `${API_URL}/students`,
		admins: `${API_URL}/admins`,
	}

	// Initialize
	loadUserInfo()
	loadStudents()
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
		const formId = type === 'student' ? '#addStudentForm' : '#addAdminForm'
		const modalId = type === 'student' ? '#addStudentModal' : '#addAdminModal'
		const endpoint = type === 'student' ? ENDPOINTS.students : ENDPOINTS.admins

		const formData = {}
		$(formId)
			.serializeArray()
			.forEach((item) => {
				formData[item.name] = item.value
			})

		$.ajax({
			url: endpoint,
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(formData),
			success: function (response) {
				$(modalId).modal('hide')
				$(formId)[0].reset()
				if (type === 'student') {
					loadStudents()
				} else {
					loadAdmins()
				}
				showAlert('Success', `${type} added successfully!`, 'success')
			},
			error: handleError,
		})
	}

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
		$('.container').prepend(alert)
	}
})
