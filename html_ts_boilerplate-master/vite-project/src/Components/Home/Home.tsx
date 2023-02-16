import style from '../Home/Home.module.scss'
import { useTranslation } from 'react-i18next'

const Home = () => {

    const {t} = useTranslation()

    return (
        <div className={style.container}>
            <p>{t('welcome')}</p>
            <span>{t('firstRule')}</span>
            <span>{t('secondRule')}</span>
            <span>{t('thirdRule')}</span>
        </div>
      
    );
};
  

  export default Home