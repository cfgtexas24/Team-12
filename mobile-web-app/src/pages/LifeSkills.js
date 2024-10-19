import { useState } from 'react';
import { lessonList } from '../data/cooking.js';
import LessonDetails from '../components/LessonDetails.js';

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
  // }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  function VideoPlayer({ link }) {
    return (
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src={link}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  function ContentManager({ lesson }) {
    if (lesson.type === 'YouTube') {
      return <VideoPlayer link={lesson.url} />;
    } else {
      return (
        <>
          <p>{lesson.text}</p>
          <p>
            Read more at <a href={lesson.url}>{lesson.author}</a>
          </p>
        </>
      );
    }
  }

  const list = lessonList.map((lesson) => (
   <LessonDetails lesson={lesson}/>
  ));

  return <>{list}</>;
}
