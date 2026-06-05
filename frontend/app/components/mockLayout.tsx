'use client'

import { useEffect, useRef, useState } from "react";
import { Person } from "../interfaces/index"
import { mock } from "node:test";

export interface Input {
  id: string;
  value: string | number,
  label: string
}

export default function MockLayout( { settingMocksList }){
    
  const [inputs, setInputs] = useState<Input[]>([]);
  const inputRef = useRef<Record<string, Input>>({})
  const [options, setOptions] = useState<string[]>([]);
  const selectedInputs = useRef<string[]>([]);
  const parameterList = useRef<string[]>([]);
  const [mocks, setMocks] = useState<Object[]>([])
  const [test, setTest] = useState<string>();
    

  let mockPlaceHolder = {
    "id":"1",
    "firstname": "Joe",
    "lastname":null,
    "email":null,
    "phone": null,
    "birthday":null,
    "gender": null,
    "address": {
    "id": null,
    "street": null,
    "streetName": null,
    "city": null,
    "country": null,}
  }
    
  useEffect(() =>{

    const newLayout = {
      person: {
        "id":"1",
        "firstname": null,
        "lastname":null,
        "email":null,
        "phone": null,
        "birthday":null,
        "gender": null,
        "address": {
        "id": null,
        "street": null,
        "streetName": null,
        "city": null,
        "country": null,}
      }
    }

    let values = []
    setOptions(Object.keys(newLayout.person))
    for (const value of Object.values(newLayout.person)){
    if(value != null){
      values.push(value) 
    }}
  },[])

  const addParameter = () =>{
    const parameterSelector = document.getElementById('parameterSelector') as HTMLSelectElement;
    const parameter = parameterSelector.value

    const newInput = {
      id: Date.now().toString(),
      value: parameter,
      label: parameter
    } as Input

    if( !inputs.some(input => input.value === newInput.value)){
      setInputs([...inputs, newInput])
      parameterList.current = [...parameterList.current, parameter]
    } else{
      console.log(newInput,inputs.some(input => input != newInput),inputs)
    }


  }

  const createMock = () =>{
    console.log("+++++++++++++++++++++++++++++++++++++++++++")

    let mockData = {}
    
    for(let key in mockPlaceHolder){
      if(mockPlaceHolder[key] != null){
        mockData[key] = mockPlaceHolder[key]
      }
    }

    settingMocksList(mockData)
    setMocks([...mocks, mockData])
    console.log(mockData)
  }

  /*
  const updateInput = (id, value, label) =>{
      const newUpdatedInput = {
          id: id,
          value: value,
          label: label
      } as Input

      inputRef.current[id] = newUpdatedInput
  }
  */

  const debugging = () =>{
    console.log(parameterList.current,test)
  }
  return(
    <form className="bg-blue-900 flex flex-col p-5 w-fit h-100 fixed inset-0 m-auto rounded-[7px]">
      <label>Plantilla para categorias</label>
      <select id="parameterSelector" name="" onChange={(e) => {setTest(e.target.value);console.log(e.target.value)}}>
        {
          options.map(option => (
            <option className="text-black" value={`${option}`}>{option}</option>
          ))
        }
      </select>
      <button type="button" className="bg-green-700 rounded-[7px]" onClick={() => addParameter()}>Agregar atributo</button>
      <div className="overflow-auto my-5" id="inputsContainer">
        {
          inputs.map((input, index) =>
          (
            <div className="flex flex-col">
              <label htmlFor="">{input.label}</label>
            </div>
          ))
        }
        {
          mocks.map( mock =>(
            <li>
              {mock.id}
            </li>
          ))
        }
      </div>
      <button type="button" onClick={() => createMock()}>Crear Mock</button>
      <button type="button" onClick={() => debugging()}>Debugging</button>
  </form>
  )
}