import ReactEcharts from "echarts-for-react"; 
import { FC } from "react";

interface Props {
  data: { name: string; value: number  }[],
  title: string
}

export const PieChart: FC<Props> = ({ data, title }) => {
  const option = {
    title: {
      text: title,
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: title,
        type: 'pie',
        radius: '50%',
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (<ReactEcharts opts={{ }} option={option} />)
}