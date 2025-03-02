import React, { ReactNode } from 'react';

interface TableHeaderCellProps {
  children: ReactNode;
  scope?: 'col' | 'row';
  className?: string;
}

const TableHeaderCell = ({
  children,
  scope = 'col',
  className = ''
}: TableHeaderCellProps) => {
  return (
    <th
      scope={scope}
      className={`px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
};

export default TableHeaderCell;
