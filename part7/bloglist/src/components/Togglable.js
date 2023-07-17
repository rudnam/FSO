import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          onClick={toggleVisibility}
          className="bg-blue-700 py-1.5 px-4 rounded-lg hover:bg-blue-800"
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        <button
          onClick={toggleVisibility}
          className="bg-blue-700 py-1.5 px-4 rounded-lg hover:bg-blue-800"
        >
          cancel
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default Togglable;
