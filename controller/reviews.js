const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Reviews = require('../models/Reviews');
const Bootcamps = require('../models/Bootcamps');

// @desc Get reviews
// @route GET /api/v1/reviews
// @route GET /api/v1/bootcamps/:bootcampId/reviews
// @access Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if(req.params.bootcampId) {
    const reviews = await Reviews.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    })
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc Get Signle review
// @route GET /api/v1/reviews/:id
// @access Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Reviews.findById(req.params.id).populate({
    path: 'Bootcamp',
    select: 'name description',
  });

  if(!review) {
    return next(new ErrorResponse(`No review found with the id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});