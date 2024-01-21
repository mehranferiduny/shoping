exports.generateUniqueNumericId=()=> {
  const idLength = 8;
  let uniqueID = '';

  for (let i = 0; i < idLength; i++) {
    uniqueID += Math.floor(Math.random() * 10); // اعداد تصادفی از 0 تا 9
  }

  return uniqueID;
}




