import React from 'react';

const Timeline = ({ items }) => {
  return (
    <div className="timeline">
      {items.map((item, index) => (
        <TimelineItem key={index} item={item} />
        
      ))}
    </div>
  );
};

const TimelineItem = ({ item }) => {
  return (
    <div>
      <button className="circle-button"></button>

      <span>{item.title}</span>
      <p className="side-text">{item.type}</p>
      <p className="side-text">{item.description}</p>
    </div>
  );
};


export default Timeline;
