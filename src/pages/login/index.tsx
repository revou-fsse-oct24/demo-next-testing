import React, { useState } from "react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  initialEmail?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  initialEmail = "",
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const validateEmail = (emailValue: string) => {
    if (!emailValue) {
      return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
      return "Email is invalid";
    }
    return "";
  };

  const validatePassword = (passwordValue: string) => {
    if (!passwordValue) {
      return "Password is required";
    } else if (passwordValue.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setErrors((prev) => ({
      ...prev,
      email: validateEmail(newEmail),
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setErrors((prev) => ({
      ...prev,
      password: validatePassword(newPassword),
    }));
  };

  const validateForm = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors((prev) => ({
      ...prev,
      email: emailError,
      password: passwordError,
    }));

    return !emailError && !passwordError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({ email: "", password: "", general: "" });

    try {
      await onSubmit(email, password);
      setEmail(initialEmail);
      setPassword("");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: "Login failed. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-testid="login-form"
    >
      <div>
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          data-testid="email-input"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailChange}
          className="w-full p-2 border rounded border-gray-300"
          disabled={isLoading}
        />
        {errors.email && (
          <div data-testid="email-error" className="text-red-500 mt-1">
            {errors.email}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          data-testid="password-input"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordChange}
          className="w-full p-2 border rounded border-gray-300"
          disabled={isLoading}
        />
        {errors.password && (
          <div data-testid="password-error" className="text-red-500 mt-1">
            {errors.password}
          </div>
        )}
      </div>

      {errors.general && (
        <div data-testid="general-error" className="text-red-500">
          {errors.general}
        </div>
      )}

      <button
        type="submit"
        data-testid="submit-button"
        className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-blue-300"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Submit"}
      </button>
    </form>
  );
};

export default LoginForm;
