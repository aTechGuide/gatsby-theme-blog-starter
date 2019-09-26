module.exports = themeOptions => {
  const basePath = themeOptions.basePath || "/"
  const trackingId = themeOptions.trackingId || "UA-11111XXX-1"
  const postsPath = themeOptions.postsPath || "posts"
  const postsPerPage = themeOptions.postsPerPage || "2"
  const imagesPath = themeOptions.imagesPath || "images"
  const mailchimpURL = themeOptions.mailchimpURL || ""

  return {
    basePath,
    trackingId,
    postsPath,
    postsPerPage,
    imagesPath,
    mailchimpURL
  }
}