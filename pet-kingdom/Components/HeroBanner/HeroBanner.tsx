import styles from './HeroBanner.module.css'

interface Props{
    imageUrl:string;
}
export function HeroBanner({imageUrl}:Props){


    return(
        <div className={styles.heroContainer} style={{backgroundImage: `url(${imageUrl})`}}>

        </div>
    )
}
