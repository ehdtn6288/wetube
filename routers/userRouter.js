import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  editProfile,
  changePassword,
} from "../controller/userController";

const userRouter = express.Router(); //여기서 export하면,  import 할때  =>   import {userRouter} from "./router"

userRouter.get(routes.home, users);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail(), userDetail);
/*!!!! userDetail은 /:id로 변하는 값을 받는다. 따라서, /:id가 포함된 경로에대한 로직이 먼저
정의되면, 그 아래있는 경로에 대해서, /:id의 변하는 텍스트값을 가진 경로로 인식하여, /:id에 대한
로직만 동작하고, 아래있는 코드는 작동하지 않는다. 
따라서, ~!!! userDetail과 같이 /:id가 포함된 경로는 제일 아래줄에 입력해주자! 

아니면, videoRouter처럼, /:id/edit과 같이 /:id 이후에 하위 경로를 포함하여 나타내면 된다. 
*/

export default userRouter;
