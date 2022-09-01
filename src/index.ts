import UserBusiness from "./business/UserBusiness"
import { app } from "./controller/app"
import UserController from "./controller/UserController"
import UserData from "./data/UserData"
import { Authenticator } from "./services/Authenticator"
import { HashManager } from "./services/HashManager"
import { IdGenerator } from "./services/IdGenerator"

const userBusiness = new UserBusiness(
    new UserData(),
    new IdGenerator(),
    new HashManager(),
    new Authenticator()
)


const userController = new UserController(
    userBusiness
)

app.get("/usuario", userController.getAll)
// app.get("/usuario/:id", userController.getById)
app.post("/usuario", userController.signup)
// app.put("/usuario/:id", userController.update)
// app.delete("/usuario/:id", userController.delete)