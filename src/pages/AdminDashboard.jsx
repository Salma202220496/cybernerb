import {
  useEffect,
  useState,
} from "react";

import {
  Users,
  Target,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

import { api } from "../services/api";

function AdminDashboard() {
  const [data, setData] =
    useState(null);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function load() {
      try {
        const result =
          await fetch(
            "http://localhost:5000/api/admin/dashboard",
            {
              headers: {
                Authorization:
                  `Bearer ${localStorage.getItem(
                    "cybernerb_token"
                  )}`,
              },
            }
          );

        const json =
          await result.json();

        if (!result.ok) {
          throw new Error(
            json.message
          );
        }

        setData(json);
      } catch (error) {
        setError(
          error.message
        );
      }
    }

    load();
  }, []);

  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        Loading admin dashboard...
      </div>
    );
  }

  const stats =
    data.statistics;

  return (
    <div className="admin-page">

      <div className="admin-header">
        <span>
          ADMINISTRATION
        </span>

        <h1>
          CYBERNERB Admin Dashboard
        </h1>

        <p>
          Monitor learners, missions,
          and cybersecurity training
          performance.
        </p>
      </div>

      <div className="admin-stat-grid">

        <div className="admin-stat">
          <Users size={22} />

          <span>
            USERS
          </span>

          <strong>
            {stats.users}
          </strong>
        </div>

        <div className="admin-stat">
          <Target size={22} />

          <span>
            ACTIVE MISSIONS
          </span>

          <strong>
            {stats.missions}
          </strong>
        </div>

        <div className="admin-stat">
          <CheckCircle size={22} />

          <span>
            COMPLETIONS
          </span>

          <strong>
            {stats.completedMissions}
          </strong>
        </div>

        <div className="admin-stat">
          <TrendingUp size={22} />

          <span>
            ACCURACY
          </span>

          <strong>
            {stats.accuracy}%
          </strong>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;