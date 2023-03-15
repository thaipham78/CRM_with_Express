function index(req,res) {
  res.status(404).render("pagenotfound");
}

module.exports={index};