import { useState } from 'react';
//import { lessonList } from '../data/cooking.js';

export default function LessonDetails({lesson}) {
  // const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

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

  return (
    <div>
    <h2>
      <i>{lesson.title} </i> by {lesson.author}
    </h2>
    <p>{lesson.description}</p>

    <button onClick={handleMoreClick}>
      {showMore ? 'Hide' : 'Show'} details
    </button>

    {showMore && <ContentManager lesson={lesson} />}

  </div>
  )
}
