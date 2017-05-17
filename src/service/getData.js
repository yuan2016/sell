var t = 1;
var getInfo = function () {
  setTimeout(function () {
    t++;
  }, 1000);
  return t;
}
export {getInfo}
