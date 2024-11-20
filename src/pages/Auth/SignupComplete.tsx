import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { authService } from "../../services/auth.service";
import style from "./Auth.module.scss";
import { CircularProgress } from "@mui/material";

interface IVerification {
  verification_code: string;
}

export const SignupComplete: React.FC = () => {
  const navigate = useNavigate();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setCode((prevCode) => {
      const newCode = prevCode.split("");
      newCode[index] = value;
      return newCode.join("");
    });

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<IVerification>();

  const { mutate } = useMutation({
    mutationKey: ["verifySignup"],
    mutationFn: (data: { verification_code: string }) =>
      authService.signupComplete(data.verification_code),
    onSuccess(data) {
      toast.success("Account created successfully");
      window.localStorage.setItem("jwt", data.token);
      navigate("/");
    },
    onError(error: any) {
      toast.error(error.response?.data?.error || "An error occurred");
    },
    onSettled() {
      setLoading(false);
    },
  });

  const onSubmit: SubmitHandler<IVerification> = (data) => {
    if (code.length !== 6) {
      toast.error("Verification code must be exactly 6 digits");
      return;
    }
    mutate({ verification_code: code });
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && index > 0 && !e.currentTarget.value) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "Enter") {
      if (code.length === 6) {
        setLoading(true);
        toast.success("Verification code submitted successfully");
        handleSubmit(onSubmit)();
      } else {
        toast.error("Please enter a valid 6-digit code");
      }
    }
  };

  return (
    <div className={style.complete}>
      <h1>Confirm Sign Up</h1>

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.inputs_row}>
          {[...new Array(6)].map((_, index) => (
            <input
              key={index}
              value={code[index] || ""}
              onChange={(e) => handleInputChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
            />
          ))}
          {errors.verification_code && (
            <span>{errors.verification_code.message}</span>
          )}
        </div>

        <button type="submit" disabled={loading || code.length !== 6}>
          {loading ? (
            <CircularProgress size="30px" sx={{ color: "#fff" }} />
          ) : (
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default SignupComplete;
