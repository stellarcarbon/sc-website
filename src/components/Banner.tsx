export default function Banner({
  title,
  subtitle,
  background,
}: {
  title: string;
  subtitle: string;
  background: string;
}) {
  return (
    <div className="relative bg-[#21354A] w-full flex justify-center border-b border-secondary">
      <div
        className={`absolute ${background} w-full h-[200px] lg:h-[200px] flex`}
      ></div>
      <div className="relative h-[200px] lg:h-[200px] w-full flex items-center">
        <div className="flex flex-col items-center justify-center gap-2 md:gap-5 w-full p-4 bg-primary/[.3] h-full">
          <span className="text-4xl md:text-[3vw] text-center ">{title}</span>
          <span className="text-xl md:text-[1.2vw] uppercase font-sans font-[700] text-center tracking-[8px] leading-[32px] image1">
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
}
