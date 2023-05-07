const express = require('express');
const router = express.Router();

const {
   
    getAllProductsTesting,
    getAllUsers,
    getindividualUser,
    search_sort_pagenation,
    insertUser,
    updateUser,
    deleteUser
} = require("../controllers/products")

const middleware = require('../middleware/middleware');
router.route("/testing",middleware).get(getAllProductsTesting);
router.route("/getAllUsers",middleware).get(getAllUsers);
router.route("/search_sort_pagenation",middleware).get(search_sort_pagenation);
router.route("/insertUser").post(insertUser);
router.route("/getindividualUser",middleware).get(getindividualUser);
router.route("/updateUser",middleware).put(updateUser);
router.route("/deleteUser",middleware).delete(deleteUser);

module.exports = router;