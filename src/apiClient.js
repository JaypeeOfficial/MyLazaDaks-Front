import axios from 'axios';

import React, { Component } from 'react'

export default axios.create({


    baseURL: "https://localhost:7239/api/",
    headers: {
        "Content-type": "application/json",  
        "Authorization": 'Bearer'
    }
})
