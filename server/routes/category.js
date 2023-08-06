const express = require("express");

const router = express.Router();

//import controllers
const {
	create,
	list,
	read,
	update,
	remove,
	getSubs,
} = require("../controllers/category");
//import middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);
router.get("/category/subs/:_id", getSubs);

module.exports = router;
