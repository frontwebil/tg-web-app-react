import "./style.css";

export function Button({ className = "", ...props }) {
  return <button {...props} className={`button ${className}`} />;
}
