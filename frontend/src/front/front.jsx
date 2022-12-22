import "./front.css"
const Front = ({loginData}) => {
    return(
        <div className="front">
            <h1>Hello <span>{loginData.Name}</span> </h1>
            <h3>How are you? </h3>
            <h3><span>{loginData.Email}</span></h3>

            {/* <button onClick={()=>{
                console.log(loginData)
            }}>Click ME</button> */}
        </div>

    )
}
export default Front;