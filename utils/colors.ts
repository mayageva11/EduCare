// פונקציה שמחזירה את הצבע המתאים לכל תגית
export function getTagColor(tag: string): string {
  const colors = {
    green: '#4ade80', // ירוק
    yellow: '#facc15', // צהוב
    orange: '#fb923c', // כתום
    red: '#f87171', // אדום
    blue: '#60a5fa', // כחול
    purple: '#c084fc' // סגול
  };

  return colors[tag as keyof typeof colors] || '#9ca3af'; // אפור כברירת מחדל
}

// מילון תיאורים לכל תגית
export const tagLabels = {
  green: 'לומד, מתפקד בבית ספר ואין בעיות',
  yellow: 'קשב וריכוז וקשיים רגשיים',
  orange: 'קשיים לימודיים, רגשיים, והתנהגותיים',
  red: 'קשיים לימודיים, התנהגותיים, חברתיים ומשפחתיים',
  blue: 'מדווח קב"ס',
  purple: 'מדווח רווחה'
};
