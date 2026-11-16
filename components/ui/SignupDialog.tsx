"use client";
import { createContext, useCallback, useContext, useRef, useState, type FormEvent, type ReactNode } from "react";
import Button from "./Button";

/* Component styles (rendered once via a hoisted <style>) */
const css = `.signup-dialog {
  width: min(420px, calc(100% - 32px));
  margin: auto; /* the global reset zeroes margins, which would pin the modal to a corner */
  padding: 0;
  overflow: visible;
  border: 0;
  border-radius: 22px;
  color: var(--ink);
  box-shadow: 0 40px 100px -20px rgba(80, 50, 160, 0.45);
}

.signup-dialog::backdrop {
  background: rgba(30, 20, 60, 0.35);
  backdrop-filter: blur(6px);
}

.signup-dialog[open] {
  animation: signup-pop 0.5s var(--ease);
}

@keyframes signup-pop {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.96);
  }
}

.signup-box {
  position: relative;
  padding: 30px 28px 28px;
  border-radius: 22px;
  background:
    radial-gradient(120% 80% at 0 0, rgba(246, 182, 216, 0.35), transparent 60%),
    radial-gradient(120% 80% at 100% 0, rgba(169, 200, 255, 0.35), transparent 60%),
    #fff;
}

.signup-title {
  margin: 0 28px 8px 0;
  font-size: 26px;
  line-height: 1.1;
}

.signup-text {
  margin-bottom: 18px;
  color: #666;
  line-height: 1.5;
}

.signup-input {
  width: 100%;
  margin-bottom: 12px;
  padding: 14px 16px;
  border: 0;
  border-radius: 12px;
  outline: 0;
  background: #f3f3f5;
}

.signup-input:focus {
  box-shadow: 0 0 0 2px var(--violet);
}

.signup-error {
  display: block;
  min-height: 14px;
  margin-top: 8px;
  color: #d92d20;
  font-size: var(--fs-xs);
}

/* round close button drawn with two bars */
.signup-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: #f3f3f5;
  cursor: pointer;
  transition: transform 0.3s var(--ease);
}

.signup-close:hover {
  transform: rotate(90deg);
}

.signup-close::before,
.signup-close::after {
  content: "";
  position: absolute;
  top: 15px;
  right: 9px;
  left: 9px;
  height: 1.5px;
  background: var(--ink);
  transform: rotate(45deg);
}

.signup-close::after {
  transform: rotate(-45deg);
}

/* success check */
.signup-tick {
  position: relative;
  width: 44px;
  height: 44px;
  margin-bottom: 16px;
  border-radius: 50%;
  background: var(--ink);
  animation: signup-pop 0.6s var(--ease);
}

.signup-tick::after {
  content: "";
  position: absolute;
  top: 9px;
  left: 16px;
  width: 9px;
  height: 18px;
  border: solid #fff;
  border-width: 0 2.5px 2.5px 0;
  transform: rotate(45deg);
}`;


const content = {
  title: "Get started with NOVA AI",
  text: "Enter your work email and your intelligent workspace is ready.",
  label: "Work email",
  placeholder: "name@company.com",
  submit: "Get Started Free",
  error: "Enter a valid work email, like name@company.com.",
  doneTitle: "You’re in.",
  doneText: "We’ve sent a confirmation link to",
  done: "Done",
};

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const SignupContext = createContext<{ open: () => void }>({ open: () => {} });
export const useSignup = () => useContext(SignupContext);

/** Wrap the app once; any <Button signup> then opens this dialog. */
export function SignupProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [error, setError] = useState("");

  const open = useCallback(() => {
    setSentTo("");
    setError("");
    dialog.current?.showModal();
    setTimeout(() => input.current?.focus(), 60);
  }, []);

  const close = () => dialog.current?.close();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setError(content.error);
      input.current?.focus();
      return;
    }
    setSentTo(value);
    setEmail("");
  };

  return (
    <>
      <style href="ov-signup" precedence="default">{css}</style>
      <SignupContext.Provider value={{ open }}>
        {children}
        <dialog
          ref={dialog}
          className="signup-dialog"
          aria-labelledby="signup-title"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="signup-box">
            <button className="signup-close" type="button" onClick={close} aria-label="Close" />

            {sentTo ? (
              <div>
                <div className="signup-tick" />
                <h3 className="signup-title" id="signup-title">{content.doneTitle}</h3>
                <p className="signup-text">{content.doneText} <b>{sentTo}</b>.</p>
                <Button block onClick={close}>{content.done}</Button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h3 className="signup-title" id="signup-title">{content.title}</h3>
                <p className="signup-text">{content.text}</p>
                <label className="sr" htmlFor="signup-email">{content.label}</label>
                <input
                  id="signup-email"
                  ref={input}
                  className="signup-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={content.placeholder}
                  autoComplete="email"
                />
                <Button block type="submit">{content.submit}</Button>
                <span className="signup-error" role="status">{error}</span>
              </form>
            )}
          </div>
        </dialog>
      </SignupContext.Provider>
    </>
  );
}
