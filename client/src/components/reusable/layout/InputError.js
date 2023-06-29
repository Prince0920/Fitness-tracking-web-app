import React from "react";
const InputError = ({ message }) => {
  return (
    <div id="cname" class="emsg" style={{ color: "#c12020" }}>
      {message}
    </div>
  );
};

export default InputError;
