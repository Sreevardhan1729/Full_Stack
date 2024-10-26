const Name = (props) =>{
    return (
        <div>
            <p>
                {props.name} : {props.number}
                <button onClick={props.deleteInfo}>delete</button>
            </p>
        </div>
    )
}
export default Name