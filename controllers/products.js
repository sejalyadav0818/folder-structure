const router = require("../routes/products");
const { sequelize, User } = require("../models"); // import models
const { Sequelize } = require("sequelize");


//test 
const getAllProductsTesting = async (req, res) => {
  res.status(200).json({ message: "hello test" });
};

//search  + sort  + pagenation //localhost:8000/users/search?query=yadav&page=1&limit=3
const search_sort_pagenation= async (req, res) => {
  const { query, order, page, limit } = req.query;
  const offset = (page - 1) * limit;

  // console.log(searchf, searchl, searche);
  const queryOptions = await User.findAndCountAll({
    where: {
      [Op.or]: [
        {
          name: { [Op.like]: `%${query}%` },
        },
        {
          email: { [Op.like]: `%${query}%` },
        },
      ],
    },
    order: [
      order === "desc" ? ["name", "DESC"] : ["name", "ASC"],
      order === "desc" ? ["email", "DESC"] : ["name", "ASC"],
    ],

    limit: parseInt(limit),
    offset: offset,
  });

  const totalPages = Math.ceil(queryOptions.count / limit);

  res.json({
    data: {
      users: queryOptions.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: totalPages,
        totalResults: queryOptions.count,
      },
    },
    error: null,
  });
};

// Create a new user
const insertUser =  async (req, res) => {
  try {
    // const  {firstName }= req.body.firstName;
    console.log(req.body);
    const user = await User.create({ firstName});
    res.json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Unable to create user",
      error: error.message,
    });
  }
};

//get all users
const getAllUsers =  async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({
      data: {
        users: users,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      data: null,
      error: {
        success: false,
        message: "Unable to retrieve users",
        errorMessage: error.message,
      },
    });
  }
};

// Get a user by ID
const getindividualUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
        error: null,
      });
    } else {
      res.json({
        success: true,
        message: "User retrieved successfully",
        data: user,
        error: null,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Unable to retrieve user",
      data: null,
      error: error.message,
    });
  }
};

// Update a user by ID
const updateUser =  async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      const { name, email } = req.body;
      await user.update({ name, email });
      res.json({
        success: true,
        message: "User updated successfully",
        user: user,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Unable to update user",
      error: error.message,
    });
  }
};

// Delete a user by ID
const deleteUser =  async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      await user.destroy();
      res.json({
        success: true,
        message: "User deleted successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Unable to delete user",
      error: error.message,
    });
  }
};

module.exports = {  getAllProductsTesting ,getAllUsers,getindividualUser,insertUser,updateUser,deleteUser,search_sort_pagenation };
