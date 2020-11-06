const router = require("express").Router();
const moment = require("moment");
const { v4: uuid } = require("uuid");
const { models } = require("../helpers");

router.get("/", (req, res) => {
  const valid = validation.validateItem(req.query);
  if (valid === null) {
    models.item.findOne(req.query, (err, item) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          status: 500,
          message:
            "An unknown error occured, we will investigate it as soon as possible",
        });
        return;
      }
      res.status(200).json({
        status: 200,
        item,
      });
    });
  } else {
    res.status(403).send(valid);
  }
});

router.post("/", (req, res) => {
  const valid = validation.validateNewItem(req.body);
  if (valid === null) {
    new models.item(req.body)
      .save()
      .then((item) => {
        res.status(201).json({
          status: 201,
          item,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          status: 500,
          message:
            "An unknown error occured, we will investigate it as soon as possible",
        });
      });
  } else {
    res.status(403).send(valid);
  }
});

router.put("/", (req, res) => {
  const valid = validation.validateItem(req.query);
  if (valid === null) {
    models.item.findOneAndUpdate(
      req.query,
      req.body,
      { new: true },
      (err, updatedItem) => {
        if (err) {
          console.error(err);
          res.status(500).json({
            status: 500,
            message:
              "An unknown error occured, we will investigate it as soon as possible",
          });
          return;
        }
        res.status(200).json({
          status: 200,
          item: updatedItem,
        });
      }
    );
  } else {
    res.status(403).send(valid);
  }
});

router.delete("/", (req, res) => {
  const valid = validation.validateItem(req.body);
  if (valid === null) {
    models.item.findOneAndDelete(req.body, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          status: 500,
          message:
            "An unknown error occured, we will investigate it as soon as possible",
        });
        return;
      }
      res.sendStatus(204);
    });
  } else {
    res.status(403).send(valid);
  }
});

module.exports = router;
