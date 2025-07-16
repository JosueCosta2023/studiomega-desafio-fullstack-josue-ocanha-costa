import {useEffect, useState} from "react";
import axios from "axios";


export interface Lead{
    id: number;    
    name: string;
    email: string;
    phone: string;
    message?: string;
}

export function useLeads() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:3001/api/leads", {
            headers: {Authorization: `Bearer ${token}`},
        }).then((res) => setLeads(res.data) ).finally(() => setLoading(false))

    }, [])
    return{ leads, loading, setLeads}
}
