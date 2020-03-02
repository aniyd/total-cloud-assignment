let fs = require("fs");

let file_dir = __dirname + "/../files";
let file_path_prefix = file_dir + "/Teacher wise class timetable";
let english = file_path_prefix + " - English.csv";
let hindi = file_path_prefix + " - Hindi.csv";
let kannada = file_path_prefix + " - Kannada.csv";
let maths = file_path_prefix + " - Maths.csv";
let science = file_path_prefix + " - Science.csv";

let generateClassWise = require("./generateClassWiseTimetable");
//require csv-parser
let csvParser = require("../utility/csv-parser");

exports.teacherWise = teacherWiseTimetable;

function teacherWiseTimetable(cb) {
  let result = generateClassWise.classWiseTimetable("array", resp => {
    Promise.all([
      csvParser.parser(english),
      csvParser.parser(hindi),
      csvParser.parser(kannada),
      csvParser.parser(maths),
      csvParser.parser(science)
    ]).then(values => {
      updateTeacherWiseTimetable(resp, values).then(updatedValues => {
        storingInCsv(updatedValues).then(csvFiles => {
          cb(csvFiles);
        });
      });
    });
  });
}

function updateTeacherWiseTimetable(resp, providedTeacherWiseRoutine) {
  return new Promise(resolve => {
    for (let r = 1; r < 10; r++) {
      for (let c = 1; c < 7; c++) {
        let sub = ["English", "Hindi", "Kannada", "Maths", "Science"];
        let empty_class = [];
        for (let cl = 0; cl < resp.length; cl++) {
          if (resp[cl][r][c] != "") {
            sub.splice(sub.indexOf(resp[cl][r][c]), 1);
          } else {
            empty_class.push(cl);
          }

          if (cl == resp.length - 1) {
            if (sub.length == 0 && r == 9 && c == 6) {
              resolve(providedTeacherWiseRoutine);
            } else {
              for (let j = 0; j < sub.length; j++) {
                if (sub[j] == "English") {
                  providedTeacherWiseRoutine[0][r][c] =
                    6 + empty_class[j] + "th";
                } else if (sub[j] == "Hindi") {
                  providedTeacherWiseRoutine[1][r][c] =
                    6 + empty_class[j] + "th";
                } else if (sub[j] == "Kannada") {
                  providedTeacherWiseRoutine[2][r][c] =
                    6 + empty_class[j] + "th";
                } else if (sub[j] == "Maths") {
                  providedTeacherWiseRoutine[3][r][c] =
                    6 + empty_class[j] + "th";
                } else if (sub[j] == "Science") {
                  providedTeacherWiseRoutine[4][r][c] =
                    6 + empty_class[j] + "th";
                }

                if (r == 9 && c == 6 && j == sub.length - 1) {
                  resolve(providedTeacherWiseRoutine);
                }
              }
            }
          }
        }
      }
    }
  });
}

function storingInCsv(values) {
  let sub = ["English", "Hindi", "Kannada", "Maths", "Science"];
  return new Promise(resolve => {
    let routine_file = [];
    for (let i = 0; i < values.length; i++) {
      let teacherWiseRoutineFilepath = require("path").join(
        file_dir,
        `/Teacher-${sub[i]}.csv`
      );

      fs.unlink(teacherWiseRoutineFilepath, err => {
        routine_file.push(teacherWiseRoutineFilepath);
        for (let j = 0; j < 10; j++) {
          fs.appendFileSync(teacherWiseRoutineFilepath, values[i][j] + "\n");

          if (i == values.length - 1 && j == 9) {
            resolve(routine_file);
          }
        }
      });
    }
  });
}
