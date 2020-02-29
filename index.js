async function init() {
  let arg_length = process.argv.length;

  if (arg_length != 3) {
    console.log("Invalid arguments!");
  } else {
    let arg = process.argv[2];
    if (arg == 1) {
        let result = require("./services/generateClassWiseTimetable").classWiseTimetable(resp=>{
            console.log("Class Wise Routine generated....\n");
            console.log("List of files for class wise routine:");
            
            for (let i = 0; i < resp.length; i++) {
              console.log(`class-${6 + i}: ${resp[i]}`);              
            }
            
        });
    }
  }
}

init();
