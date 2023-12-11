import { PieChart } from "@mui/x-charts/PieChart";
import theme from "../../../../Theme";
import { Stack, Typography } from "@mui/material";

export default function UserPie({ rawData }) {
  const convertDataForPieChart = (data) => {
    return Object.values(data)
      .filter(({ label }) => label !== "Users")
      .map(({ label, total_count }, index) => ({
        id: index,
        value: total_count,
        label,
      }));
  };

  const data = convertDataForPieChart(rawData);

  return (
    <Stack spacing={0} direction={"column"} sx={{ ...classes.main }}>
      {/*Section Name */}

      <Typography variant="sectionTitle" sx={{ textAlign: "left" }}>
        Lokal 360 Users
      </Typography>

      <PieChart
        colors={[
          theme.palette.shopper.main,
          theme.palette.shopOwner.main,
          theme.palette.shopEmployee.main,
        ]}
        series={[
          {
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={350}
        width={350}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
        sx={{ mr: -8 }}
      />
    </Stack>
  );
}

const classes = {
  main: {
    display: "flex",
    justifyContent: "center",
    height: 350,
  },
};
