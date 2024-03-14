import styled from "styled-components";
import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { useCalendar } from "../../contexts/CalendarContext";



const CalendarCharts = () => {
  const { state } = useCalendar();
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "line",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " 단위";
          },
        },
      },
    },
  });

  useEffect(() => {
    const selectedDateStr = state.selectedDate;
    const startDate = new Date(
      selectedDateStr.substring(0, 4),
      selectedDateStr.substring(4, 6) - 1,
      selectedDateStr.substring(6, 8)
    );
    startDate.setDate(startDate.getDate() - 3);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
  
    const filteredData = state.monthData.filter((data) => {
      const dataDate = new Date(
        data.reg_date.substring(0, 4),
        data.reg_date.substring(4, 6) - 1,
        data.reg_date.substring(6, 8)
      );
      return dataDate >= startDate && dataDate <= endDate;
    });
  
    const categories = filteredData.map((data) => data.reg_date);
    const series = [{
      name: "칼로리",
      data: filteredData.map((data) => data.calorie),
    }];
  
    
    let currentDCI = null;
    let latestDateForDCI = null;
    state.monthData.forEach((data) => {
      if (data.dci && data.reg_date <= selectedDateStr) {
        if (!latestDateForDCI || data.reg_date > latestDateForDCI) {
          latestDateForDCI = data.reg_date;
          currentDCI = data.dci;
        }
      }
    });

    
  
    const annotations = currentDCI ? {
      yaxis: [{
        y: parseFloat(currentDCI),
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: { color: '#fff', background: '#00E396' },
          text: `DCI: ${currentDCI}kcal`,
        },
      }],
    } : {};
  
    setChartData({
      series: series,
      options: {
        chart: {
          type: "line",
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: categories,
        },
        annotations: annotations,
        tooltip: {
          enabled: true,
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            return `<div class="arrow_box" style="text-align: left;">
              <span style='color: #0000FF;'>●</span> 칼로리: ${series[seriesIndex][dataPointIndex]}kcal
              <br><span style='color: green;'>●</span> 탄수화물: ${filteredData[dataPointIndex].carbohydrate}g
              <br><span style='color: red;'>●</span> 단백질: ${filteredData[dataPointIndex].protein}g
              <br><span style='color: yellow;'>●</span> 지방: ${filteredData[dataPointIndex].fat}g
              </div>`;
          },
        },
      },
    });
  }, [state.selectedDate, state.monthData]);
  // 데이터 가공 및 차트 데이터 설정 로직 추가...

  return (
    <ApexCharts
      options={chartData.options}
      series={chartData.series}
      type="line"
      width="150%"
    />
  );
};

export default CalendarCharts;