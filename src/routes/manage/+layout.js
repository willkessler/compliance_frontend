// src/routes/manage/+layout.js

export function load({ url }) {
  const path = url.pathname;
  const isDetailsPage = path.includes('/incident/') || path.includes('/driver/') || path.includes('/vehicle/');
  
  return {
    layout: isDetailsPage ? 'details' : 'list'
  };
}
