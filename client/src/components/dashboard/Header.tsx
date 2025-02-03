import React from 'react';

const Header = ({ title, subtitle = '' }: DashboardHeaderProps) => {
  return (
    <div className="dashboard__header">
      <h1 className="dashboard__title">{title}</h1>
      <h2 className="dashboard__subtitle">{subtitle}</h2>
    </div>
  );
};

export default Header;
