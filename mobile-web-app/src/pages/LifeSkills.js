import { useState, useEffect } from 'react';
import { cookingList } from '../data/cooking.js';
import { financialList } from '../data/financial-literacy.js';
import { stressList } from '../data/stress-management.js';
import { careerList } from '../data/career-readiness.js';
import LessonDetails from '../components/LessonDetails.js';
import { Typography } from '@mui/material';

export default function LifeSkills() {
  const [lessonPlan, setLessonPlan] = useState('Cooking');
  const [points, setPoints] = useState(0);

  // Fetch points when the component mounts or when lessonPlan changes
  useEffect(() => {
    async function fetchPoints() {
      try {
        // Make a GET request to your API to fetch the user's points
        const response = await fetch(`http://localhost:8000/api/pointLookup?username=remember`);
        // console.log(response)
        const data = await response.json();
        //console.log("hello")
        console.log(data.points)
        console.log(lessonPlan)
        setPoints(data.points[lessonPlan]); // Assuming your API returns a 'points' field
        //console.log(points)
      } catch (error) {
        console.error('Failed to fetch points:', error);
      }
    }

    fetchPoints();
  }, [lessonPlan]); // The useEffect runs when lessonPlan changes

  function handleDropdownChange(event) {
    setLessonPlan(event.target.value);
  }

  return (
    <div>
      {/* Yellow bar at the top */}
      <div className="yellowBarStyle">
        <Typography variant="h6" component="div" style={{ margin: 0, color: '#000' }}>
          Learning Portal
        </Typography>
      </div>

      
      
      <h2>Select a Lesson Plan:</h2>
      <select value={lessonPlan} onChange={handleDropdownChange} className="dropdownStyle">
        <option value="Cooking">Cooking</option>
        <option value="FinancialLiteracy">Financial Literacy</option>
        <option value="StressManagement">Stress Management</option>
        <option value="CareerReadiness">Career Readiness</option>
      </select>
      
      {lessonPlan === 'Cooking' &&
        <div><progress value={points} max={cookingList.length} className='progress'>70 %</progress></div>
      }
      {lessonPlan === 'FinancialLiteracy' &&
        <div><progress value={points} max={financialList.length} className='progress'>70 %</progress></div>
      }
      {lessonPlan === 'StressManagement' &&
        <div><progress value={points} max={stressList.length} className='progress'>70 %</progress></div>
      }
      {lessonPlan === 'CareerReadiness' &&
        <div><progress value={points} max={careerList.length} className='progress'>70 %</progress></div>
      }

      {lessonPlan === 'Cooking' && (
        <div className="timeline">
          {cookingList.map((lesson, idx) => (
            <LessonDetails key={idx} lesson={lesson} />
          ))}
        </div>
      )}

      {lessonPlan === 'FinancialLiteracy' && (
        <div className="timeline">
          {financialList.map((lesson, idx) => (
            <LessonDetails key={idx} lesson={lesson} />
          ))}
        </div>
      )}

      {lessonPlan === 'StressManagement' && (
        <div className="timeline">
          {stressList.map((lesson, idx) => (
            <LessonDetails key={idx} lesson={lesson} />
          ))}
        </div>
      )}

      {lessonPlan === 'CareerReadiness' && (
        <div className="timeline">
          {careerList.map((lesson, idx) => (
            <LessonDetails key={idx} lesson={lesson} />
          ))}
        </div>
      )}
    </div>
  );
}
