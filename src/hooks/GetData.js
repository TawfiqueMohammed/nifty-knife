import React, { useEffect, useState } from 'react';

const GetData = () => {
    const [getData, setGetData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/product')
            .then(res => res.json())
            .then(newData => setGetData(newData))
    }, [])
    return [getData, setGetData];
};

export default GetData;