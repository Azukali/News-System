import React from "react";
import Style from "./Child.module.scss";

console.log(Style);
function Child() {
  return (
    <div>
      <ul>
        <li className={Style.item}>1</li>
        <li className={Style.item}>2</li>
        <li className={Style.item}>3</li>
        <li className={Style.item}>4</li>
      </ul>
    </div>
  );
}

export default Child;
