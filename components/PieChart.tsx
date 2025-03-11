import React from 'react';
import { StudentStats } from '@/services/studentService';
import { getTagColor } from '@/utils/colors';

interface PieChartProps {
  statistics: StudentStats;
  totalStudents: number;
}

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

// Helper function to convert tag names to Hebrew
function tagToHebrew(tag: string): string {
  const tagMap: Record<string, string> = {
    green: 'ירוק',
    yellow: 'צהוב',
    orange: 'כתום',
    red: 'אדום',
    blue: 'כחול',
    purple: 'סגול'
  };
  return tagMap[tag] || tag;
}

const PieChart: React.FC<PieChartProps> = ({ statistics, totalStudents }) => {
  // Calculate the total count of all tags
  const totalTagsCount = Object.values(statistics).reduce(
    (sum, count) => sum + count,
    0
  );

  // Use the total tags count as the calculation base for the pie chart
  const calculationBase = totalTagsCount;

  // חישוב של הזוויות בדיאגרמת העוגה
  let startAngle = 0;

  // יצירת הסגמנטים של העוגה
  const segments = Object.entries(statistics)
    .map(([tag, count]) => {
      if (count === 0) return null;

      // Calculate percentage of total tags
      const tagPercentage = count / calculationBase;
      const tagAngle = tagPercentage * 360;
      const largeArcFlag = tagAngle > 180 ? 1 : 0;

      // חישוב הנקודות
      const startPoint = polarToCartesian(50, 50, 50, startAngle);
      const endPoint = polarToCartesian(50, 50, 50, startAngle + tagAngle);

      // יצירת ה-path
      const path = [
        `M 50 50`,
        `L ${startPoint.x} ${startPoint.y}`,
        `A 50 50 0 ${largeArcFlag} 1 ${endPoint.x} ${endPoint.y}`,
        `Z`
      ].join(' ');

      // Calculate the label position (in the middle of the segment)
      const labelAngle = startAngle + tagAngle / 2;
      const labelRadius = 37; // Slightly inside the pie
      const labelPos = polarToCartesian(50, 50, labelRadius, labelAngle);

      const segment = {
        tag,
        count,
        tagPercentage: (tagPercentage * 100).toFixed(1), // % of all tags
        tagPercentageValue: tagPercentage * 100, // numeric value for comparison
        path,
        color: getTagColor(tag),
        labelX: labelPos.x,
        labelY: labelPos.y
      };

      startAngle += tagAngle;
      return segment;
    })
    .filter(Boolean);

  return (
    <div className='relative w-full max-w-md mx-auto'>
      {/* Information header about what the chart represents */}
      <div className='mb-4 text-center'>
        <h3 className='font-semibold'>התפלגות התגים</h3>
        <div className='text-sm text-gray-600'></div>
      </div>

      {/* Pie chart */}
      <div className='w-64 h-64 mx-auto'>
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

          {/* Add count labels inside the segments */}
          {segments.map(
            (segment, index) =>
              segment &&
              segment.tagPercentageValue > 5 && (
                <text
                  key={`label-${index}`}
                  x={segment.labelX}
                  y={segment.labelY}
                  textAnchor='middle'
                  dominantBaseline='middle'
                  fontSize='4'
                  fill='white'
                  fontWeight='bold'
                >
                  {segment.count}
                </text>
              )
          )}

          {/* מעגל מרכזי לבן - without any numbers */}
          <circle cx='50' cy='50' r='25' fill='white' />
        </svg>
      </div>

      {/* Legend showing tag percentages */}
      <div className='mt-4 grid grid-cols-2 gap-2 text-xs mx-auto max-w-fit'>
        {segments.map(
          (segment, index) =>
            segment && (
              <div key={`legend-${index}`} className='flex items-center'>
                <div
                  className='w-3 h-3 mr-1'
                  style={{ backgroundColor: segment.color }}
                ></div>
                <span>
                  {tagToHebrew(segment.tag)}: {segment.count} (
                  {segment.tagPercentage}%)
                </span>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default PieChart;
