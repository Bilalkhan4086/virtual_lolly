import React, { useState } from 'react'
import Foam from '../components/Foam';
import Layout from '../components/layout'
import Lolly from '../components/Lolly'




const CreateNew = () => {
    const [cTop, setcTop] = useState('#d52358');
    const [cMiddle, setcMiddle] = useState('#e95946');
    const [cBottom, setcBottom] = useState('#deaa43');

  
    return (
        <div>
            <Layout>
                <div className="CreateMainDIv">
                    <div className="lollyflavor">
                        <div  style={{ margin: 'auto' }}>
                            <Lolly cTop={cTop} cMiddle={cMiddle} cBottom={cBottom} />
                        </div>
                        <div className="flavorSelector">
                            <label className="flavorPickerLabel" style={{ borderColor: cTop, boxShadow: `${cTop} 0 0 8px`, }} htmlFor="flavorPicker"><input type="color" onChange={(e) => { setcTop(e.currentTarget.value) }} className="flavorPicker" value={cTop} /></label>
                            <label className="flavorPickerLabel" style={{ borderColor: cMiddle, boxShadow: `${cMiddle} 0 0 8px`, }} htmlFor="a"><input type="color" onChange={(e) => { setcMiddle(e.currentTarget.value) }} className="flavorPicker" value={cMiddle} /></label>
                            <label className="flavorPickerLabel" style={{ borderColor: cBottom, boxShadow: `${cBottom} 0 0 8px`, }} htmlFor="a"><input type="color" onChange={(e) => { setcBottom(e.currentTarget.value) }} className="flavorPicker" value={cBottom} /></label>
                        </div>
                    </div>
<div>
                    <Foam cTop={cTop} cMiddle={cMiddle} cBottom={cBottom} />
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default CreateNew
