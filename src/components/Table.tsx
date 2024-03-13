import React from 'react'

interface TableProps {
    tableEntry: {

      name: string;
      quantity: number;
      price: number;
    }[];
  }
const Table:React.FC<TableProps>=(props)=> {
   
    const { tableEntry } = props;
  

  return (
    <div className="table-container">
      <table className="table">
      <thead>
        <tr>
          <th>Sno</th>
          <th>Product Name</th>
          <th>Product Qty</th>
          <th>Product Rate(INR)</th>
        </tr>
      </thead>
      <tbody>
        {tableEntry.map((product,index)=> (
          index>0 && <tr key={index}>
            <td>{index}</td>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td> {product.price.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    </div>
  )
}

export default Table
