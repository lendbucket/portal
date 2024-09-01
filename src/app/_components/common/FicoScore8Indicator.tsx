"use client";
import { Box, Stack, Text } from '@chakra-ui/react'
import Card from '../card/Card';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export const FicoScore8Indicator = () => {

  const options: ApexOptions = {
    chart: {
      type: 'radialBar',
      offsetY: 0,
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '75%',
        },
        track: {
          background: "#E1E9F8",
          strokeWidth: '75px',
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: false,
          }
        },
        dataLabels: {
          name: {
            show: true,
            offsetY: 20,
            color: '#1a202c',
            fontSize: '12px'
          },
          value: {
            offsetY: -20,
            fontSize: '3rem',
            formatter: function (val: any) {
              return calculateValueForPercentage(val)
            }

          }
        }
      }
    },
    grid: {
      padding: {
        top: -10
      }
    },

    fill: {
      colors: ['#EE5D50'],
      type: 'solid',
      gradient: {
        shade: 'light',
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Poor'],
  }
  const chartData = [515]

  const minScore = 300
  const maxScore = 850

  const calculateValueForPercentage = (percentage: any) => {
    const range = maxScore - minScore;
    const value = minScore + (percentage / 100) * range;
    return String(value);
  };

  const calculateScore = (scores: any) => {
    const score = scores[0]
    const percentage = (score - minScore) / (maxScore - minScore) * 100
    return [Number(percentage)]
  }

  return (
    <Card borderRadius={'10px'} bg={'white'} px={5} pb={5} boxShadow={'0 1px 8px #4444441f'} w={'full'} minH={360} height={'full'}>
      <Stack spacing={4} justifyContent={'space-between'} width='100%' height={'full'}>
        <Text fontWeight={600}>FICO Score 8</Text>
        <Box>
          <ReactApexChart
            options={options}
            series={calculateScore(chartData)}
            type='radialBar'
          />
        </Box>
        <Stack spacing={1} lineHeight={1} alignItems={'end'}>
          <Text fontSize={'0.625rem'}>Based on Experian data</Text>
          <Text fontSize={'0.625rem'}>from 08/27/2024</Text>
          <Text fontSize={'0.625rem'}>Updated monthly</Text>
        </Stack>
      </Stack>
    </Card>
  );
};

export default FicoScore8Indicator