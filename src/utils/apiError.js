class apiError extends Error {
  constructor(statusCode, message = "", errors = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
  ToJson() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      errors: this.errors,
      success: this.success,
    };
  }
}
export default apiError;
