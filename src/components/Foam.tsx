import React, { useState } from 'react'
import '../styles/Styles.css';
import {gql,useMutation} from '@apollo/client'
import { navigate } from 'gatsby-link';

const CREATE_LOLLY = gql`
mutation new_lolly($To : String!,$From : String!,$Message : String!,$cTop : String!,$cBottom : String!,$cMiddle : String!){
    new_lolly(to:$To,from:$From,message:$Message,cTop:$cTop,cBottom:$cBottom,cMiddle:$cMiddle){
        id
        to
        from
        message
        cTop
        cBottom
        cMiddle
        linkPath
    }
}
`;


const Foam = ({cTop,cMiddle,cBottom}) => {

    const [new_lolly] = useMutation(CREATE_LOLLY);
    const submitLollyForm = async () => {
        
        const result =   await new_lolly({
            variables: {
                To: To,
                Message: Message,
                From: From,
                cTop: cTop,
                cMiddle: cMiddle,
                cBottom: cBottom,
            },
            
        });
        console.log("Resuts =",result);
        await navigate(`/lolly/${result.data.new_lolly.linkPath}`);

    }

    const [To, setTo] = useState('');
    const [Message, setMessage] = useState('');
    const [From, setFrom] = useState('');
    return (
        <form className="Form" onSubmit={(e)=>{e.preventDefault();submitLollyForm();}}>
            <div className="formContainer">
                <label className="formLabel" htmlFor="to">To</label>
                <input type="text" className="to" value={To} onChange={(e) => { setTo(e.currentTarget.value.charAt(0).toUpperCase()+e.target.value.slice(1));}} placeholder="Recipient name" /><br />
                <label className="formLabel" htmlFor="message">Message</label>
                <textarea type="text" className="message" value={Message} onChange={(e) => { setMessage(e.currentTarget.value.charAt(0).toUpperCase()+e.target.value.slice(1)); }} placeholder="Your Message" /><br />
                <label className="formLabel" htmlFor="from">From</label>
                <input type="text" className="from" value={From} onChange={(e) => { setFrom(e.currentTarget.value.charAt(0).toUpperCase()+e.target.value.slice(1)); }} placeholder="Sender name" /><br />
                <button disabled={To === '' || Message === '' || From === '' ? true:false} className="sendButton" type="submit">Freeze this lolly and get Link</button>
            </div>
        </form>
    )
}

export default Foam
