export const validation = (fieldName, value) => {

  let data = {
    isValid: true,
    message: "",
  };

  switch (fieldName) {
    case "email":
      let emailValid = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ).test(value);
      if (!emailValid) {
        data.isValid = false;
        data.message = "Invalid email";
      }
      break;
    case "password":
      if (value.length < 6) {
        data.isValid = false;
        data.message = "Password must be atleast 6 length";
      }
      break;

    case "isNumeric":
      let isNumeric = typeof value == "string" && value.length > 0 && !isNaN(value);
      if (!isNumeric) {
        data.isValid = false;
        data.message = "Required number";
      }
      break;

    default:
      break;
  }

  return data;
};

// console.log(validation("email", "testgmail.com"));
// console.log(validation('isNumeric' , '1w23'));
// console.log(validation('password' , '1w2ww3'));
// console.log(validation('passwocrd' , '1w2ww3'));

