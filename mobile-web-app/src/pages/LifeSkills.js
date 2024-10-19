import { useState } from 'react';
import { cookingList } from '../data/cooking.js';
import { financialList } from '../data/financial-literacy.js';
import { stressList } from '../data/stress-management.js';
import { careerList } from '../data/career-readiness.js';
import LessonDetails from '../components/LessonDetails.js';
import { Typography } from '@mui/material';

export default function LifeSkills() {
  const [lessonPlan, setLessonPlan] = useState('Cooking'); // Default is 'Cooking'

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
