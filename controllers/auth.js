const User = require("../models/User.js");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../utils/async.js");

// desc          Register new user
// @route        POST /api/v1/register
// @access       Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
    
    res.status(200).json({success: true})
});