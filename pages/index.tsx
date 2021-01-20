import Headlines from '../components/Headlines/Headlines';
import styles from '../styles/Home.module.scss'

export default function Home() {
  
  return (
    <div className={styles.container}>


      <main className={styles.main}>
        <Headlines />
      </main>

    </div>
  )
}
