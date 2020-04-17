export const convertNameToSlug = (name) => {
  return name.split(" ").join("-").toLowerCase()
}
