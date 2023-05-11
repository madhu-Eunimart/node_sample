class CustomLogs {
  static writeRetailLogsToONDC(message, action = "default", application = "BAP") {
    console.log("============== RETAIL " + application + " ONDC START " + action + " ============");
    console.log(message);
    console.log("============== RETAIL " + application + " ONDC END " + action + " ============");
  }

  static writeLSPLogsToONDC(message, action = "default", application = "BAP") {
    console.log("============== LSP " + application + " ONDC START " + action + " ============");
    console.log(message);
    console.log("============== LSP " + application + " ONDC END " + action + " ============");
  }

  static writeIGMLogsToONDC(message, action = "default", application = "BAP") {
    console.log("============== IGM " + application + " ONDC START " + action + " ============");
    console.log(message);
    console.log("============== IGM " + application + " ONDC END " + action + " ============");
  }

  static writeRatingLogsToONDC(message, action = "default", application = "BAP") {
    console.log("============== Rating " + application + " ONDC START " + action + " ============");
    console.log(message);
    console.log("============== Rating " + application + " ONDC END " + action + " ============");
  }
  static writeRatingLogsToONDC(message, action = "default", application = "BAP") {
    console.log("============== Rating " + application + " ONDC START " + action + " ============");
    console.log(message);
    console.log("============== Rating " + application + " ONDC END " + action + " ============");
  }

  static writeValidationLogsToONDC(validation_flag, error_list){
    console.log("\n============== Validation start ===============================================");
    console.log("Validation Result : ", validation_flag, "\nValidation Errors : ", error_list)
    console.log("============== Validation End ===================================================\n");
  }

  static writeRSPLogsToONDC(message, action = "default", application = "BAP") {
    console.log("============== " + application + " ONDC START " + action + " ============");
    console.log(message);
    console.log("============== " + application + " ONDC END " + action + " ============");
  }
}

export default CustomLogs;
