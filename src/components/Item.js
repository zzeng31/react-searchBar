import React from "react";

import "./Item.css";

const Item = (props) => {
  // const [deleteText, setDeleteText] = useState('');

  const openHandler = () => {
    // setDeleteText('(Deleted!)');
    // props.onDelete(props.id);
  };

  return (
    <li className="goal-item" onClick={openHandler}>
      {props.children}
    </li>
  );
};

export default Item;
