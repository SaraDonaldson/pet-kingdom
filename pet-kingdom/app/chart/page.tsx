import BarChart from "@/components/Charts/BarChart/BarChart";
import DonutChart from "@/components/Charts/DonutChart/DonutChart";
import LineChart from "@/components/Charts/LineChart/LineChart";

export default async function index() {
  return (
    <div className="h-full ">
      <div className=" bg-gray-800 w-full place-items-center justify-center inline-grid grid-cols-2 gap-2 ">
        <div className="flex grow rounded border-2 border-gray-700 bg-black w-auto col-span-1">
          <BarChart />
        </div>
        <div className="flex w-96 h-96 rounded border-2 border-gray-700 bg-black col-span-1">
          <LineChart />

          
        </div>
        <div className="flex rounded border-2 border-gray-700 bg-black w-auto col-span-1">
          <DonutChart />
        </div>
      </div>
    </div>
  );
}
