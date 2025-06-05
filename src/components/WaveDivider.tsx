export default function WaveDivider({ height = 24 }) {
  return (
    <div className="bg-darkest text-darker  w-full z-[10]">
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
}
