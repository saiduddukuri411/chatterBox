import React from 'react'

export const useFormHook = (initialValues) => {
    const [values,setValues]=React.useState(initialValues);
   
    const onChangeHandler=React.useCallback((e)=>{
      const name=e.target.name,value=e.target.value
      setValues((prev)=>{
        return{...prev,[name]:value}
      })
    },[])

    return [values,onChangeHandler];

}
