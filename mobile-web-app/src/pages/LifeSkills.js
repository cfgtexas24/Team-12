import { useState } from 'react';
import { lessonList } from '../data/cooking.js';
import LessonDetails from '../components/LessonDetails.js';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export default function Gallery() {
  // const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  // function handleNextClick() {
  //   if (index < lessonList.length - 1) {
  //     setIndex(index + 1);
  //   }
  // }

  // function handleBackClick() {
  //   if (index > 0) {
  //     setIndex(index - 1);
  //   }
  //
  // const list = lessonList.map((lesson) => (
  //   <LessonDetails lesson={lesson}/>
   
  // ));

  // return (
  //   <div>
  //     {list}
  //   </div>
  // );
  return (
    <div className="timeline">
      {lessonList.map((lesson) => (
        <LessonDetails lesson={lesson} />
      ))}
    </div>
  );
}
