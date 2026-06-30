'use client'

import { useEffect, useRef, useState } from "react";
import { Person, FakerPerson } from "../interfaces/index"
import { mock } from "node:test";
import { faker } from '@faker-js/faker'
import { useSearchParams } from "next/navigation";
import { json } from "node:stream/consumers";

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
  const searchParams = useSearchParams();
  const routeFileId = searchParams.get('file');
  

  let mockPlaceHolder = {
    "parentId": null,
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
  } as Person

  const fakerLayout = {
    id: null,
    bio: null,
    fullName: null,
    jobTitle: null,
    sex: null
  } as FakerPerson

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
    setOptions(Object.keys(fakerLayout))
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
      
    }
  }

  const createMock = () =>{
    console.log("+++++++++++++++++++++++++++++++++++++++++++")
    const localStorage = window.localStorage; 
    let mocksId = localStorage.getItem('mocksId');
    let mocksIdCount = parseInt(JSON.parse(mocksId)) | 0;
    const mocksQuantity = document.getElementById('mocksQuantity') as HTMLInputElement
    
    let personMocks = []
    for (let i = 0; i !== parseInt(mocksQuantity.value); i++){
      let fakerPerson = {
        id: Date.now().toString(),
        bio: faker.person.bio(),
        fullName: faker.person.fullName({sex:"female"}),
        jobTitle: faker.person.jobTitle(),
        sex: faker.person.sex()
      } as FakerPerson

      let person = {} as FakerPerson
      for(let key of parameterList.current){
        person[key] = fakerPerson[key]
      }
      
      mocksIdCount += 1
      person.id = mocksIdCount.toString()
      person.parentId = routeFileId || '0';
      personMocks.push(person)
    }

    localStorage.setItem("mocksId",JSON.stringify(mocksIdCount))
    settingMocksList(personMocks)

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
    console.log(faker.person.fullName())
    console.log(localStorage.getItem('mocksId'))
  }
  return(
    <form className="bg-blue-900 flex flex-col p-5 w-fit h-100 fixed inset-0 m-auto rounded-[7px] gap-1" onSubmit={(e) => e.preventDefault()}>
      <label>Plantilla para categorias</label>
      <select id="parameterSelector" name="" onChange={(e) => {setTest(e.target.value)}}>
        {
          options.map((option, index) => (
            <option key={index} className="text-black" value={`${option}`}>{option}</option>
          ))
        }
      </select>
      <label htmlFor="">Cantidad de Mocks</label>
      <input id="mocksQuantity" type="number" min={0} />
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