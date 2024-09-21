const mlSchema = require("../../models/ml-schema");

class ML {
  async createML(req, res) {
    const { ml, description } = req.body;
    if (!ml) {
      return res.json(404, {
        status: "error",
        message: "fill required fields",
      });
    }
    try {
      const data = {
        ml,
        description,
        id: req.User.id,
      };
      const result = await mlSchema.create(data);
      if (!result) {
        return res.json(404, {
          status: "error",
          message: "ml not created",
        });
      } else {
        return res.json(200, {
          status: "success",
          message: "ml created successfully",
          result,
        });
      }
    } catch (error) {
      return res.json(404, {
        status: "error",
        message: error.message,
      });
      console.log("try is not working");
    }
  }
  async ML_List(req, res) {
    try {
      const result = await mlSchema.find({ id: req.User.id, status: true });
      if (!result) {
        return res.json(404, {
          status: "error",
          message: "ml not found",
        });
      } else {
        return res.json(200, {
          status: "success",
          message: "ml founded",
          result,
        });
      }
    } catch (error) {
      return res.json(404, {
        status: "error",
        message: error.message,
      });
      console.log("try is not working");
    }
  }
}

module.exports = new ML();
