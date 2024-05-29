/*
 * Title: apiResponse.js
 * Description : Custom response handler
 * Author: Tanvir Hassan Joy
 * Date: 2024-05-29 11:21:44
 */

class apiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export default apiResponse;
