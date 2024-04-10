import { Alert } from "@mui/material"

export default function MessageBox(props) {

    const {error , seterror} = props

    return (
        // <div className={error ? "d-block" : "d-none"}>
        //     <div className={`modal fade ${error ? "show" : ""}`} style={{display: error ? "block" : "" , zIndex:"1000"}} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" >
        //         <div className="modal-dialog" style={{zIndex:"10000"}}>
        //             <div className="modal-content">
        //                 <div className="modal-header">
        //                     <h5 className="modal-title text-danger text-center w-100 fs-3 " id="exampleModalLabel">Error</h5>
        //                     <button type="button " className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        //                 </div>
        //                 <div className="modal-body">
        //                     {error}
        //                 </div>
        //                 <div className="modal-footer">
        //                     <button type="button" onClick={()=>seterror("")} className="btn btn-danger" data-bs-dismiss="modal">Close</button>
        //                 </div>
        //             </div>
        //         </div>
        //         <div onClick={()=> seterror("")} className="" style={{position:"fixed",transition:"all .6s ease" , top:"0" , left:"0" , background:"#00000021" , minWidth:"100%" , minHeight:"100vh" , zIndex:"1000" , opacity:"0.7"}}>

        //         </div>
        //     </div>
        // </div>
        <Alert className={error ? "d-flex" : "d-none"} severity="error"> <b>{error}</b> This is an error alert — check it out!</Alert>
        
    )
}