const express = require('express');
const { 
  getCourses, getCourse, addCourse, updateCourse, deleteCourse
 } = require('../controller/courses')

 const Course = require('../models/Courses');
 const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

 const router = express.Router({ mergeParams: true});

 router.route('/')
  .get(advancedResults(Course,{
      path: 'bootcamp',
      select: 'name description'
    }), getCourses)
  .post(protect, addCourse);

 router.route('/:id')
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

 module.exports = router;