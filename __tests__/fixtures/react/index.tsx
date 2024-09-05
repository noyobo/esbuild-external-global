import React from "react";

export const App = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div
      onClick={() => {
        setCount((prev) => prev + 1);
      }}
    >
      App {count}
    </div>
  );
};
