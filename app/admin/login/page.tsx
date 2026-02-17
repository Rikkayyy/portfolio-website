import LoginForm from './LoginForm';
import styles from '../Admin.module.css';

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h1 className={styles.heading}>Admin Login</h1>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
