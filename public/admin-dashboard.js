$(document).ready(function () {
	// Check authentication
	if (!utils.checkAuth()) return

	// Constants
	const API_URL = 'http://localhost:3000/api'
	const ENDPOINTS = {
		admins: `${API_URL}/users`,
		departments: `${API_URL}/departments`,
		formdata: `${API_URL}/form-data`,
	}

	const ITEMS_PER_PAGE = 10
	let currentPage = 1
	let totalStudents = 0
	let currentStudentId = null

	// Initialize
	loadUserInfo()
	loadStudents()
	// loadDepartments()
	// setupFormValidation()
	setupEventListeners()

	function loadUserInfo() {
		const user = JSON.parse(localStorage.getItem('user'))
		console.log('user', user)
		$('#adminName').text(user.username)
	}

	function setupEventListeners() {
		// Navigation
		$('.nav-link[data-section]').click(handleNavigation)
		$('#logoutBtn').click(utils.logout)

		// Form submissions
		$('#saveStudentBtn').click(() => handleSave('student'))
		$('#saveAdminBtn').click(() => handleSave('admin'))

		// Pagination
		$('#studentPagination').on('click', '.page-link', function (e) {
			e.preventDefault()
			const page = $(this).data('page')
			if (page) {
				loadStudents(page)
			}
		})
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

	// function loadStudents() {
	// 	// fetch departments
	// 	$.get(ENDPOINTS.departments)
	// 		.done((departments) => {
	// 			const departmentMap = departments.reduce((map, dept) => {
	// 				map[dept.departmentId] = dept.departmentName
	// 				return map
	// 			}, {})

	// 			// fetch and display students
	// 			$.get(ENDPOINTS.formdata)
	// 				.done((formData) => {
	// 					const rows = formData
	// 						.map(
	// 							(student) => `
	//                   <tr>
	//                       <td>${student.dataId}</td>
	//                       <td>${student.fieldValue1}</td>
	//                       <td>${student.fieldValue2 + ' ' + student.fieldValue3}</td>
	//                       <td>${student.fieldValue5}</td>
	//                       <td>${student.fieldValue6}</td>
	//                       <td>${student.fieldValue7}</td>
	//                       <td>${student.fieldValue8}</td>
	//                       <td>${student.fieldValue9}</td>
	//                       <td>${departmentMap[student.fieldValue10]}</td>
	//                       <td>${student.fieldValue11}</td>
	//                       <td>${student.fieldValue12}</td>
	//                       <td>${student.fieldValue13}</td>
	//                       <td>
	//                           <button class="btn btn-sm btn-primary" onclick="editStudent(${student.dataId})">
	//                               <i class="bi bi-pencil"></i>
	//                           </button>
	//                       </td>

	//                       <td>
	//                           <button class="btn btn-sm btn-danger" onclick="deleteStudent(${student.dataId})">
	//                               <i class="bi bi-trash"></i>
	//                           </button>
	//                       </td>
	//                   </tr>
	//               `
	// 						)
	// 						.join('')

	// 					$('#studentsTableBody').html(rows)
	// 				})
	// 				.fail(handleError)
	// 		})
	// 		.fail(handleError)
	// }

	function loadStudents(page = 1) {
		$.get(ENDPOINTS.departments)
			.done((departments) => {
				const departmentMap = departments.reduce((map, dept) => {
					map[dept.departmentId] = dept.departmentName
					return map
				}, {})

				$.get(`${ENDPOINTS.formdata}?page=${page}&limit=${ITEMS_PER_PAGE}`)
					.done((response) => {
						// Update total from the response
						totalStudents = response.total

						// Map over response.data instead of response
						const rows = response.data
							.map(
								(student) => `
                  <tr style="cursor: pointer">
                      <td onclick="showStudentDetails(${student.dataId})">${student.dataId}</td>
                      <td onclick="showStudentDetails(${student.dataId})">${student.fieldValue1}</td>
                      <td onclick="showStudentDetails(${student.dataId})">${student.fieldValue2} ${
									student.fieldValue3
								}</td>
                      <td onclick="showStudentDetails(${student.dataId})">${student.fieldValue5}</td>
                      <td onclick="showStudentDetails(${student.dataId})">${departmentMap[student.fieldValue10]}</td>
                      <td onclick="showStudentDetails(${student.dataId})">${student.fieldValue11}</td>
                      <td>
                          <button class="btn btn-sm btn-outline-primary me-1" onclick="editStudent(${student.dataId})">
                              <i class="bi bi-pencil"></i>
                          </button>
                          <button class="btn btn-sm btn-outline-danger" onclick="deleteStudent(${student.dataId})">
                              <i class="bi bi-trash"></i>
                          </button>
                      </td>
                  </tr>
                `
							)
							.join('')

						$('#studentsTableBody').html(rows)

						// Use totalPages from response if available, otherwise calculate it
						const totalPages = response.totalPages || Math.ceil(totalStudents / ITEMS_PER_PAGE)
						updatePagination(page, totalPages)

						// Show total records info
						const start = (page - 1) * ITEMS_PER_PAGE + 1
						const end = Math.min(page * ITEMS_PER_PAGE, totalStudents)
						$('#totalRecords').text(`Showing ${start} to ${end} of ${totalStudents} entries`)
					})
					.fail(handleError)
			})
			.fail(handleError)
	}

	window.showStudentDetails = function (studentId) {
		currentStudentId = studentId

		// Get departments for mapping
		$.get(ENDPOINTS.departments)
			.done((departments) => {
				const departmentMap = departments.reduce((map, dept) => {
					map[dept.departmentId] = dept.departmentName
					return map
				}, {})

				// Get student details
				$.get(`${ENDPOINTS.formdata}/${studentId}`)
					.done((student) => {
						// Hide list view and show details view
						$('#studentsList').addClass('d-none')
						$('#studentDetails').removeClass('d-none')

						// Update details view with student information
						$('#detailRegNo').text(student.fieldValue1)
						$('#detailName').text(`${student.fieldValue2} ${student.fieldValue3}`)
						$('#detailEmail').text(student.fieldValue5)
						$('#detailGender').text(student.fieldValue6)
						$('#detailDob').text(new Date(student.fieldValue7).toLocaleDateString())
						$('#detailAddress').text(student.fieldValue8)
						$('#detailPhone').text(student.fieldValue9)
						$('#detailDepartment').text(departmentMap[student.fieldValue10])
						$('#detailBatch').text(student.fieldValue11)
						$('#detailSemester').text(student.fieldValue12)
						$('#detailShift').text(student.fieldValue13)
					})
					.fail(handleError)
			})
			.fail(handleError)
	}

	window.showStudentsList = function () {
		currentStudentId = null
		$('#studentsList').removeClass('d-none')
		$('#studentDetails').addClass('d-none')
	}

	function updatePagination(currentPage, totalPages) {
		const pagination = $('#studentPagination')
		pagination.empty()

		// Don't show pagination if there's only one page
		if (totalPages <= 1) return

		// Previous button
		pagination.append(`
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">&laquo;</a>
        </li>
    `)

		// Calculate range of pages to show
		let startPage = Math.max(1, currentPage - 2)
		let endPage = Math.min(totalPages, startPage + 4)

		// Adjust start if we're near the end
		if (endPage - startPage < 4) {
			startPage = Math.max(1, endPage - 4)
		}

		// Page numbers
		for (let i = startPage; i <= endPage; i++) {
			pagination.append(`
            <li class="page-item ${i === parseInt(currentPage) ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `)
		}

		// Next button
		pagination.append(`
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">&raquo;</a>
        </li>
    `)

		// Add click event for pagination
		$('.page-link')
			.off('click')
			.on('click', function (e) {
				e.preventDefault()
				const page = $(this).data('page')
				if (page && page >= 1 && page <= totalPages) {
					loadStudents(page)
				}
			})
	}

	// function loadAdmins() {
	// 	$.get(ENDPOINTS.admins)
	// 		.done((admins) => {
	// 			const rows = admins
	// 				.map(
	// 					(admin) => `
	//                 <tr>
	//                     <td>${admin.userId}</td>
	//                     <td>${admin.username}</td>
	//                     <td>${admin.email}</td>
	//                     <td>${admin.userTypeID === 1 ? 'Admin' : 'Normal'}</td>
	//                     <td>
	//                     <span>
	//                       <button class="btn btn-sm btn-primary" onclick="editAdmin(${admin.userId})">
	//                           <i class="bi bi-pencil"></i>
	//                       </button>

	//                       <button class="btn btn-sm btn-danger" onclick="deleteAdmin(${admin.userId})">
	//                           <i class="bi bi-trash"></i>
	//                       </button>
	//                       </span>
	//                     </td>
	//                 </tr>
	//             `
	// 				)
	// 				.join('')
	// 			$('#adminsTableBody').html(rows)
	// 		})
	// 		.fail(handleError)
	// }

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
                    <td><span class="badge ${admin.userTypeID === 1 ? 'bg-success' : 'bg-primary'}">${
							admin.userTypeID === 1 ? 'Admin' : 'Normal'
						}</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="editAdmin(${admin.userId})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteAdmin(${admin.userId})">
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

		const formDataObj = Object.fromEntries(new FormData(form).entries())
		console.log('formDataObj', formDataObj)

		if (!formDataObj.registrationNumber) {
			formDataObj.registrationNumber = generateRegistrationNumber()
		}

		const profilePictureInput = form.querySelector('input[name="profilePicture"]')
		const academicDocsInput = form.querySelector('input[name="academicDocs"]')

		// convert a File object to Base64 string
		function fileToBase64(file) {
			return new Promise((resolve, reject) => {
				if (!file) return resolve(null)
				const reader = new FileReader()
				reader.onload = () => resolve(reader.result.split(',')[1]) // Extract Base64 part
				reader.onerror = reject
				reader.readAsDataURL(file)
			})
		}

		// Read the files (if present)
		Promise.all([fileToBase64(profilePictureInput.files[0]), fileToBase64(academicDocsInput.files[0])])
			.then(([profilePictureBase64, academicDocsBase64]) => {
				// Attach file information to payload
				if (profilePictureBase64) {
					formDataObj.profilePicture = {
						name: profilePictureInput.files[0].name,
						data: profilePictureBase64,
						type: profilePictureInput.files[0].type,
						size: profilePictureInput.files[0].size,
					}
				}
				if (academicDocsBase64) {
					formDataObj.academicDocs = {
						name: academicDocsInput.files[0].name,
						data: academicDocsBase64,
						type: academicDocsInput.files[0].type,
						size: academicDocsInput.files[0].size,
					}
				}

				$.ajax({
					url: ENDPOINTS.formdata,
					method: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(formDataObj),
					success: function (response) {
						$('#addStudentModal').modal('hide')
						form.reset()
						loadStudents()
						showAlert('Success', 'Student added successfully!', 'success')
					},
					error: handleError,
				})
			})
			.catch((error) => {
				showAlert('Error', 'Failed to read file data', 'danger')
				console.error(error)
			})
	}

	// Add file validation on input change
	$('input[name="profilePicture"]').on('change', function () {
		const file = this.files[0]
		if (file) {
			if (!file.type.startsWith('image/')) {
				showAlert('Error', 'Please select a valid image file', 'danger')
				this.value = ''
				return
			}
			if (file.size > 5 * 1024 * 1024) {
				showAlert('Error', 'Profile picture must be less than 5MB', 'danger')
				this.value = ''
			}
		}
	})

	$('input[name="academicDocs"]').on('change', function () {
		const file = this.files[0]
		if (file) {
			if (file.type !== 'application/pdf') {
				showAlert('Error', 'Please select a PDF file', 'danger')
				this.value = ''
				return
			}
			if (file.size > 10 * 1024 * 1024) {
				showAlert('Error', 'Academic documents must be less than 10MB', 'danger')
				this.value = ''
			}
		}
	})

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
		console.log('studentData', studentData)
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

	window.editAdmin = function (userId) {
		$.get(`${ENDPOINTS.admins}/${userId}`)
			.done((user) => {
				// Populate the edit form
				$('#editUserId').val(user.userId)
				$('#editAdminForm [name="username"]').val(user.username)
				$('#editAdminForm [name="email"]').val(user.email)
				$('#editAdminForm [name="userTypeID"]').val(user.userTypeID)

				$('#editAdminModal').modal('show')
			})
			.fail(handleError)
	}

	function handleAdminUpdate() {
		const form = $('#editAdminForm')[0]
		if (!form.checkValidity()) {
			form.classList.add('was-validated')
			return
		}

		const userData = {
			userId: $('#editUserId').val(),
			username: $('#editAdminForm [name="username"]').val(),
			email: $('#editAdminForm [name="email"]').val(),
			userTypeID: $('#editAdminForm [name="userTypeID"]').val(),
		}

		console.log('userData', userData)

		$.ajax({
			url: `${ENDPOINTS.admins}/${userData.userId}`,
			method: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify(userData),
			success: function (response) {
				$('#editAdminModal').modal('hide')
				form.reset()
				loadAdmins()
				showAlert('Success', 'User updated successfully!', 'success')
			},
			error: handleError,
		})
	}

	$('#updateAdminBtn').click(handleAdminUpdate)

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
