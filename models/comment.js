"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CommentSchema = new _mongoose["default"].Schema({
  text: {
    type: String,
    required: "Text is required"
  },
  createdAt: {
    type: Date,
    "default": Date.now()
  },
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  video: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Video" // 데이터가 어디서 온건지, 연결하고자 하는 모델의 이름과 같게 해줘야 한다.

  },
  comment: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  subComments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }]
});
CommentSchema.post("remove", removeLinkedDocuments);

function removeLinkedDocuments(doc) {
  // doc will be the removed Person document
  Commnet.remove({
    _id: {
      $in: doc.subComments
    }
  });
}

var model = _mongoose["default"].model("Comment", CommentSchema);

var _default = model;
exports["default"] = _default;