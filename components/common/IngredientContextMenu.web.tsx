import React, { useState, useEffect } from "react";

const IngredientContextMenu = () => {
  return (
    <div
        onContextMenu={(e) => {
          e.preventDefault();
          console.log("Right Click");
    }}
  >
    IngredientContextMenu
  </div>
  );
};
export default IngredientContextMenu;