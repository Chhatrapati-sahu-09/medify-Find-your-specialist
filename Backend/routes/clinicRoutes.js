const express = require('express');
const router = express.Router();
const { SignUpClinic, SignInClinic, GetClinic, AddDoctor, UpdateDoctor, DeleteDoctor, GetClinicById, AddReview } = require('../controllers/clinicController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateClinicSignup, validateClinicSignin, validateDoctor } = require('../middleware/validators/clinicValidators');

router.post('/signup', validateClinicSignup, SignUpClinic);
router.post('/signin', validateClinicSignin, SignInClinic);

// Protected clinic routes
router.get('/me', authMiddleware, GetClinic);
router.post('/doctor', authMiddleware, validateDoctor, AddDoctor);
router.put('/doctor/:id', authMiddleware, validateDoctor, UpdateDoctor);
router.delete('/doctor/:id', authMiddleware, DeleteDoctor);

// Public: get clinic by id
router.get('/:id', GetClinicById);
router.post('/:id/review', AddReview);

module.exports = router;
