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
    <div className={`${background} w-full h-[300px] lg:h-[340px] flex`}>
      <div className="flex flex-col items-center justify-center gap-8 md:gap-16 max-w-[80%] md:max-w-[65%] m-auto">
        <span className="text-4xl md:text-[5vw] text-center ">{title}</span>
        <span className="text-xl md:text-[2vw] uppercase font-sans font-[700] text-center tracking-[8px] leading-[40px] image1 mt-4">
          {subtitle}
        </span>
      </div>
    </div>
  );
}
