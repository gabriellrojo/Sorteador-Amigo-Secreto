import React, { useEffect } from 'react'
import { useState, FormEvent, useRef } from 'react'
import styles from "./Form.module.css"
import logo from "../public/images/logo.png"
import arte from "../public/images/participante.png"
import sacola from "../public/images/sacolas.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { linkSync } from 'fs'


type Props = {}

const Form = (props: Props) => {
    const [name, setName] = useState<string>("")
    const [list, setList] = useState<string[]>([])
    const [error, setError] = useState<boolean>(false)
    const [person, setPerson] = useState<string>("")
    const [show, setShow] = useState<boolean>(true)
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
    },[list, person])
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        
        if(list.includes(name)){
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2000)
            return
        }
        setList([...list, name])
        setName("")
        ref.current?.focus()
    }

    const handleClick = () => {
        const num = Math.floor(Math.random()*list.length)
        const person = list[num]
        setPerson(person)
        const newList = list.filter(name => name != person)
        setList(newList)
        setShow(false)
    }
  
  return (
    <div className={styles.container}>
        <div className={styles.logo}>
            <img className={styles.logo}  src={logo} alt="titulo" />
            <img className={styles.participante}  src={arte} alt="titulo" />    
        </div>
        <div className={styles.bottom}>
            <h2>Vamos começar</h2>
            <form onSubmit={handleSubmit}>
                <FontAwesomeIcon className={styles.add} icon={faUserPlus}/>
                <input className={styles.input} ref={ref} type="text" placeholder="Digite o nome" value={name} onChange={(e) => setName(e.target.value)} />
                <input className={styles.btn} type="submit" value="Adicionar" disabled={!name} />
                {error&& <p>Este nome já foi incluido na lista</p>}
                {list&& list.length > 0 ? list.map((name: string) => 
                    <>
                        {show&& <p className={styles.txt}>{name}</p>}
                    </>) : (show&& <p className={styles.txt}>Não há nenhum nome na lista</p>)}
            </form>
            <div className={styles.containerfinal}>
                {list&& list.length > 0&& list.length % 2 == 0 ?  
                    <div>
                        <FontAwesomeIcon className={styles.play} icon={faPlayCircle}/>
                        <button className={styles.btn2} onClick={handleClick}>Sortear</button>
                    </div> : (
                    <div>
                        <FontAwesomeIcon className={styles.play} icon={faPlayCircle}/>
                        <button className={styles.btn2} disabled>Sortear</button>
                    </div>
                    ) }
                <img className={styles.sacola} src={sacola} alt="sacola" />
            </div>
            {list&& list.length > 0 ? (<p>{person}</p>) : (<p>Todos os nomes foram sorteador</p>)}
        </div>
    </div>
  )
}

export default Form