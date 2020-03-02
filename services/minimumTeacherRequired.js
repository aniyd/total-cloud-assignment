exports.minTeacher = getMinTeacherRequired;

function getMinTeacherRequired(numberOfClass, numberOfteacher, cb) {
  // total number of teachers required for co-teaching is twice the no. of class
  cb(2*numberOfClass - numberOfteacher);
}
