import Select from "react-select";

export default function MultiSelectBox({
  options,
  value,
  onChange,
  placeholder,
}) {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "35px",
      padding: "0px 4px",
      position: "relative",
      zIndex: 10,
      border: "1px solid #ccc",
      boxShadow: state.isFocused ? "0 0 0 4px rgba(128, 189, 255, 0.5)" : base.boxShadow,


    }),

    valueContainer: (base) => ({
      ...base,
      overflowY: "auto",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: "32px",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      position: "absolute",
      top: "100%",
      padding: "5px",
    }),
    option: (base, state) => ({
      ...base,
      zIndex: 9999,
      backgroundColor: state.isSelected
        ? "#D3D3D3"
        : state.isFocused
          ? "#c72030"
          : "transparent",
      color: state.isSelected ? "#333" : state.isFocused ? "white" : "black",
      cursor: "pointer",
      padding: "10px",
      borderRadius: "4px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#333",
      backgroundColor: "transparent",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#c72030",
      color: "white",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "white",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#fff",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "#c72030",
        color: "#fff",
      },
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "hsl(0, 0%, 80%)",
    }),
    clearIndicator: (base) => ({
      ...base,
      color: "hsl(0, 0%, 80%)",
    }),
  };

  return (
    <Select
      isMulti
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={customStyles}
      closeMenuOnSelect={false}
      isSearchable
    />
  );
}
