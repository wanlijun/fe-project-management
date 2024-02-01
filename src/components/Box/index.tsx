import React from 'react';
interface IBox {
  title?: string;
  children: React.ReactNode
}
const Box: React.FC<IBox> = ({
  title,
  children
}) => {
  return (
    <div className='p-6 bg-white mb-5'>
      {
        title &&
        <div className='text-base font-bold mb-4'>{title}</div>
      }
      <div>{children}</div>
    </div>
  )
}
export default Box;