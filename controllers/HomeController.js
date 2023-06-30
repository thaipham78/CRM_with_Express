
async function index(req, res) {
  try {
    await res.render("index", { isLoginIn: true });
  } catch (errors) {
    logger.log("error", errors);
    return next(errors);
  }
}

module.exports = { index };
