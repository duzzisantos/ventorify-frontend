const Message = require("../models/messages");

//Create new message instance
exports.create = async (req, res) => {
  if (req.body === "") {
    console.error("Message must contain a body");
  }

  const message = new Message({
    recipient: req.body.recipient,
    sender: req.body.sender,
    sent: req.body.sent,
    seen: req.body.seen,
    subject: req.body.subject,
    messageBody: req.body.messageBody,
  });

  message
    .save(message)
    .then((data) => {
      data ? res.status(200) : res.status(500);
    })
    .catch((err) => {
      console.error(err);
    });
};

//Get all messages which have a valid Object ID
exports.findAll = async (req, res) => {
  const user = req.query.id;
  var condition = user ? { $regex: new RegExp(user), $options: "gi" } : {};
  Message.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err.message);
    });
};

//Get a particular message resource based on its unique Object ID
exports.findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({
        error: "Message with this ID not found.",
        cause: "Object ID does not exist or request has no body.",
      });
    } else {
      message.seen = true;
    }

    return res.json(message);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error.", cause: err.message });
  }
};

//Reply one message resource based on its unique Object ID

exports.update = (req, res) => {
  const id = req.params.id;
  Message.findByIdAndUpdate(id, { $set: req.body }, (err, data) => {
    if (err) {
      res.status(404).json({
        message: "Error in updating resource. Resource not found",
        cause: err.message,
      });
    } else if (data) {
      res.status(200).json({ message: "Resource successfully updated." });
    }
  });
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;
  Message.findByIdAndRemove(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};
