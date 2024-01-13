export default function SelectComponent({
  label,
  value,
  onChange,
  option = [],
}) {
  return (
    <div className="relative">
      <p className="pt-0 pr-2 absolute pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-500 bg-white">
        {label}
      </p>
      <select
        value={value}
        onChange={onChange}
        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded"
      >
        {option && option.length ? (
          option.map((optionItem) => (
            <option 
              id={optionItem.id}
              key={optionItem.id}
              value={optionItem.id}
            >
              {optionItem.label}
            </option>
          ))
        ) : (
          <option id="" value={""}>
            select
          </option>
        )}
      </select>
    </div>
  );
}
