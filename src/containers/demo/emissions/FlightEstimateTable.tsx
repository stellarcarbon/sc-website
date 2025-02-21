import { FlightEstimateResponse } from "@/client";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

function TableRow({ mkey, value }: { mkey: string; value: string }) {
  return (
    <div className="flex">
      <span className="">{mkey}</span>
      <span className="flex-1 text-end">{value}</span>
    </div>
  );
}

export default function FlightEstimateTable({
  flightEstimate,
}: {
  flightEstimate: FlightEstimateResponse;
}) {
  const router = useRouter();

  return (
    <div className="bg-secondary border border-accentSecondary p-4 text-xs md:text-sm flex flex-col w-full">
      <TableRow mkey="Departure" value={flightEstimate.departure_name} />
      <TableRow mkey="Destination" value={flightEstimate.destination_name} />
      <TableRow mkey="Distance in KM" value={flightEstimate.distance_km} />
      <TableRow mkey="CO2 in tonnes" value={flightEstimate.co2_tonnes} />
      <Button
        onClick={() =>
          router.push(`/dashboard/sink?amount=${flightEstimate.co2_tonnes}`, {})
        }
        className="w-[200px] md:w-[300px] self-center mt-2"
      >
        Continue to compensate
      </Button>
    </div>
  );
}
