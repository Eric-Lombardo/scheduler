import React from 'react';

// the props it takes in
// onAdd:Function to be called when the user clicks the Add button

function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        onClick={props.onAdd}
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
      />
    </main>
  );
}

export default Empty;