import { Outlet, useLocation } from "react-router";

export function Root() {
  const location = useLocation();
  const isLandingOrAuth = location.pathname === '/' || location.pathname === '/login';

  if (isLandingOrAuth) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
}
