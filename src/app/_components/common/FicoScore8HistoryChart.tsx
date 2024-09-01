"use client";
import { Box, Button, Flex, HStack, Icon, Link, Stack, StackDivider, Tag, TagLabel, Text } from '@chakra-ui/react'
import Card from '../card/Card';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useState } from 'react';

export const FicoScore8HistoryChart = () => {

  const minScore = 300
  const maxScore = 850

  const [scoreGoal, setScoreGoal] = useState(650)

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false
      },
      stacked: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      },
    },
    colors: ['#84cc16'],
    markers: {
      size: 0,
      colors: 'white',
      strokeColors: '#84cc16',
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: 'circle',
      offsetX: 0,
      offsetY: 0,
      showNullDataPoints: true
    },
    tooltip: {
      theme: 'dark'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTicks: {
        show: false,
      }
    },
    yaxis: {
      show: true,
      min: minScore,
      max: maxScore,
      stepSize: 110,

    },
    legend: {
      show: true
    },
    grid: {
      show: true,
      column: {
        opacity: 0.5
      }
    },
    annotations: {
      yaxis: [{
        y: scoreGoal,
        strokeDashArray: 8,
        borderColor: '#E31A1A',
        label: {
          text: `Goal: ${scoreGoal}`,
          style: {
            color: "#fff",
            background: '#E31A1A'
          }
        }
      }],
    }
  }
  const chartData = [
    {
      name: 'Score',
      data: [600, 600, 624, 646, 720, 846, 820, 846]
    }
  ];

  return (
    <Card borderRadius={'10px'} bg={'white'} px={5} pb={5} boxShadow={'0 1px 8px #4444441f'} w={'full'} minH={360} height={'full'}>
      <Stack spacing={4} justifyContent={'space-between'} height={'full'}>
        <Text fontWeight={600}>My FICO Score 8 History</Text>
        <Box>
          <ReactApexChart
            options={options}
            series={chartData}
            type='area'
            width='100%'
            height='200px'
          />
        </Box>
        <Stack flexDir={{ base: 'column', md: 'row' }} spacing={1} lineHeight={1} justifyContent={'space-between'} alignItems={'start'} gap={3}>
          <Stack spacing={1} alignItems={'start'}>
            <Text fontSize={'0.75rem'}>FICO Score Goal</Text>
            <Text fontSize={'0.75rem'} fontWeight={600}>{scoreGoal}</Text>
          </Stack>
          <Stack spacing={1} alignItems={'start'}>
            <Text fontSize={'0.75rem'}>Points to Reach Goal</Text>
            <Text fontSize={'0.75rem'} fontWeight={600} letterSpacing={0.5}>+131 points</Text>
          </Stack>
          <Button size={'xs'} colorScheme={'lime'} fontSize={'0.75rem'}>Change Score Goal</Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default FicoScore8HistoryChart