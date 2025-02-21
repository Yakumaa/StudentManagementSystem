const User = require('../models/User')
const UserHistory = require('../models/UserHistory')
const sequelize = require('../utils/config')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

function formatLocalDate(date) {
	const pad = (n) => n.toString().padStart(2, '0')
	const year = date.getFullYear()
	const month = pad(date.getMonth() + 1)
	const day = pad(date.getDate())
	const hours = pad(date.getHours())
	const minutes = pad(date.getMinutes())
	const seconds = pad(date.getSeconds())
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

userRouter.get('/', async (req, res) => {
	try {
		const users = await User.findAll({ where: { isActive: 1 } })
		res.json(users)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

userRouter.get('/:id', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id)
		if (user) {
			res.json(user)
		} else {
			res.status(404).end()
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

userRouter.post('/', async (req, res) => {
	console.log('req.body', req.body)
	let t
	try {
		t = await sequelize.transaction()

		const hashedPassword = await bcrypt.hash(req.body.passwordHash, 10)

		const user = await User.create({ ...req.body, passwordHash: hashedPassword }, { transaction: t })

		console.log('user', user)
		const userID = user.dataValues.userId
		console.log('userId', userID)

		await UserHistory.create(
			{
				userId: userID,
				username: user.dataValues.username,
				email: user.dataValues.email,
				passwordHash: user.dataValues.passwordHash,
				userTypeID: user.dataValues.userTypeID,
				createdAt: sequelize.literal(
					`CONVERT(DATETIME, '${formatLocalDate(new Date(user.dataValues.createdAt))}', 120)`
				),
				updatedAt: sequelize.literal(
					`CONVERT(DATETIME, '${formatLocalDate(new Date(user.dataValues.updatedAt))}', 120)`
				),
				isActive: user.dataValues.isActive,
				changeType: 'INSERT',
			},
			{ transaction: t }
		)

		await t.commit()
		res.status(201).json(user)
	} catch (error) {
		if (t && !t.finished) {
			try {
				await t.rollback()
			} catch (rollbackError) {
				console.error('Rollback error:', rollbackError)
			}
		}
		res.status(400).json({ error: error.message })
	}
})

userRouter.put('/:id', async (req, res) => {
	let t
	try {
		t = await sequelize.transaction()
		const userId = req.params.id

		await User.update(req.body, {
			where: { userId: userId },
			transaction: t,
		})

		const updatedUser = await User.findByPk(userId, { transaction: t })

		console.log('updatedUser', updatedUser)

		await UserHistory.create(
			{
				userId: updatedUser.dataValues.userId,
				username: updatedUser.dataValues.username,
				email: updatedUser.dataValues.email,
				passwordHash: updatedUser.dataValues.passwordHash,
				userTypeID: updatedUser.dataValues.userTypeID,
				createdAt: sequelize.literal(
					`CONVERT(DATETIME, '${formatLocalDate(new Date(updatedUser.dataValues.createdAt))}', 120)`
				),
				updatedAt: sequelize.literal(
					`CONVERT(DATETIME, '${formatLocalDate(new Date(updatedUser.dataValues.updatedAt))}', 120)`
				),
				isActive: updatedUser.dataValues.isActive,
				changeType: 'UPDATE',
			},
			{ transaction: t }
		)

		await t.commit()
		res.json(updatedUser)
	} catch (error) {
		console.error('Transaction error:', error)

		// Only rollback if transaction exists and hasn't been committed or rolled back
		if (t && !t.finished) {
			try {
				await t.rollback()
			} catch (rollbackError) {
				console.error('Rollback error:', rollbackError)
			}
		}
		res.status(400).json({ error: error.message })
	}
})

userRouter.delete('/:id', async (req, res) => {
	let t
	try {
		t = await sequelize.transaction()
		const userId = req.params.id

		await User.update(
			{ isActive: 0 },
			{
				where: { userId: userId },
				transaction: t,
			}
		)

		// Fetch the updated user to get current values
		const updatedUser = await User.findByPk(userId, {
			transaction: t,
			raw: false,
		})

		if (!updatedUser) {
			throw new Error('User not found after update')
		}

		await UserHistory.create(
			{
				userId: updatedUser.dataValues.userId,
				username: updatedUser.dataValues.username,
				email: updatedUser.dataValues.email,
				passwordHash: updatedUser.dataValues.passwordHash,
				userTypeID: updatedUser.dataValues.userTypeID,
				createdAt: sequelize.literal(
					`CONVERT(DATETIME, '${formatLocalDate(new Date(updatedUser.dataValues.createdAt))}', 120)`
				),
				updatedAt: sequelize.literal(
					`CONVERT(DATETIME, '${formatLocalDate(new Date(updatedUser.dataValues.updatedAt))}', 120)`
				),
				isActive: updatedUser.dataValues.isActive,
				changeType: 'DELETE',
			},
			{
				transaction: t,
			}
		)
		await t.commit()

		res.status(204).end()
	} catch (error) {
		console.error('Transaction error:', error)

		// Only rollback if transaction exists and hasn't been committed
		if (t && !t.finished) {
			try {
				await t.rollback()
			} catch (rollbackError) {
				console.error('Rollback error:', rollbackError)
			}
		}

		res.status(400).json({ error: error.message })
	}
})

module.exports = userRouter
