
import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { useCalendar } from "../../contexts/CalendarContext";

const CalendarCharts = () => {
  const { state } = useCalendar();
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'line',
        toolbar: {
          show: false
        }
      },
      xaxis: {
        categories: []
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " 단위"
          }
        }
      }
    }
  });

  useEffect(() => {
    // 현재 선택된 날짜를 기준으로 -3일부터 +3일까지의 데이터를 가져와야 합니다.
    // 이 예시에서는 단순화를 위해 state.monthData를 사용하지만, 
    // 실제로는 이 기간에 해당하는 데이터를 백엔드에서 가져와야 합니다.
    const startDate = new Date(state.selectedDate.substring(0, 4), state.selectedDate.substring(4, 6) - 1, state.selectedDate.substring(6, 8));
    startDate.setDate(startDate.getDate() - 3);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);

    const filteredData = state.monthData.filter(data => {
      const dataDate = new Date(data.reg_date.substring(0, 4), data.reg_date.substring(4, 6) - 1, data.reg_date.substring(6, 8));
      return dataDate >= startDate && dataDate <= endDate;
    });

    const categories = filteredData.map(data => data.reg_date);
    const series = [
      {
        name: "칼로리",
        data: filteredData.map(data => data.calorie)
      },
      {
        name: "탄수화물",
        data: filteredData.map(data => data.carbohydrate)
      },
      {
        name: "단백질",
        data: filteredData.map(data => data.protein)
      },
      {
        name: "지방",
        data: filteredData.map(data => data.fat)
      }
    ];

    setChartData({
      ...chartData,
      series: series,
      options: {
        ...chartData.options,
        xaxis: {
          categories: categories
        }
      }
    });
  }, [state.selectedDate, state.monthData]);

  // 데이터 가공 및 차트 데이터 설정 로직 추가...
  
  return (
    <ApexCharts
      options={chartData.options}
      series={chartData.series}
      type="line"
      width="170%"
    />
  );
};

export default CalendarCharts;
