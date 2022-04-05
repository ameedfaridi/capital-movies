export function handleFavourite(posterObj, isAdded, belongsTo) {
  let posterArray = JSON.parse(localStorage.getItem(`belongsTo-${belongsTo}`));
  if (posterArray && (isAdded === 0 || isAdded)) {
    posterArray.splice(isAdded, 1);
  } else if (posterArray && !isAdded) {
    posterArray = [...posterArray, posterObj];
  } else {
    posterArray = [posterObj];
  }

  localStorage.setItem(`belongsTo-${belongsTo}`, JSON.stringify(posterArray));
}

export function isPresent(id, belongsTo) {
  let posterArray = JSON.parse(localStorage.getItem(`belongsTo-${belongsTo}`));
  if (!posterArray) return false;

  const isAdded = posterArray.findIndex((p) => p.id === id);

  console.log(isAdded)

  return isAdded !== -1 ? isAdded : false;
}
