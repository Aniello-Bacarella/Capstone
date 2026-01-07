import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="app-layout">
      <nav className="navbar">
        <div className="nav-brand">
          <h1>Soundbytes</h1>
        </div>

        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/sounds"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Sounds
          </NavLink>
          <NavLink
            to="/boards"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Boards
          </NavLink>
        </div>

        <div className="nav-user">
          <span className="user-name">{user?.display_name}</span>
          <button onClick={logout} className="btn-secondary">
            Logout
          </button>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};
