import { useEffect, useState } from 'react';
import LessonDetails from '../components/LessonDetails.js';
import { SetMealOutlined, SettingsInputAntennaTwoTone } from '@mui/icons-material';

export default function Gallery({ lesson, showDetails, mount, setMount }) {
//   const [showMore, setShowMore] = useState(false);
  const [points, setPoints] = useState(0);

//   useEffect(() => {
//     async function addPoints() {
//         const response = await fetch(`http://localhost:8000/api/pointLookup?username=remember`, method = 'POST');
        
//     }
//   })

async function handleMoreClick() {
  try {
    // Make a GET request to your API to fetch the user's points
    const response = await fetch(`http://localhost:8000/api/pointLookupAdd?username=remember`, {
        method: 'POST'
    });
    setMount(mount+1)
    // setPoints(1);
    // location.reload();
    
    //console.log(points)
  } catch (error) {
    console.error('Failed to fetch points:', error);
  }
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
    <div className="timeline-item">
      <div className="timeline-content">
        <h2>{lesson.title}</h2>
        <p>{lesson.description}</p>
        {showDetails && <ContentManager lesson={lesson} />}
        {showDetails && <button onClick={handleMoreClick} className="complete">
          Complete
        </button>}
      </div>
    </div>
  );

}

