import express from "express";
import path from "path";

const viewsRouter = express.Router();

/// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움
viewsRouter.use("/", serveStatic("home"));
viewsRouter.use("/register", serveStatic("register"));
viewsRouter.use("/login", serveStatic("login"));
viewsRouter.use("/cart", serveStatic("cart"));
viewsRouter.use("/products", serveStatic("products"));
viewsRouter.use("/my-page", serveStatic("my-page"));
viewsRouter.use("/monthly-painter", serveStatic("monthly-painter"));
viewsRouter.use("/add-product", serveStatic("add-product"));
viewsRouter.use("/order", serveStatic("order"));
viewsRouter.use("/my-page/my-order", serveStatic("my-order"));
viewsRouter.use("/products/type", serveStatic("work-type"));
viewsRouter.use("/products/detail", serveStatic("work-detail"));
viewsRouter.use("/painter", serveStatic("painter"));
viewsRouter.use("/order-finished", serveStatic("order-finished"));
viewsRouter.use("/introduce", serveStatic("introduce"));
// viewsRouter.use("*", serveStatic());
// viewsRouter.use("asian/asian", serveStatic("products"));

// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use("/", serveStatic(""));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  let option = "";
  option = { index: `${resource}.html` };
  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}

export { viewsRouter };
