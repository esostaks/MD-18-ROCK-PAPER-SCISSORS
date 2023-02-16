import style from '../Statistics/Statistics.module.scss'
import { useQuery } from "@tanstack/react-query";
import axios from 'axios'
import { useTranslation } from 'react-i18next'



type Statistics = {
    id?: number,
    computerChoice: string,
    playerChoice: string,
    result: string,
}



const getStatistics = async () => {
    const { data } = await axios.get('http://localhost:3004/statistics')
    return data
}


export const Statistics = () => {
    const {t} = useTranslation()
    const { data, isLoading } = useQuery<Statistics[]>(['statistics'], getStatistics)

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!data) {
        return <h1>Something went wrong...</h1>
    }

    console.log(data)


    return (
        <div className={style.container}>
            <div className="header">{t('history')}</div>
            <div>
                <table className="table table-dark table-hover table__width">
                    <thead >
                    <tr>
                        <th>{t('pcChoice')}</th>
                        <th>{t('userChoice')}</th>
                        <th>{t('result')}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(({computerChoice, playerChoice, result}) => (
                        <tr>
                            <td>{computerChoice}</td>
                            <td>{playerChoice}</td>
                            <td>{result}</td>
                        </tr>
                    )  
                        )}
                </tbody>
                </table>  

              
            </div>
        </div>   
    )
    
}