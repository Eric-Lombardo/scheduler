import React from 'react';

import DayListItem from './DayListItem';

// 3 props it takes
// days:Array a list of day objects (each object includes an id, name, and spots)
// day:String the currently selected day
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

function DayList(props) {

  return (
    <ul>
      {props.days.map(item => <DayListItem
        key={item.id}
        name={item.name}
        spots={item.spots}
        selected={item.name === props.day ? true : false}
        setDay={props.setDay}
      />
      )}
    </ul>
  );
}

export default DayList;