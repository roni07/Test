import React, {useState} from 'react';
import {useHistory} from "react-router-dom";

export interface ICandidate {
    name: string,
    gender: string,
    preferenceLang: string
}

const Home = () => {

    const history = useHistory();

    const [candidate, setCandidate] = useState<ICandidate>({
        name: "",
        gender: "MALE",
        preferenceLang: "ReactJS"
    });

    const handleInputChange = (e: any): void => {
        setCandidate({
            ...candidate,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = (e: any): void => {
        e.preventDefault();
        if (!candidate.name || !candidate.gender || !candidate.preferenceLang) {
            return alert("Please fill out all the field.");
        }

        history.push({pathname: "/exam", state: {candidate}});

    }

    return (
        <div className="App" style={{padding: "20px 0"}}>
            <h1>Online MCQ</h1>
            <div style={{
                marginTop: "20px",
                width: "400px",
                display: "flex",
                flexDirection: "column",
                margin: "auto"
            }}>
                <input
                    type="text"
                    placeholder="Name"
                    className="input-style"
                    value={candidate.name}
                    onChange={handleInputChange}
                    name="name"
                />
                <select
                    placeholder="Male"
                    className="input-style"
                    value={candidate.gender}
                    onChange={handleInputChange}
                    name="gender"
                >
                    <option key={1} value="MALE">Male</option>
                    <option key={2} value="FEMALE">Female</option>
                </select>

                <select
                    placeholder="Note"
                    className="input-style"
                    value={candidate.preferenceLang}
                    onChange={handleInputChange}
                    name="preferenceLang"
                >
                    <option key={1} value="ReactJS">React JS</option>
                    <option key={2} value="Angular">Angular</option>
                </select>
                <button
                    className="btn-style"
                    onClick={handleSubmit}
                >
                    SUBMIT
                </button>
            </div>
        </div>
    );
}

export default Home;
