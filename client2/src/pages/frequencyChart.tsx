import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Nav from "../components/NavBar";
import { BiSad } from "react-icons/bi";
import { Box, Icon } from "@chakra-ui/react";
import { Text, Heading } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Frequency/Time Line Chart",
      font: {
        size: 16,
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Time (s)",
        font: {
          size: 12,
        },
      },
      ticks: {
        maxTicksLimit: 5,
      },
    },
    y: {
      title: {
        display: true,
        text: "Frequency (Hz)",
        font: {
          size: 12,
        },
      },
    },
  },
};

const FrequencyChart = () => {
  const [currentFrequecy, setCurrentFrequency] = useState(90);
  const [currentTimer, setCurrentTimer] = useState(0);

  const [data, setData] = useState({
    labels: ["0s", "1s"],
    datasets: [
      {
        data: [50, 50],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 5,
        lineTension: 0.4,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = data.datasets.map((dataset) => {
        setCurrentTimer(currentTimer + 1);
        const newDataPoint = 50 - Math.sin(currentTimer / 10) * 10;
        const updatedData = dataset.data.slice(-4);
        updatedData.push(newDataPoint);
        return { ...dataset, data: updatedData };
      });

      const newLabels = data.labels.slice(-4);
      const newLabel = `${parseInt(data.labels[data.labels.length - 1]) + 1}s`;
      newLabels.push(newLabel);

      setData({
        datasets: newData,
        labels: newLabels,
      });
    }, 1000); // change data every 1s

    return () => clearInterval(interval);
  }, [data]);

  return (
    <Box display="flex">
      <Box style={{ width: "400px", height: "300px" }}>
        <Line data={data} options={options} />
      </Box>
      <Box height="300px" ml="12">
        <Heading as="h2" size="xl" textAlign="center">
          State
        </Heading>
        <Icon as={BiSad} height="150px" width="150px"/>
        <Text textAlign="center">Stressed, angry, down</Text>
      </Box>
    </Box>
  );
};

export default FrequencyChart;