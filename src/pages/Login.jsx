import { useState } from "react";

import { useAuth } from "../context/AuthContext";

function Login({
  onLogin,
}) {
  const {
    login,
  } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      setError("");
      setLoading(true);

      try {
        await login(
          email,
          password
        );

        onLogin();
      } catch (error) {
        setError(
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="auth-page">

      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >

        <h1>
          Welcome back
        </h1>

        <p>
          Sign in to continue your
          cybersecurity training.
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <label>
          Email

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />
        </label>

        <label>
          Password

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Signing in..."
            : "Sign In"}
        </button>

      </form>

    </div>
  );
}

export default Login;
