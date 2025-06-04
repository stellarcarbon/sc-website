import EmissionsCalculator from "@/containers/demo/EmissionsCalculator";
import FlightEstimator from "@/containers/estimator/FlightEstimator";

export default function FlightPage() {
  return (
    <div className="p-3 md:p-6 w-full">
      <FlightEstimator />
    </div>
  );
}
