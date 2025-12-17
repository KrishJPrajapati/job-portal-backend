const Joi = require("joi");

exports.applySchema = Joi.object({
    jobId: Joi.string().required()
});
