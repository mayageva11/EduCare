import React from 'react';
import { StudentStats } from '@/services/studentService';
import { getTagColor } from '@/utils/colors';

interface PieChartProps {
  statistics: StudentStats;
  totalStudents: number;
}

// פונקציה עזר להמרת קואורדינטות קוטביות לקרטזיות
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

const PieChart: React.FC<PieChartProps> = ({ statistics, totalStudents }) => {
  // חישוב של הזוויות בדיאגרמת העוגה
  let startAngle = 0;

  // יצירת הסגמנטים של העוגה
  const segments = Object.entries(statistics)
    .map(([tag, count]) => {
      if (count === 0) return null;

      const percentage = count / totalStudents;
      const angle = percentage * 360;
      const largeArcFlag = angle > 180 ? 1 : 0;

      // חישוב הנקודות
      const startPoint = polarToCartesian(50, 50, 50, startAngle);
      const endPoint = polarToCartesian(50, 50, 50, startAngle + angle);

      // יצירת ה-path
      const path = [
        `M 50 50`,
        `L ${startPoint.x} ${startPoint.y}`,
        `A 50 50 0 ${largeArcFlag} 1 ${endPoint.x} ${endPoint.y}`,
        `Z`
      ].join(' ');

      const segment = {
        tag,
        path,
        color: getTagColor(tag)
      };

      startAngle += angle;
      return segment;
    })
    .filter(Boolean);

  return (
    <div className='relative w-64 h-64 mx-auto'>
      <svg viewBox='0 0 100 100'>
        {segments.map(
          (segment, index) =>
            segment && (
              <path
                key={index}
                d={segment.path}
                fill={segment.color}
                stroke='#fff'
                strokeWidth='0.5'
              />
            )
        )}

        {/* מעגל מרכזי לבן */}
        <circle cx='50' cy='50' r='25' fill='white' />

        {/* טקסט של סך התלמידים */}
        <text
          x='50'
          y='47'
          textAnchor='middle'
          dominantBaseline='middle'
          fontSize='8'
          fontWeight='bold'
        >
          {totalStudents}
        </text>
        <text
          x='50'
          y='55'
          textAnchor='middle'
          dominantBaseline='middle'
          fontSize='5'
        >
          תלמידים
        </text>
      </svg>
    </div>
  );
};

export default PieChart;
