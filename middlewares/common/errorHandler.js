const createError = require("http-errors");

const notFoundErrorHandler = (req, res, next) =>{
    next(createError(404, 'Your requested content was not found'))
}

//default error handler
const errorHandler = (err, req, res, next) =>{
    // res.locals.title = 'Error Page'
    // res.render('error')
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {message: err.message}

    res.status(err.status || 500)

    if(!res.locals.html){
        res.render('error', {
            title: 'Error page'
        })
    }else{
        res.json(res.locals.error)
    }
}

module.exports = {
    notFoundErrorHandler,
    errorHandler
}