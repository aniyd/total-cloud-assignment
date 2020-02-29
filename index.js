async function init() {
  let arg_length = process.argv.length;

  if (arg_length != 3) {
    console.log("\x1b[31m", "Invalid arguments!");
  } else {
    let arg = process.argv[2];
    console.log(
      "\x1b[32m",
      "Process to generate class wise time-table started...\n"
    );

    if (arg == 1) {
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
      let result = require("./services/generateClassWiseTimetable").classWiseTimetable(
        "array",
        resp => {
          console.log(resp[0]);
        }
      );
    }
  }
}

init();
