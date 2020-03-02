async function init() {
  let arg_length = process.argv.length;

  if (arg_length != 3) {
    console.log("\x1b[31m", "Invalid arguments!");
  } else {
    let arg = process.argv[2];

    if (arg == 1) {
      console.log(
        "\x1b[32m",
        "Process to generate class wise time-table started...\n"
      );
      let result = require("./services/generateClassWiseTimetable").classWiseTimetable(
        "csv",
        resp => {
          console.log("Class Wise Routine generated....\n");
          console.log("List of files for class wise routine:");

          for (let i = 0; i < resp.length; i++) {
            console.log("\x1b[33m", `class-${6 + i}: ${resp[i]}\n`);
          }
        }
      );
    } else if (arg == 2) {
      console.log(
        "\x1b[32m",
        "Generating teacher-wise time-table(when no teacher idle)...\n"
      );

      let result = require("./services/generateTeacherWiseTimetable").teacherWise(
        resp => {
          console.log("Teacher Wise Routine generated....\n");
          console.log("List of files for teacher wise routine:");

          let sub = ["English", "Hindi", "Kannada", "Maths", "Science"];
          for (let i = 0; i < resp.length; i++) {
            console.log("\x1b[33m", `class-${sub[i]}: ${resp[i]}\n`);
          }
        }
      );
    } else if (arg == 3) {
      console.log(
        "\x1b[32m",
        "Calculating minimum number of teachers required for co-teaching...\n"
      );
      let number_of_class = 5,
        number_of_teacher_available = 5;
      require("./services/minimumTeacherRequired").minTeacher(
        number_of_class,
        number_of_teacher_available,
        resp => {
          console.log("\x1b[33m", `Minimum Teacher required = ${resp}`);
          console.log(
            "\x1b[32m",
            "NOTE: Total teacher must be twice the number of class available for teaching to implement the concept of co-teaching."
          );
        }
      );
    } else {
      console.log("\x1b[31m", "Invalid arguments!");
    }
  }
}

init();
