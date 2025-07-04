// src/components/DynamicBreadcrumbs.js
import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { ClassNames } from '@emotion/react';

const DynamicBreadcrumbs = () => {
  const location = useLocation();

  // Split path and filter out empty strings
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      <NavLink
        to="/"
        style={{ textDecoration: 'none', color: 'inherit' }}
        className="md:!text-sm text-xs"
      >
        Home
      </NavLink>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <div key={to} className='md:!text-sm text-xs' >
            {decodeURIComponent(value)}
          </div>
        ) : (
          <NavLink
            key={to}
            to={to}
            style={{ textDecoration: 'none', color: 'inherit' }}
             className="md:!text-sm text-xs "
          >
            {decodeURIComponent(value)}
          </NavLink>
        );
      })}
    </Breadcrumbs>
  );
};

export default DynamicBreadcrumbs;
