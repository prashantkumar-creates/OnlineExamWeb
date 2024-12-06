import React from 'react'
import { useState, useEffect, useRef } from 'react';

const Timer = () => {
    const [timerDays, setTimerDays] = useState("01");
    const [timerHours, setTimerHours] = useState("01");
    const [timerMinutes, setTimerMinutes] = useState("01");
    const [timerSeconds, setTimerSeconds] = useState("10");

    const [testNotStarted, setTestNotStarted] = useState(true);
    const [testEnded, settestEnded] = useState(false)

    let interval = useRef();
    let y = useRef();

    const startTimer = () => {

        const countdownDate = new Date("2021-08-04 22:20").getTime();
        const countdownDate2 = new Date("2021-08-04 23:20").getTime();

        interval = setInterval(() => {
            const label = document.getElementById("label");
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance <= 1000) {
                clearInterval(interval.current);
                var y = setInterval(function () {
                    setTestNotStarted(false);
                    var now = new Date().getTime();
                    var distance = countdownDate2 - now;
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    setTimerDays(days);
                    setTimerHours(hours);
                    setTimerMinutes(minutes);
                    setTimerSeconds(seconds);
                    if (distance < 0) {
                        clearInterval(y);
                        settestEnded(true);
                    }
                }, 1000);
            }
            else {
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000);
    }

    //componentDidMount
    useEffect(() => {
        var i = interval.current;
        var j = y.current;
        startTimer();
        return () => {
            clearInterval(i);
            clearInterval(j);
        }
    })

    return (
        <div>
            {
                testNotStarted ?
                    <section className="kk-timer-container section">
                        <section className="kk-timer section">
                            <label id="label" className="label">Test starts in :</label>
                            <div>
                                <section>
                                    <p>{timerDays}</p>
                                    <p><small>Days</small></p>
                                </section>
                                <span>:</span>
                                <section>
                                    <p>{timerHours}</p>
                                    <p><small>Hours</small></p>
                                </section>
                                <span>:</span>
                                <section>
                                    <p>{timerMinutes}</p>
                                    <p><small>Minutes</small></p>
                                </section>
                                <span>:</span>
                                <section>
                                    <p>{timerSeconds}</p>
                                    <p><small>Seconds</small></p>
                                </section>
                            </div>
                        </section>
                    </section>
                    :
                    testEnded ? <h1>Test Ended</h1> :
                        <div>
                            {/* <h1>Test Started</h1> */}
                            <div className="centerTime">
                                <section >
                                    <p>{timerHours}hr&nbsp;</p>
                                    {/* <p><small>Hours</small></p> */}
                                </section>
                                <span>:</span>
                                <section>
                                    <p>&nbsp;{timerMinutes}min&nbsp;</p>
                                    {/* <p><small>Minutes</small></p> */}
                                </section>
                                <span>:</span>
                                <section>
                                    <p>&nbsp;{timerSeconds}sec</p>
                                    {/* <p><small>Seconds</small></p> */}
                                </section>
                            </div>
                            <div>
                            <div className="descriptiveQuestion">
                                    <div className="question">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed architecto doloremque suscipit, a, et odit quis nemo nesciunt beatae ratione laboriosam facere fugiat consequuntur? Illo neque quibusdam provident ducimus sunt, obcaecati consectetur repudiandae! Libero officiis hic error perferendis autem culpa.
                                    </div>
                                    <div className="answer">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos laboriosam, sed expedita incidunt accusamus deleniti animi inventore voluptatum quam voluptates, dolor velit et temporibus possimus explicabo soluta? Laborum, laboriosam officia.
                                    </div>
                                </div>
                            </div>
                        </div>
            }
        </div>
    );

}

export default Timer;