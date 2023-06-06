import React, { useState } from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import { restoreState } from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)

    const start = () => {
        let intervalId: number = window.setInterval(() => {
            setDate(new Date())
        }, 1000)
        setTimerId(intervalId)
    }

    const stop = () => {
        clearInterval(timerId)
        setTimerId(undefined)
    }

    const onMouseEnter = () => {
        setShow(true)
    }
    const onMouseLeave = () => {
        setShow(false)
    }

    const stringTime = `${date.toLocaleTimeString('ru-Ru')}`
    const stringDate = `${date.getDate() < 10 ? '0' + date.getDate()
        : date.getDate()}.${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1}.${date.getFullYear()}`

    const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const stringDay = weekDay[date.getDay()]
    const yearMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const stringMonth = yearMonth[date.getMonth()]

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={timerId !== undefined}
                    onClick={start}
                    style={{marginRight: 21, width: 84}}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={timerId === undefined}
                    onClick={stop}
                    style={{width: 84}}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
