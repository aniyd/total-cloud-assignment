let fs = require("fs");

let file_dir = __dirname + "/../files";
let file_path_prefix = file_dir + "/Teacher wise class timetable";
let english = file_path_prefix + " - English.csv";
let hindi = file_path_prefix + " - Hindi.csv";
let kannnada = file_path_prefix + " - Kannada.csv";
let maths = file_path_prefix + " - Maths.csv";
let science = file_path_prefix + " - Science.csv";

//Initialise the 2D Array for class routine
let classWiseTimeTable = [];

//require csv-parser
let csvParser = require("../utility/csv-parser");

exports.classWiseTimetable = generateClassWiseTimetable;

function generateClassWiseTimetable(type, cb) {
  //these are classes in csv files
  initClasWiseTimeTable([6, 7, 8, 9, 10]).then(resp => {
    Promise.all([
      csvParser.parser(english),
      csvParser.parser(hindi),
      csvParser.parser(kannnada),
      csvParser.parser(maths),
      csvParser.parser(science)
    ]).then(values => {
      updateClassRoutine(type, values).then(result => {
        cb(result);
      });
    });
  });
}

function initClasWiseTimeTable(classArray) {
  return new Promise(resolve => {
    for (let i = 0; i < classArray.length; i++) {
      classWiseTimeTable.push([
        [
          "--",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        ["8:00 AM", "", "", "", "", "", ""],
        ["9:00 AM", "", "", "", "", "", ""],
        ["10:00 AM", "", "", "", "", "", ""],
        ["11:00 AM", "", "", "", "", "", ""],
        ["12:00 PM", "", "", "", "", "", ""],
        ["1:00 PM", "", "", "", "", "", ""],
        ["2:00 PM", "", "", "", "", "", ""],
        ["3:00 PM", "", "", "", "", "", ""],
        ["4:00 PM", "", "", "", "", "", ""]
      ]);
      if (i == classArray.length - 1) {
        resolve(true);
      }
    }
  });
}

function updateClassRoutine(type, values) {
  return new Promise(resolve => {
    for (let v = 0; v < values.length; v++) {
      for (let r = 1; r < 10; r++) {
        for (let c = 1; c < 7; c++) {
          let std = null;
          if (!isNaN(parseInt(values[v][r][c]))) {
            std = parseInt(values[v][r][c]);
          }

          if (std) {
            if (v == 0) {
              classWiseTimeTable[std - 6][r][c] = "English";
            } else if (v == 1) {
              classWiseTimeTable[parseInt(std - 6)][r][c] = "Hindi";
            } else if (v == 2) {
              classWiseTimeTable[parseInt(std - 6)][r][c] = "Kannada";
            } else if (v == 3) {
              classWiseTimeTable[parseInt(std - 6)][r][c] = "Maths";
            } else if (v == 4) {
              classWiseTimeTable[parseInt(std - 6)][r][c] = "Science";
            }
          }

          if (v == values.length - 1 && r == 9 && c == 6) {
            if (type == "array") {
              resolve(classWiseTimeTable);
            } else {
              storingRoutineINCsv(classWiseTimeTable).then(files => {
                resolve(files);
              });
            }
          }
        }
      }
    }
  });
}

function storingRoutineINCsv(classWiseTimeTable) {
  return new Promise(resolve => {
    let routine_file = [];
    for (let i = 0; i < classWiseTimeTable.length; i++) {
      let classRoutineFilepath = require("path").join(
        file_dir,
        `/class-${6 + i}.csv`
      );

      fs.unlink(classRoutineFilepath, err => {
        routine_file.push(classRoutineFilepath);
        for (let j = 0; j < 10; j++) {
          fs.appendFileSync(
            classRoutineFilepath,
            classWiseTimeTable[i][j] + "\n"
          );

          if (i == classWiseTimeTable.length - 1 && j == 9) {
            resolve(routine_file);
          }
        }
      });
    }
  });
}
