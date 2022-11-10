// 문자열+숫자로 이루어진 랜덤 5글자 반환
export const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

// 이메일 형식인지 확인 (true 혹은 false 반환)
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// 숫자에 쉼표를 추가함. (10000 -> 10,000)
export const addCommas = (n) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 13,000원, 2개 등의 문자열에서 쉼표, 글자 등 제외 후 숫자만 뺴냄
// 예시: 13,000원 -> 13000, 20,000개 -> 20000
export const convertToNumber = (string) => {
  return parseInt(string.replace(/(,|개|원)/g, ""));
};

// ms만큼 기다리게 함.
export const wait = (ms) => {
  return new Promise((r) => setTimeout(r, ms));
};

export const goToMypage = () => {
  const token = sessionStorage.getItem("token");

  if (token) {
    // alert("로그인 상태에서는 접근할 수 없는 페이지입니다.");
    window.location.replace("/my-page");
  }
};

export const goToAddProductPage = (role) => {
  if (role === "painter-user") {
    window.location.replace("/add-product");
  } else {
    alert("작가인 경우에만 상품 등록이 가능합니다!");
    window.location.replace("/");
  }
};

// export const logout = () => {
//   const token = sessionStorage.getItem("token");

//   if (token) {
//     console.log("click!");
//     sessionStorage.removeItem("token");
//     alert("로그아웃 성공!");
//     window.location.replace("/");
//   } else {
//     alert("로그인 먼저 해주세요!");
//     window.location.replace("/login");
//   }
// };

// 로그인 여부(토큰 존재 여부) 확인
export const checkLogin = () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    // 현재 페이지의 url 주소 추출하기
    const pathname = window.location.pathname;
    const search = window.location.search;

    // 로그인 후 다시 지금 페이지로 자동으로 돌아가도록 하기 위한 준비작업임.
    window.location.replace(`/login?previouspage=${pathname + search}`);
  }
};
