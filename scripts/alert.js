/**
 * Displays an alert if the user is not using Chrome, since
 * it is the only fully supported browser.
 */
function alertIfNotChrome() {
  if (navigator.userAgent.indexOf("Chrome") === -1) {
    alert("This page works best on Chrome.\nIf you're having problems using this page, try to open it in Chrome.");
  }
}