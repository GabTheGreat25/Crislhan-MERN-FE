import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { hooks } from "@api";

export function LineChart() {
  const { data: transactions, isLoading } = hooks.useGetAllTransactionsQuery();
  const [chartSeries, setChartSeries] = useState([]);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (transactions?.data) {
      const currentYear = new Date().getFullYear();

      const completedTransactions = transactions.data.filter(
        (transaction) =>
          transaction.status === "Completed" &&
          new Date(transaction.createdAt).getFullYear() === currentYear,
      );

      const monthlyRevenue = Array(12).fill(0);
      completedTransactions.forEach((transaction) => {
        const month = new Date(transaction.createdAt).getMonth();
        monthlyRevenue[month] += transaction.totalPrice;
      });

      const months = Array.from({ length: 12 }, (_, i) =>
        new Date(0, i).toLocaleString("default", { month: "short" }),
      );

      setChartSeries([
        {
          name: "Monthly Revenue",
          data: monthlyRevenue,
        },
      ]);

      setChartOptions({
        chart: {
          id: "transactions-chart",
          toolbar: {
            show: false,
          },
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
          },
        },
        colors: ["#008FFB"],
        stroke: {
          curve: "smooth",
          width: 2,
        },
        xaxis: {
          categories: months,
          title: {
            text: "Month",
          },
          labels: {
            style: {
              colors: "#fff",
            },
          },
        },
        yaxis: {
          title: {
            text: "Revenue (PHP)",
          },
          labels: {
            style: {
              colors: "#fff",
            },
            formatter: function (val) {
              return `Php ${Math.round(val).toLocaleString()}`;
            },
          },
        },
        grid: {
          borderColor: "#333",
          strokeDashArray: 5,
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          offsetY: 0,
          labels: {
            colors: "#ffffff",
          },
          itemMargin: {
            horizontal: 10,
          },
        },
        tooltip: {
          theme: "dark",
        },
      });
    }
  }, [transactions]);

  return (
    <div className="pt-12 pb-6">
      {isLoading ? (
        <div>Loading chart...</div>
      ) : chartSeries.length ? (
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height="350"
        />
      ) : (
        <div>No transaction data available.</div>
      )}
    </div>
  );
}
