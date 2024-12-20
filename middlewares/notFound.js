function notFound(req, res) {
	console.log("funzione notFound")
	res.status(404).json({
		error: 'Not found',
		message: 'Pagina non trovata da notfound',
   
	})
}

module.exports = notFound