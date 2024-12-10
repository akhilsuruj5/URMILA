const express = require("express");
const { addMember, getTeam , updateMember, deleteMember} = require('../controllers/teamController');
const router = express.Router();


router.get("/team" , getTeam);
router.post("/team" , addMember);
router.put("/team/:id" , updateMember);
router.delete("/team/:id" ,  deleteMember);

module.exports = router;
