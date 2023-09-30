const express = require("express");
const router =  express.Router();
const card_controller = require("./../controllers/card");

// routes for users -----------------------------------
router.get("/charge/:card_id",card_controller.get_charge.bind(card_controller));
router.put("/charge/:card_id",card_controller.plus_charge.bind(card_controller));
router.put("/max/:card_id",card_controller.max_charge.bind(card_controller));
router.post("/create_card",card_controller.create_card.bind(card_controller));

module.exports = router;