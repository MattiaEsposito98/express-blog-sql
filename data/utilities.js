function validate(req) {
  const { title, slug, content, image, tags } = req.body

  // VALIDAZIONE DEI DATI
  const errors = []

  if (!title) {
    errors.push('Title is required')
  }

  //  if (!slug) {
  // 	errors.push('Slug is required')
  // }

  if (!content) {
    errors.push('Content is required')
  }

  if (!image) {
    errors.push('Image is required')
  }

  if (!tags) {
    errors.push('Tags is required')
  }

  return errors
}


//Funzione per covertire identifier
function converter(identifier, arrayMain) {
  if (!isNaN(identifier)) {
    identifier = parseInt(identifier)
    return arrayMain.find((el) => el.id === identifier)  //Cerco per ID
  } else {
    return arrayMain.find((el) => el.slug === identifier) //Cerco per slug
  }
}


function converterForDestroy(identifier, arrayMain) {
  if (!isNaN(identifier)) {
    identifier = parseInt(identifier)
    return arrayMain.findIndex((el) => el.id === identifier)  //Cerco per ID
  } else {
    return arrayMain.findIndex((el) => el.slug === identifier) //Cerco per slug
  }
}

module.exports = { validate, converter, converterForDestroy }