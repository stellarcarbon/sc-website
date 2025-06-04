export default function WaveDivider({
  className = "text-darkest",
  height = 24,
}) {
  return (
    <div className="bg-darker w-full z-[10]">
      <svg
        className="w-full text-darkest"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,80L40,73.3C80,67,160,53,240,53.3C320,53,400,67,480,69.3C560,72,640,64,720,58.7C800,53,880,51,960,53.3C1040,56,1120,64,1200,69.3C1280,75,1360,77,1400,78.7L1440,80L1440,120L1400,120C1360,120,1280,120,1200,120C1120,120,1040,120,960,120C880,120,800,120,720,120C640,120,560,120,480,120C400,120,320,120,240,120C160,120,80,120,40,120L0,120Z"
        ></path>
      </svg>
    </div>
  );

  return (
    // “preserveAspectRatio='none'” ensures the wave spans 100% of its container’s width
    <div className="bg-darkest w-full">
      <svg
        className={`w-full h-${height} ${className} `}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="bg-primary"
          d="M0,96L48,117.3C96,139,192,181,288,181.3C384,181,480,139,576,144C672,149,768,203,864,202.7C960,203,1056,149,1152,138.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
  );
}
