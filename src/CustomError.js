export default function CustomError (message) {
  this.message = message;
}
CustomError.prototype = Object.create(Error.prototype);
