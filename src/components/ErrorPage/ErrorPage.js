import React, { useState, useEffect } from 'react';
import { getSalesForceFlow, getWorkflow } from '../../api/network';
import { useHistory, useParams } from 'react-router-dom';

export default function WorkflowDetail() {
    const history = useHistory();
    const { id } = useParams();

    const [, setOptions] = useState([]);
    const [, setFormData] = useState({
        name: '',
        desc: '',
        flowUrl: '',
        query: '',
        active: true,
    });

    useEffect(() => {
        (async () => {
            const res = await getSalesForceFlow();
            setOptions(res);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                if (id) {
                    const res = await getWorkflow(id);
                    setFormData({
                        name: res.name,
                        desc: res.desc,
                        flowUrl: res.flow_url,
                        query: res.sql_query,
                        active: res.active,
                    });
                }
            } catch (error) {
                history.push('/404');
            }
        })();
    }, [history, id]);

    return <div className="ml-8">Error Status Code: 404</div>;
}
