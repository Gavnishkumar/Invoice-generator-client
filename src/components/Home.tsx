import React, { useEffect, useState } from 'react';
import Table from './Table';
import AddProduct from './AddProduct';
import { usePDF } from 'react-to-pdf';

// Styles for the PDF document
const InvoiceGenerator:React.FC =()=>{
  interface tableInterface {
    name:string,
    quantity:number,
    price:number
  }
 
  const { toPDF, targetRef } = usePDF({filename: 'Invoice.pdf'});
  const [IsAddProduct,setIsAddProduct]= useState<boolean>(false);
  const [tableEntry,setTableEntry]=useState<tableInterface[]>([{
    name:'Item 1',
    quantity:2,
    price:300
}])
  const [totalAmount,setTotalAmount]= useState<number>();
  const [FinalAfterGstAmount,setFinalAfterGstAmount]= useState<number>();
  const [gst,setGst]= useState<number>();
  

  const [isDownloading,setIsDownloading]=useState<boolean>(false);
  useEffect(()=>{
    let amount:number=0;
    let totalProducts:number=0;
    tableEntry.forEach((element,index) => {
      if(index>0){
        amount= amount+(element.price)*(element.quantity)
        totalProducts=totalProducts+element.quantity;
      }
    });
    setTotalAmount(amount);
    setGst((amount*18/100))
    amount= (amount*82/100);
    setFinalAfterGstAmount(amount)
    
  },[tableEntry])
const handleAddProduct=()=>{
  setIsAddProduct(true)
}
const handleDownloading=()=>{
  setIsDownloading(true);
  setTimeout(() => {
    
    toPDF();
  }, 1000);
}
useEffect(()=>{
  setTimeout(() => {
    setIsDownloading(false);
  }, 3000);
},[isDownloading])
  return (
    <>
    {localStorage.getItem('authToken') ? <div ref={targetRef}>
      <h3 className="Invoice-heading" >Bill(levitnation - Invoice)</h3>
      {IsAddProduct? <AddProduct tableEntry={tableEntry} setTableEntry={setTableEntry} setIsAddProduct={setIsAddProduct}/>:<Table tableEntry={tableEntry}/>}
      {!IsAddProduct && <div className='sell-detail table-container'>
        <div className='bottom-section' style={{display:'flex',flexDirection:'column'}}>
          {!isDownloading && <button  onClick={handleAddProduct} className='add-product-btn'>Add Product</button>}
          {!isDownloading && <button className='add-product-btn' onClick={handleDownloading}>Download Bill</button>}
        </div>
        <div className='bottom-section'>
          <div className="amount" >
            <h5>Total</h5>
            <h5>INR {totalAmount}</h5>
          </div>
          <div className="amount" >
            <h5>GST(18%)</h5>
            <h5>INR {gst}</h5>
          </div>
          <hr></hr>
          <div className="amount" style={{marginTop:'0px!important'}} >
            <h5>Grand Total</h5>
            <h5>INR {FinalAfterGstAmount}</h5>
          </div>
        </div>
      </div>}
      
    </div>:<h2 style={{width:'20%',margin:'auto',marginTop:'20px'}}>Please login....</h2>}
    </>
  );
};

export default InvoiceGenerator;
