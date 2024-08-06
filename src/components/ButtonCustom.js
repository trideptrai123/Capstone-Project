
export const ButtonIcon =  ({ text, onClick, svg, color, hoverColor,tooltip }) => {
    return (
      <div onClick={onClick} className="tooltip bg-gray-500 p-2 rounded-full">
      <p className="tooltiptext">{tooltip}</p>
      <img
        
        className="cursor-pointer"
        alt=""
        style={{
            width:15,
            height:15
        }}
        src={svg}
      />
      </div>
    );
  };