import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import style from "./Auth.module.scss";

import { IUser } from "../../types/user.type";
import { authService } from "../../services/auth.service";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({ reValidateMode: "onSubmit" });

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: IUser) => authService.login(data),
    onMutate() {
      setIsLoading(true);
      navigate("/");
    },
    onSuccess(data) {
      toast.success("Log in Successfully");
      reset();
    },
    onError(error: any) {
      toast.error(error.response.data.error);
    },
    onSettled() {
      setIsLoading(false);
    },
  });

  const onSubmit = (data: IUser) => {
    mutate(data);
  };

  return (
    <div className={style.authContainer}>
      <div className={style.auth}>
        <div className={style.left}></div>
        <div className={style.right}>
          <div className={style.header}>
            <div>
              <p>Don't have an account?</p>
              <Link to="/auth/signup" className={style.login}>
                Sign up
              </Link>
            </div>
          </div>
          <div className={style.wrapper}>
            <h1>Log In to your Account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
              <div className={style.input_box}>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address",
                    },
                    maxLength: {
                      value: 100,
                      message: "Email must not exceed 100 characters",
                    },
                  })}
                  className={style.input_field}
                  placeholder=" "
                  type="email"
                />

                <label htmlFor="email" className={style.label}>
                  Email
                </label>
              </div>
              <p className={style.error}>
                {errors.email ? errors.email.message : ""}
              </p>

              <div className={style.input_box}>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    pattern: {
                      value: /\d/,
                      message: "Password must contain at least one number",
                    },
                  })}
                  className={style.input_field}
                  placeholder=" "
                  type="password"
                />

                <label htmlFor="password" className={style.label}>
                  Password
                </label>
              </div>
              <p className={style.error}>
                {errors.password ? errors.password.message : ""}
              </p>

              <button
                type="submit"
                className={style.submitButton}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size="30px" sx={{ color: "#fff" }} />
                ) : (
                  "CONTINUE"
                )}
              </button>
            </form>

            <div className={style.or}>
              <div className={style.line} />
              <span className={style.span}>OR</span>
              <div className={style.line} />
            </div>

            <div className="google"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
