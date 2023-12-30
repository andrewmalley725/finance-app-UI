import { useEffect, useRef, useState } from "react";
import axios from 'axios';


export default function Home({ api }){
    const [data, setData] = useState({accounts: []});
    const [show, setShow] = useState(false);
    const [render, setRender] = useState('');
    const [account, setAcc] = useState(null);
    const amount = useRef(0);


    useEffect(() => {
        axios.get(`${api}/accounts/${localStorage.getItem('userId')}`).then((response) => {
            setData(response.data);
        })
    }, [api]);

    const handleChange = (e) => {
        setAcc(e.target.value);
    }

    const handleClick = () => {
        if (render === 'expense'){
            const body = {
                userid: localStorage.getItem('userId'),
                accountid: account,
                amount: parseInt(amount.current)
            }

            console.log(body);

            axios.post(`${api}/newTransaction`, body).then(res => {
                window.location.reload();
            })
        } else {
            const body = {
                userid: localStorage.getItem('userId'),
                accountid: account !== 'none' ? account : null,
                amount: parseInt(amount.current)
            }

            axios.post(`${api}/payday`, body).then(res => {
                window.location.reload();
            })
        }
    }

    const renderContent = () => {
        if (render === 'expense') {
            return (
                <div className="mt-4">
                    <label htmlFor="expenseAmount" className="form-label">Amount:</label>
                    <input type="number" id="expenseAmount" className="form-control mb-2" onKeyUp={(e) => amount.current = e.target.value}/>
    
                    <label htmlFor="accountSelect" className="form-label">Account:</label>
                    <select id="accountSelect" className="form-select mb-3" onChange={handleChange}>
                        <option value="" disabled>Select account</option>
                        {data.accounts.length > 0 ?
                            data.accounts.map(rec => (
                                <option key={rec.accountid} value={rec.accountid}>{rec.account_name}</option>
                            )) : <></>
                        }
                    </select>
    
                    <button type="button" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </div>
            );
        } else {
            return (
                <div className="mt-4">
                    <label htmlFor="paydayAmount" className="form-label">Payday:</label>
                    <input type="number" id="paydayAmount" className="form-control mb-2" onKeyUp={(e) => amount.current = e.target.value}/>
    
                    <label htmlFor="accountSelectPayday" className="form-label">Account:</label>
                    <select id="accountSelectPayday" className="form-select mb-3" onChange={handleChange}>
                        <option value="" disabled>Select account</option>
                        <option value="none">none</option>
                        {data.accounts.length > 0 ?
                            data.accounts.map(rec => (
                                <option key={rec.accountid} value={rec.accountid}>{rec.account_name}</option>
                            )) : <></>
                        }
                    </select>
    
                    <button type="button" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </div>
            );
        }
    }
    
    return(
        <div className="container mt-5">
            <h1 className="mb-4">Welcome {data.user}</h1>
            <h3>Total balance: ${data.total_balance}</h3>

            <h4 className="mt-4">Accounts:</h4>
            {data.accounts.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Weight</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.accounts.map((rec) => (
                            <tr key={rec.accountid}>
                                <td>{rec.account_name}</td>
                                <td>%{rec.weight * 100}</td>
                                <td>{rec.balance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h4>You don't have any accounts set up</h4>
            )}

            <button 
                type="button" 
                className="btn btn-primary mt-4" 
                onClick={() => { setShow(true); setRender('expense'); setAcc(null) }}
            >
                Add Expense
            </button>
            <button 
                type="button" 
                className="btn btn-success mt-4 ms-2" 
                onClick={() => { setShow(true); setRender('payday'); setAcc(null) }}
            >
                Add Funds
            </button>

            <div className={show ? 'mt-4' : 'd-none'}>
                {renderContent()}
            </div>
        </div>
    );
}