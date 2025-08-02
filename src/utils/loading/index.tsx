// import ReactDom from 'react-dom/client'
// import Loading from './Loading'

// let count = 0
// export const showLoading = () => {
//   if (count === 0) {
//     const loading = document.createElement('div')
//     loading.setAttribute('id', 'loading')
//     // const loading = document.getElementById('loading') as HTMLDivElement
//     ReactDom.createRoot(loading).render(<Loading />)
//   }
//   count++
// }

// export const hideLoading = () => {
//   if (count < 0) return
//   count--
//   if (count === 0) {
//     document.body.removeChild(document.getElementById('loading') as HTMLDivElement)
//   }
// }

let count = 0
export const showLoading = () => {
  if (count === 0) {
    const loading = document.getElementById('loading') as HTMLDivElement
    loading.style.setProperty('display', 'flex')
  }
  count++
}

export const hideLoading = () => {
  count--
  if (count < 0) return
  if (count === 0) {
    const loading = document.getElementById('loading') as HTMLDivElement
    loading.style.setProperty('display', 'none')
  }
}