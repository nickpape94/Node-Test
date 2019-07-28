const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const itemValidator = require("../validator/itemValidator");
const Item = require("../models/itemModel");

