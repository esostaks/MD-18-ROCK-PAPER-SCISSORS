import style from '../Home/Home.module.scss'
import { useTranslation } from 'react-i18next'

const Home = () => {

    const {t} = useTranslation()

    return (
        <div className={style.wrapper}>
            <div>
                <img src="./src/assets/images/theme-image.jpg" width='1600' height='700' alt="Rock, paper, scissors" />
            </div>
            <div className={style.welcomeText}>
                <p>{t('welcome')}</p>
            </div>
            <div className={style.rules}>
                <span>{t('firstRule')}</span>
                <span>{t('secondRule')}</span>
                <span>{t('thirdRule')}</span>
            </div>
        </div>
      
    );
};
  

  export default Home