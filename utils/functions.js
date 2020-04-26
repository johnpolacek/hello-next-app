export const findBySlug = (array, key, slug) => {
  return array.filter((obj) => {
    console.log(stringToSlug(obj[key]))
    return stringToSlug(obj[key]) === slug
  })[0]
}

export const stringToSlug = (str) => {
  return str.split(" ").join("-").toLowerCase()
}
