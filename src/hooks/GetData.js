import React, { useEffect, useState } from 'react';

const GetData = () => {
    const [getData, setGetData] = useState([]);

    useEffect(() => {
        fetch('https://fierce-refuge-65339.herokuapp.com/product')
            .then(res => res.json())
            .then(newData => setGetData(newData))
    }, [])
    return [getData, setGetData];
};

export default GetData;