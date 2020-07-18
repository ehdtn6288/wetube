import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //   video: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Video", // 데이터가 어디서 온건지, 연결하고자 하는 모델의 이름과 같게 해줘야 한다.
  //   },
});

const model = mongoose.model("Comment", CommentSchema);
export default model;
