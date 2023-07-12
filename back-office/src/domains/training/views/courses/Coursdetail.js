import React, { useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { purple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { editcours, fetchOnecouse } from "../../../../store/courses";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";

const Coursdetail = () => {
const lecture=useSelector((state)=>state.courses.cours)
  const  dispatch=useDispatch()
 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [enddate, setEnddate] = useState("");
  const [startdate, setStartdate] = useState("");
  const { t, i18n } = useTranslation();
  const [editMode, setEditMode] = useState(false)

  console.log('cours is here ',lecture)
  const {lectureId}=useParams()
  

 useEffect(()=>{
  dispatch(fetchOnecouse(lectureId)) 
  }, [lectureId])

 

  // useEffect(()=>{
  //   setTitle(lecture?.title)
  //   setDescription(lecture?.description)
  //   setEnddate(lecture?.endAt)
  //   setStartdate(lecture?.startAt)
  // },[])

  // const handlecoursChange = (e) => {
  //   const { name, value } = e.target;
  //   setCours((Cours) => ({ 
  //     ...Cours,
  //      [name]: value ? parseFloat(value) : null }));
  // };


  
  
  const submitEditcours=async(event)=>{
    if(!editMode){
      event.preventDefault()
      setEditMode(true)
    }else{
      let body ={
        title,
        description,
        startDate: new Date(startdate),
        endDate: new Date(enddate),

      }
    
        dispatch(editcours({id:lectureId,body}) ).then((res)=>{
          if (!res.error) {
            showSuccessToast("session.created");
          
          } else {
            console.log(res);
            showErrorToast(res.error.message);
          }
        })
      setEditMode(false)
    }
  }


    
  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2> Courses</h2>
      <form className="checkout-form">
        <div className="d-flex flex-wrap">
          <div className="d-flex justify-content-center w-100 m-3">
            <TableContainer className="w-100" component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("titel")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          id="titel"
                          value={title}
                          name="titel"
                          type="text"
                          className="form-control"
                          onChange={(e)=>{setTitle(e.target.value)}}
                        />
                      ) : (
                        <span>{lecture?.titel} </span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("description")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          name="description"
                          value={description}
                          type="text"
                          className="form-control"
                          onChange={(e)=>{setDescription(e.target.value)}}
                        />
                      ) : (
                        <span>{lecture?.description}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("start")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          name="start"
                        
                          type="date"
                          className="form-control"
                          onChange={(e)=>{setStartdate(e.target.value)}}
                        />
                      ) : (
                        <span>{lecture?.startDate}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("end")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
            
                          name="End"
                          
                          type="date"
                          className="form-control"
                          onChange={(e)=>{setEnddate(e.target.value)}}
                        />
                      ) : (
                        <span>{lecture?.endDate}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  ></TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  ></TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <div className="w-100 d-flex justify-content-center">
          <button
            type="submit"
            className="confirm-button mt-3"
            onClick={submitEditcours}
          >
            <span className="label-btn">{editMode ? "حفظ" : "تعديل"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Coursdetail;
