import { formatByteData, getPercentage } from "@/lib/utils";
import { Progress } from "@nextui-org/progress";
import { FC } from "react";

interface DataProgressBarProps {
  limit: number;
  dataUsage: number;
}

const DataProgressBar: FC<DataProgressBarProps> = ({ limit, dataUsage }) => {
  return (
    <Progress
      size="sm"
      value={dataUsage}
      maxValue={limit}
      color={
        getPercentage(dataUsage, limit) < 50
          ? "success"
          : getPercentage(dataUsage, limit) < 80
          ? "warning"
          : "danger"
      }
      showValueLabel={true}
      valueLabel={formatByteData(dataUsage) + "/" + formatByteData(limit)}
    />
  );
};

export default DataProgressBar;
