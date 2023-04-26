
function checkIdMatch(obj, id, proprietyName) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key][proprietyName] === id) return true;
    }
  }
  return false;
}



export { checkIdMatch };
