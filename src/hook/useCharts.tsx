import * as echarts from 'echarts'
import { useRef, useEffect, useState } from'react'
import type { RefObject } from 'react'

export const useCharts = (): [RefObject<HTMLDivElement>, echarts.EChartsType | null] => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setChartInstance] = useState<echarts.EChartsType | null>(null)
  useEffect(() => {
    const chart = echarts.init(chartRef.current as HTMLElement)
    setChartInstance(chart)
  }, [])
  return [chartRef, chartInstance]
}