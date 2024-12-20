function errorsHandler(err, req, res,next) {
	 console.log("funzione errorsHandler")
	res.status(500)
	res.json({
		error: true,
		message: "Post non trovato"

	})
}

module.exports = errorsHandler