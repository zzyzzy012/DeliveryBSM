// 生成随机坐标点的函数
const generateRandomPoints = (centerLng: number, centerLat: number, count: number, radius: number = 0.01) => {
  const points = []

  for (let i = 0; i < count; i++) {
    // 在指定半径内生成随机偏移
    const randomRadius = Math.random() * radius
    const randomAngle = Math.random() * 2 * Math.PI

    const offsetLng = randomRadius * Math.cos(randomAngle)
    const offsetLat = randomRadius * Math.sin(randomAngle)

    points.push({
      type: 'Feature',
      properties: {
        id: i + 1,
        name: `点${i + 1}`,
        value: Math.floor(Math.random() * 100) + 1
      },
      geometry: {
        coordinates: [centerLng + offsetLng, centerLat + offsetLat],
        type: 'Point'
      }
    })
  }

  return points
}

// 基于北京天安门坐标生成100个附近的点
export const points = generateRandomPoints(116.38856190676842, 39.909763838319805, 2000, 0.04)
