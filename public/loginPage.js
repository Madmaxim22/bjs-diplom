"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    console.log(response);
    if (response.success) {
      location.reload();
    } else {
      alert(response.error);
    }
  });
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    console.log(response);
    if (response.success) {
      location.reload();
    } else {
      alert(response.error);
    }
  });
};