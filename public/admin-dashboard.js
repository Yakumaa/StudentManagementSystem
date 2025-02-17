$(document).ready(function () {
	// Check authentication
	if (!utils.checkAuth()) return

	// Constants
	const API_URL = 'http://localhost:3000/api'
	const ENDPOINTS = {
		students: `${API_URL}/students`,
		admins: `${API_URL}/users`,
		departments: `${API_URL}/departments`,
		formdata: `${API_URL}/form-data`,
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
		// fetch departments
		$.get(ENDPOINTS.departments)
			.done((departments) => {
				const departmentMap = departments.reduce((map, dept) => {
					map[dept.departmentId] = dept.departmentName
					return map
				}, {})

				// fetch and display students
				$.get(ENDPOINTS.formdata)
					.done((formData) => {
						const rows = formData
							.map(
								(student) => `
                    <tr>
                        <td>${student.dataId}</td>
                        <td>${student.fieldValue1}</td>
                        <td>${student.fieldValue2 + ' ' + student.fieldValue3}</td>
                        <td>${student.fieldValue5}</td>
                        <td>${student.fieldValue6}</td>
                        <td>${student.fieldValue7}</td>
                        <td>${student.fieldValue8}</td>
                        <td>${student.fieldValue9}</td>
                        <td>${departmentMap[student.fieldValue10]}</td>
                        <td>${student.fieldValue11}</td>
                        <td>${student.fieldValue12}</td>
                        <td>${student.fieldValue13}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="editStudent(${student.dataId})">
                                <i class="bi bi-pencil"></i>
                            </button>
                        </td>
                        
                        <td>
                            <button class="btn btn-sm btn-danger" onclick="deleteStudent(${student.dataId})">
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
                      <td>${admin.userId}</td>
                      <td>${admin.username}</td>
                      <td>${admin.email}</td>
                      <td>${admin.userTypeID === 1 ? 'Admin' : 'Normal'}</td>
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

		console.log('form', form)

		const formData = new FormData(form)
		console.log('formData', formData)
		const studentData = Object.fromEntries(formData.entries())
		console.log('studentData', studentData)

		if (!studentData.registrationNumber) {
			studentData.registrationNumber = generateRegistrationNumber()
		}

		$.ajax({
			url: ENDPOINTS.formdata,
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

	window.editStudent = function (dataId) {
		// load departments
		$.get(ENDPOINTS.departments)
			.done((departments) => {
				const options = departments
					.map((dept) => `<option value="${dept.departmentId}">${dept.departmentName}</option>`)
					.join('')
				$('#editStudentForm select[name="departmentId"]').html('<option value="">Choose...</option>' + options)

				// populate student data
				$.get(`${ENDPOINTS.formdata}/${dataId}`)
					.done((student) => {
						// Populate the edit form
						$('#editDataId').val(student.dataId)
						$('#editStudentForm [name="firstName"]').val(student.fieldValue2)
						$('#editStudentForm [name="lastName"]').val(student.fieldValue3)
						$('#editStudentForm [name="fathersName"]').val(student.fieldValue4)
						$('#editStudentForm [name="email"]').val(student.fieldValue5)
						$('#editStudentForm [name="gender"]').val(student.fieldValue6)
						$('#editStudentForm [name="dateOfBirth"]').val(student.fieldValue7)
						$('#editStudentForm [name="address"]').val(student.fieldValue8)
						$('#editStudentForm [name="phoneNumber"]').val(student.fieldValue9)
						$('#editStudentForm [name="departmentId"]').val(student.fieldValue10)
						$('#editStudentForm [name="batchYear"]').val(student.fieldValue11)
						$('#editStudentForm [name="currentSemester"]').val(student.fieldValue12)
						$('#editStudentForm [name="shift"]').val(student.fieldValue13)

						$('#editStudentModal').modal('show')
					})
					.fail(handleError)
			})
			.fail(handleError)
	}

	function handleStudentUpdate() {
		const form = $('#editStudentForm')[0]
		if (!form.checkValidity()) {
			form.classList.add('was-validated')
			return
		}

		const formData = new FormData(form)
		const studentData = Object.fromEntries(formData.entries())
		const dataId = studentData.dataId

		$.ajax({
			url: `${ENDPOINTS.formdata}/${dataId}`,
			method: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify(studentData),
			success: function (response) {
				$('#editStudentModal').modal('hide')
				form.reset()
				loadStudents()
				showAlert('Success', 'Student updated successfully!', 'success')
			},
			error: handleError,
		})
	}

	// Add event listener for update button
	$('#updateStudentBtn').click(handleStudentUpdate)

	window.deleteStudent = function (id) {
		if (confirm('Are you sure you want to delete this student?')) {
			$.ajax({
				url: `${ENDPOINTS.formdata}/${id}`,
				method: 'DELETE',
				success: function () {
					loadStudents()
					showAlert('Success', 'Student deleted successfully!', 'success')
				},
				error: handleError,
			})
		}
	}

	window.deleteAdmin = function (id) {
		if (confirm('Are you sure you want to delete this administrator?')) {
			$.ajax({
				url: `${ENDPOINTS.admins}/${id}`,
				method: 'DELETE',
				success: function () {
					loadAdmins()
					showAlert('Success', 'Administrator deleted successfully!', 'success')
				},
				error: handleError,
			})
		}
	}

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
