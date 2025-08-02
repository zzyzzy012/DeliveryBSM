import styles from './index.module.less';

function NavFooter () {
  return (
    <div className={styles.navFooter}>
      Backstage Management ©{new Date().getFullYear()} Created by ZZ
    </div>
  )
}

export default NavFooter