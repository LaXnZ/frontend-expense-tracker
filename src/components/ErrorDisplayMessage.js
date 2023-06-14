import React from "react";

export default function ErrorDisplayMessage(children) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <p>{children}</p>
    </div>
  );
}
