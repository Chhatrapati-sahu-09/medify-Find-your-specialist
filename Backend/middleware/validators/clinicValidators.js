const Joi = require('joi');

const clinicSignupSchema = Joi.object({
  clinicName: Joi.string().min(2).max(200).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().optional().allow(''),
  clinicAddress: Joi.string().optional().allow(''),
  description: Joi.string().optional().allow(''),
  banner: Joi.string().optional().allow(''),
  profilePicture: Joi.string().optional().allow(''),
  open: Joi.alternatives().try(Joi.boolean(), Joi.string()),
  distance: Joi.string().optional().allow(''),
  yearsOfService: Joi.number().optional(),
  infrastructure: Joi.array().items(Joi.string()).optional(),
  servicesOffered: Joi.array().items(Joi.string()).optional(),
  facilities: Joi.array().items(Joi.string()).optional(),
  location: Joi.object({ lat: Joi.number(), lng: Joi.number() }).optional(),
  priceRange: Joi.string().optional().allow('')
});

const clinicSigninSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const doctorSchema = Joi.object({
  name: Joi.string().min(2).max(200).required(),
  specialization: Joi.string().optional().allow(''),
  experience: Joi.string().optional().allow(''),
  qualifications: Joi.string().optional().allow(''),
  consultationFee: Joi.number().optional(),
  profilePicture: Joi.string().optional().allow(''),
  workingHours: Joi.string().optional().allow(''),
  phone: Joi.string().optional().allow(''),
  email: Joi.string().email().optional().allow(''),
  active: Joi.boolean().optional()
});

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
  };
}

module.exports = {
  validateClinicSignup: validate(clinicSignupSchema),
  validateClinicSignin: validate(clinicSigninSchema),
  validateDoctor: validate(doctorSchema)
};
