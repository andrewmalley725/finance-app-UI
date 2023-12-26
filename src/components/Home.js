import { useEffect, useState } from "react";
import axios from 'axios';


export default function Home({ api }){
    const [data, setData] = useState({accounts: []})

    useEffect(() => {
        axios.get(`${api}/accounts/${localStorage.getItem('userId')}`).then((response) => {
            setData(response.data);
        })
    }, [api]);

    console.log(data);
    return(
        <div>
            <h1>Welcome {data.user}</h1>
            <h3>Total balance: ${data.total_balance}</h3>

            <h4>Accounts:</h4>
            { data.accounts.length > 0 ?
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Weight</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.accounts.map((rec) => {
                            return(
                                <tr>
                                    <td>{rec.account_name}</td>
                                    <td>%{rec.weight * 100}</td>
                                    <td>{rec.balance}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table> : <h4>You don't have any accounts set up</h4>}
        </div>
    );
}