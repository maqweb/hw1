import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import Greeting from './Greeting'
import {UserType} from './HW3'

type GreetingContainerPropsType = {
    users: UserType[]
    addUserCallback: (name: string) => void
}

export const pureAddUser = (name: string, setError: (error: string) => void, setName: (name: string) => void, addUserCallback: (name: string) => void) => {
    // name.trim() === '' ? setError('Ошибка! Введите имя!') : addUserCallback(name); setName('')
    if (name.trim() === '') {
        setError('Ошибка! Введите имя!')
        return name
    } else {
        addUserCallback(name)
        setName('')
        setError('')
    }
}

export const pureOnBlur = (name: string, setError: (error: string) => void) => {
    if (name.trim() === '') {
        setError('Ошибка! Введите имя!')
    } else {
        setError('')
    }
}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: any) => {
    e.key === 'Enter' && addUser()
}


const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
    users,
    addUserCallback,
}) => {
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string>('')

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
        if (e.currentTarget.value.length) {
            setError('')
        }
        // if (!e.currentTarget.value.length && !e.currentTarget.focus) {
        //     setError('Ошибка! Введите имя')
        // }
        if (!e.currentTarget.value.length) {
            setError('Ошибка! Введите имя')
        }
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: any) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length
    const lastUserName = users.length > 0 ? users[users.length - 1].name : ''

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
