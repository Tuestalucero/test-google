export function showMessage(message, type = "success") {
    Toastify({
      text: message,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: type === "success" ? "green" : "red",
        color: type === "success" ? "blue" : "black",
        border: type === "success" ? "double 5px yellow" : "solid 3px green",
      },
      // onClick: function () { } // Callback after click
    }).showToast();
}