import axios from "axios";

console.log(await axios.get("http://naver.com"));
console.log("이게 먼저 출력되나?");
