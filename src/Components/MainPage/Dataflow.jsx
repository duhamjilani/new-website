import React, { useState, useEffect } from "react";
import "./Dataflow.css";
import { MdCloudUpload } from "react-icons/md";

import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';  
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const Dataflow = () => {
  const [PhoneNumber, setPhoneNumber] = useState("");
 
  const [FileInfo, setFileInfo] = useState("");
  const [ ReceiverEmail, setReceiverEmail] = useState("");
  const [FullName, setFullName] = useState("");
 
  const [IsPhysician, setIsPhysician] = useState("");
  const [IsUrgent, setIsUrgent] = useState();
  const [IsPaid,setIsPaid]=useState(true)
  const [TotalPrice, setTotalPrice] = useState(0);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);  // Update the phone with country code
  };

  const handleFile = (e) => {
    setFileInfo(e.target.files[0]);
  };

  const handlePhysicianChange = (e) => {
    setIsPhysician(e.target.value);
  };

  const handleUrgentlyChange = (e) => {
    setIsUrgent(JSON.parse(e.target.value));
  };

  const calculateTotal = () => {
    let price = 0;

    if (IsPhysician === "yes") {
      price =211;
    } else if (IsPhysician === "no") {
      price = 169;
    }

    if (IsUrgent ===true && IsPhysician==="yes") {
      price =337;
    }
    if (IsUrgent === true && IsPhysician==="no") {
      price =309;
    }

    setTotalPrice(price);
  };

  useEffect(() => {
    calculateTotal();
  }, [IsPhysician,IsUrgent]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
  
 
  if (!FullName || !PhoneNumber || !ReceiverEmail || !FileInfo) {
    Swal.fire({
      title: "Incomplete Form",
      text: "Please fill in all required fields",
      icon: "error",
    });
    return; 
  }
    
    const formData = {
     
      
    
     
     
     
     
      

      FullName,
      PhoneNumber,
      ReceiverEmail,
      IsPhysician,
      IsUrgent,
      IsPaid,
      FileInfo,
      TotalPrice
    };
    
   
    
  
    navigate('/apply/dataflow/paypal', { state: { formData } });





  };
  // total:total
  

  return (
    <div className="BIG-CONTAINER">
      <h1>{t('title')}</h1>
      <div className="Big-box2">
        <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
          <div className="field">
            <label htmlFor="FULL NAME">{t('FULL NAME')}</label>
            <input
              type="text"
              placeholder="FULL NAME"
              name="FULL NAME"
              required
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </div>

          <div className="field">
            <label htmlFor="EMAIL">{t('Email')}</label>
            <input
              type="email"
              placeholder="Email"
              name="Email"
              onChange={(e) => {
                setReceiverEmail(e.target.value);
              }}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="phone">{t('phoneNumber')}</label>
            <PhoneInput
              country={'us'}  // Default country
              value={PhoneNumber}
              onChange={handlePhoneChange}
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true
              }}
            />
          </div>

          <div className="file">
            <div className="upload">
              <MdCloudUpload />
              <label className="custom-file-upload">
                {t('chooseFile')}
                <input type="file" name="file1" onChange={handleFile}   />
              </label>
            </div>
          
          </div>

          <div className="radio_buttons">
            <label htmlFor="physician">{t('physician')}</label>
            <input
              type="radio"
              value="yes"
              name="physician"
              id="physician-yes"
              onChange={handlePhysicianChange}
            />
            <label htmlFor="yes">{t('yes')}</label>
            <input
              type="radio"
              value="no"
              name="physician"
              id="physician-no"
              onChange={handlePhysicianChange}
            />
            <label htmlFor="no">{t('no')}</label>
          </div>

          <div className="radio_buttons">
            <label htmlFor="urgently">{t('urgently')}</label>
            <input
              type="radio"
              value='true'
              name="urgently"
              id="urgently-yes"
              onChange={handleUrgentlyChange}
            />
            <label htmlFor="yes">{t('yes')}</label>
            <input
              type="radio"
              value='false'
              name="urgently"
              id="urgently-no"
              onChange={handleUrgentlyChange}
            />
            <label htmlFor="no">{t('no')}</label>
          </div>
          <p className="note"> {t('note')}</p>
          <div className="price">
            <label htmlFor="total">{t('total')}</label>
            <input type="text" name="total" disabled value={`${TotalPrice}$`} />
          </div>
          <button className="custom-button btn" type="submit">
            {t('submit')}
          </button>
        </form>
      </div>

      <div className="contain">
        <h3>{t('fileMustContain')}</h3>
        <div className="bigOne">
          <div className="box3 green">
            <h4>{t('passport')}</h4>
          </div>
          <div className="box3">
            <h4>{t('degree')}</h4>
          </div>
          <div className="box3">
            <h4>{t('professionalPractice')}</h4>
          </div>
          <div className="box3 green">
            <h4>{t('markSheet')}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dataflow;

