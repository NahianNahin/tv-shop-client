import { useEffect, useState } from "react";

const useToken = email => {
    const [token, setToken] = useState('');
    useEffect(() => {
        if (email) {
            fetch(`https://my-assignment-12-server.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.token) {
                        localStorage.setItem('TV_Shop_Token', data.token);
                        setToken(data.token);
                    }
                })
        }
    }, [email]);
    return [token];
}

export default useToken;