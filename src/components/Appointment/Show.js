import React from 'react';

// takes in these props
// student:String eg. "Lydia Miller-Jones"
// interviewer:Object we can use the interview object that already exists in stories/index.js for this
// onEdit:Function to be called when the user clicks the Edit button
// onDelete:Function to be called when the user clicks the Delete button

function Show(props) {

  function cancelInterview() {
    props.onDelete();
  }

  function editInterview() {
    props.onEdit();
  }

  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{props.interviewer && props.interviewer.name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            onClick={editInterview}
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
          />
          <img
            onClick={cancelInterview}
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
          />
        </section>
      </section>
    </main>
  );
}

export default Show;