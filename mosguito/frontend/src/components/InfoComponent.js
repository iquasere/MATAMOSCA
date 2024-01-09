import React from 'react';

function InfoComponent(props) {
    return (

        <div>
            <div style={{
                backgroundColor: "transparent",
                height: "120px",
            }}>

                <div className='fw-light fs-5' style={
                    {
                        marginTop: "5px",
                        marginLeft: "20px",
                        backgroundColor: "white",
                    }
                }>
                    <b><small>{props.name ?
                        props.name :
                        props.title}</small></b>
                </div>

                <div className='fw-light' style={{
                    marginTop: "15px",
                    marginLeft: "20px",
                    lineHeight: "10px",
                }} >
                    {props.research_group ?
                        <p>{props.research_group}</p> :
                        <p>{props.authors}</p>
                    }
                    {props.institution ?
                        <p>{props.institution}</p> :
                        <p>{props.article_info}</p>
                    }
                    {props.doi &&
                        <p>{props.doi}</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default InfoComponent;