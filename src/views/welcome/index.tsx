import styles from './index.module.less'

function Welcome () {
  return (
    <div className={styles.welcome}>
      <div className={styles.descWapper}>
        <span className={styles.title}>欢迎体验滴滴货运</span>
        <span className={styles.desc}>透明计价更实在，安全运送有保障</span>
      </div>
    </div>
  )
}

export default Welcome