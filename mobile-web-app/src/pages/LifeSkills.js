import { useState } from 'react';
import { lessonList } from '../data/cooking.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    if (index < lessonList.length - 1) {
      setIndex(index + 1);
    }
  }

  function handleBackClick() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

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

  let lesson = lessonList[index];
  return (
    <>
      {index > 0 && <button onClick={handleBackClick}>Back</button>}

      {index < lessonList.length - 1 && <button onClick={handleNextClick}>Next</button>}

      <h2>
        <i>{lesson.title} </i> by {lesson.author}
      </h2>
      <p>{lesson.description}</p>

      <button onClick={handleMoreClick}>{showMore ? 'Hide' : 'Show'} details</button>

      {showMore && <ContentManager lesson={lesson} />}

      <h3>
        ({index + 1} of {lessonList.length})
      </h3>
    </>
  );
}
