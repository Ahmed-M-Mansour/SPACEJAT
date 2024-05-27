function Input({
  inputType,
  inputName,
  inputPlaceholder,
  inputValue,
  handleinputValue,
  inputStyles,
}) {
  return (
    <div className={`flex flex-col px-4 gap-1 ${inputStyles}`}>
      <label className="text-sm text-brandColor">{inputName}</label>
      <input
        type={inputType}
        name={inputName}
        placeholder={inputPlaceholder}
        className={` border-2 rounded-lg px-4 py-3 remove-arrow h-12 col-span-2 text-brandColor`}
        value={inputValue}
        onChange={(e) => handleinputValue(e.target.value)}
      />
    </div>
  );
}

export default Input;
