function AuthInput({ id, label, type, value, onChange, placeholder }) {
  return (
    <div className="pb-5">
      <label className="text-gray-500" htmlFor={id}>{label}</label><br />
      <input
        className="w-full rounded-2xl px-6 py-4 text-main placeholder-main placeholder:text-[14px] shadow-[0_10px_25px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-main/50 transition"
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default AuthInput;