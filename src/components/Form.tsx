import React, { useEffect } from 'react'
import { useState, FormEvent, useRef } from 'react'
import styles from "./Form.module.css"
import logo from "../public/images/logo.png"
import arte from "../public/images/participante.png"

type Props = {}

const Form = (props: Props) => {
    const [name, setName] = useState<string>("")
    const [list, setList] = useState<string[]>([])
    const [error, setError] = useState<boolean>(false)
    const [person, setPerson] = useState<string>("")
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
    }
  
  return (
    <div className={styles.container}>
        <div className={styles.logocontainer}>
            <img className={styles.logo}  src={logo} alt="titulo" />
            <img className={styles.participante}  src={arte} alt="titulo" />    
        </div>
        <div className={styles.bottom}>
            <form onSubmit={handleSubmit}>
                <input ref={ref} type="text" placeholder="Digite o nome" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="submit" value="Adicionar" disabled={!name} />
                {error&& <p>Este nome já foi incluido na lista</p>}
                {list&& list.length > 0 ? list.map((name: string) => 
                    <>
                        <p key={"key"}>{name}</p>
                    </>) : (<p>Não há nenhum nome na lista</p>)}
            </form>
            {list&& list.length > 2? <button onClick={handleClick}>Sortear</button> : <button disabled>Sortear</button> }
            <p>{person}</p>
        </div>
    </div>
  )
}

export default Form