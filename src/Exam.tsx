import React, {useState} from 'react';

export interface IQ {
    id: number,
    question: string,
    optionList: string[],
    ans: string[],
    type: string
}

export interface IQMap {
    [key: string]: IQ[]
}

interface IAnswer {
    [key: number]: string[]
}

const Exam = (props: any) => {

    const {candidate} = props.location.state;

    let qList: IQMap = {};

    qList["ReactJS"] = [
        {
            id: 1,
            question: "React.js is a free and open-source front-end_____.",
            optionList: [
                "JavaScript library", "Bootstrap library", "CSS library", "None of the Above"
            ],
            ans: ["JavaScript library"],
            type: "single"
        },
        {
            id: 2,
            question: "Which language we can use for reactJS?",
            optionList: [
                "Java", "Javascript", "Python", "Typescript"
            ],
            ans: ["Javascript", "Typescript"],
            type: "multiple"
        },
        {
            id: 3,
            question: "When React.js was Initially released?",
            optionList: [
                "May 29, 2013", "April 29, 2013", "June 29, 2013", "May 29, 2014"
            ],
            ans: ["May 29, 2013"],
            type: "single"
        },
        {
            id: 4,
            question: "React.js had Written in___.",
            optionList: [
                "JavaScript", "Python", "Java", "Php"
            ],
            ans: ["JavaScript"],
            type: "single"
        },
        {
            id: 5,
            question: "What is Babel?",
            optionList: [
                "A JavaScript transpiler", "A JavaScript interpreter", "A JavaScript Compiler", "None of the above"
            ],
            ans: ["A JavaScript Compiler"],
            type: "multiple"
        }
    ];

    qList["Angular"] = [
        {
            id: 1,
            question: "Which of the following is correct about TypeScript?",
            optionList: [
                "Angular is based on TypeScript", "This is a superset of JavaScript", "TypeScript is maintained by Microsoft", "All of the above"
            ],
            ans: ["All of the above"],
            type: "single"
        },
        {
            id: 2,
            question: "Router is part of which of the following module?",
            optionList: [
                "@angular/core", "Router Support", "@angular/router", "None of the above"
            ],
            ans: ["@angular/core", "@angular/router"],
            type: "multiple"
        },
        {
            id: 3,
            question: "What does AOT stand for?",
            optionList: [
                "Ahead-Of-Time Compilation", "Angular Object Templates", "Both", "None of above"
            ],
            ans: ["Ahead-Of-Time Compilation"],
            type: "single"
        },
        {
            id: 4,
            question: "Observables help you manage _____ data",
            optionList: [
                "Synchronous", "Asynchronous", "Both", "None of above"
            ],
            ans: ["Asynchronous"],
            type: "single"
        },
        {
            id: 5,
            question: "Where would you put it?",
            optionList: [
                "In the Component", "In the Template", "In the Injectable decorator", "In the module"
            ],
            ans: ["In the Injectable decorator"],
            type: "multiple"
        }
    ];

    const [qNumber, setQNumber] = useState(1);
    const [answer, setAnswer] = useState<IAnswer>({})
    const [isSubmit, setIsSubmit] = useState(false);
    const [correct, setCorrect] = useState(2);
    const [wrong, setWrong] = useState(3);

    const handleInputAnswer = (q: IQ, value: string, isChecked?: boolean): void => {

        if (q.type === "multiple") {

            if (answer[q.id]) {
                setAnswer({...answer, [q.id]: [...answer[q.id], value]})
                if (isChecked) {
                    setAnswer({...answer, [q.id]: [...answer[q.id], value]})
                } else {
                    setAnswer({...answer, [q.id]: answer[q.id].filter(v => v !== value)})
                }
            } else {
                setAnswer({...answer, [q.id]: [value]});
            }

            return;
        }

        setAnswer({...answer, [q.id]: [value]})

    }

    const submitResult = () => {

        let correct = 0;
        let wrong = 0;

        qList[candidate.preferenceLang].forEach(q => {

            const ans = answer[q.id];

            if (JSON.stringify(q.ans) === JSON.stringify(ans)) {
                correct++;
            } else {
                wrong++;
            }

        })

        setCorrect(correct);
        setWrong(wrong);
        setIsSubmit(true);

    }

    const isAns = (q: IQ) => {

        const ans = answer[q.id];

        return ans && ans.length > 0;

    }

    const deg = (a: number, b: number) => {
        return (360 * a) / (a + b);
    }

    const q = qList[candidate.preferenceLang][qNumber - 1];

    return (
        <div style={{textAlign: "center"}}>

            <h1>Exam Page</h1>

            {
                isSubmit && <div>
                    <h3 style={{backgroundColor: "green", padding: "10px"}}>Correct is {correct}</h3>
                    <h3 style={{backgroundColor: "red", padding: "10px"}}>Wrong is {wrong}</h3>
                    <div
                        style={{
                            width: "400px",
                            height: "400px",
                            backgroundImage: `conic-gradient(
                            green 0deg ${deg(correct, wrong)}deg, 
                            red ${deg(correct, wrong)}deg 360deg)
                            `,
                            borderRadius: "50%",
                            margin: "auto"
                        }}
                    />
                </div>
            }

            {
                !isSubmit && <div>
                    {
                        qList[candidate.preferenceLang].map(q => (
                            <span key={q.id} style={{
                                display: "inline-block",
                                width: "30px",
                                height: "30px",
                                lineHeight: "30px",
                                cursor: "pointer",
                                borderRadius: "50%",
                                backgroundColor: `${isAns(q) ? "red" : "#787878"}`,
                                color: "#fff",
                                marginRight: "10px"
                            }}
                                  onClick={() => setQNumber(q.id)}
                            >
                      {[q.id]}
                  </span>
                        ))
                    }

                    <div style={{width: "500px", margin: "auto", textAlign: "left"}}>
                        {
                            <div key={q.id}>
                                <p>{q.id}.&nbsp;&nbsp;{q.question}</p>
                                {
                                    q.optionList.map(op => {
                                        if (q.type === "single") return (
                                            <label
                                                style={{
                                                    display: "block",
                                                    margin: "5px",
                                                    padding: "5px",
                                                    border: "1px solid black"
                                                }}
                                                key={op}
                                            >
                                                <input type="radio" name={q.question}
                                                       onChange={() => handleInputAnswer(q, op)}/>&nbsp;{op}
                                            </label>
                                        );

                                        return (<label
                                            style={{
                                                display: "block",
                                                margin: "5px",
                                                padding: "5px",
                                                border: "1px solid black"
                                            }}
                                            key={op}
                                        >
                                            <input type="checkbox"
                                                   onChange={(e) => handleInputAnswer(q, op, e.target.checked)}
                                                   name={op}/>&nbsp;{op}
                                        </label>)
                                    })
                                }
                            </div>
                        }
                        {
                            qNumber === 5 &&
                            <button onClick={submitResult} className="btn-style" style={{marginTop: "15px"}}>
                                SUBMIT ANSWER
                            </button>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Exam;