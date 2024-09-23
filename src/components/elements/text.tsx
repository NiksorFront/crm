type typeInpt = {
  className?: string;
  id?: string;
  title: string;
  style?: {};
  fntSize?: string;
  textAlign?: string;
};

export default function Text({className, id, title, style, textAlign="центр", fntSize="30"}: typeInpt) {

    const align = textAlign === "лево" ? "text-left" :
                  textAlign === "право" ? "text-right" : "text-center";

    // console.log(textAlign, align)

    return (
        <div id={id} className="flex flex-col gap-2" style={style}>
          <p className={`${align} ${className}`} style={{fontSize: `${fntSize}px`}}>{title}</p>
        </div>
    );
}
