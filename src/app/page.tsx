'use client'

import { listReducer } from '@/reducers/listReducer';
import { Item } from '@/types/item';
import {useState, useReducer, useEffect} from 'react'

import {BsTrashFill} from 'react-icons/bs'
import {AiFillEdit} from 'react-icons/ai'

export default function Home() {
  const [list, dispatch] = useReducer(listReducer, []);
  const [addField, setAddField] = useState('');
  const [newText, setNewText] = useState('');
  const [showEdit, setShowEdit] = useState(false)
  const [showId, setShowId] = useState(0)


  useEffect(()=>{
    let lista: Item[] | null | string | void = localStorage.getItem('Lista')
    if(lista == null){
      lista = localStorage.setItem('Lista', '')
      return
    }else if(lista != '' && lista != null){
      console.log(lista)
      let newList: Item[] = JSON.parse(lista)
      newList.forEach((item)=>{
        dispatch({
          type: 'add',
          payload:{
            text: item.text,
            done: item.done
          }
        })
      })
    }
    
  },[])

  useEffect(()=>{
    let lista: Item[] | null | string | void = localStorage.getItem('Lista')
    if(lista || lista == ''){
      lista = localStorage.setItem('Lista', JSON.stringify(list))
    }
  },[list])

  const handleAddButton = () =>{
    if(addField.trim().length < 5){
      alert('Seu texto tem que ter mais de 4 caracteres')
      return false
    }
    dispatch({
      type: 'add',
      payload:{
        text: addField.trim()
      }
    })
    setAddField('')
  }

  const handleDoneCheckBox = (id: number) =>{
    dispatch({
      type: 'toggleDone',
      payload:{
        id
      }
    })
  }

  const handleShowEdit = (text: string, id: number) =>{
    setNewText(text)
    setShowEdit(true)
    setShowId(id)
  }
  const handleEdit = (id: number) =>{
    if(newText.trim().length < 5){
      setShowEdit(false)
      return false
    }
    dispatch({
      type: 'editText',
      payload:{
        id,
        newText: newText
      }
    })
    setShowEdit(false)
  }
  const handleRemove = (id: number) =>{
    if(!window.confirm('Tem certeza que deseja excluir'))return false
    dispatch({
      type: 'remove',
      payload: {
        id
      }
    })
  }
  

  return (
    <div className='container max-w-2xl'>
     
      <h1 className='text-center text-4xl my-4'>Lista de Tarefas</h1>
      <div className= 'max-w-2xl mx-auto flex rounded-md bg-gray-900 border border-gray-400 p-4 my-4'>
        <input 
          placeholder='Digite um item'
          type='text' 
          className='outline-none flex-1 rounded-md border border-white p-3 bg-transparent text-white text-xs md:text-base' 
          value={addField}
          onChange={e=>setAddField(e.target.value)}
        />
        <button 
          className='p-4 text-xs md:text-base'
          onClick={handleAddButton}
        >
          ADICIONAR
        </button>
      </div>
      <ul className='max-w-2xl mx-auto'>
        {list.map(item =>(
          <li
            className='flex items-center p-3 my-3 border-b border-gray-700' 
            key={item.id}
          >
            <input 
              type='checkbox'
              className='w-4 h-4 mr-4 md:w-6 md:h-6'
              checked={item.done}
              onClick={() => handleDoneCheckBox(item.id)}
              onChange={()=>{}}
            />
            {showEdit && showId == item.id ? (
              <input 
                type='text' 
                placeholder='Editando...'
                value={newText}
                onChange={e => setNewText(e.target.value)}
                className='flex-1 bg-transparent border rounded-md px-3 text-white text-xs md:text-lg' 
                />
            ):(
              <p className='flex-1 text-xs md:text-lg'>{item.text}</p>
            )}
            
            <button onClick={showEdit ? ()=>handleEdit(item.id) as any : ()=>handleShowEdit(item.text, item.id) as any} className='mx-4 hover:text-gray-500'>
              {showEdit && showId == item.id ? (
                <p className='text-xs md:text-lg'>Salvar</p>
              ):(
                <AiFillEdit size={25} />
              )}
             
              
              </button>
            <button 
              onClick={()=>handleRemove(item.id)}
              className='mx-4 hover:text-gray-500'
            >
              <BsTrashFill size={21}/>
            </button>
          </li>
        ))}
      </ul>
      
    
    </div>
  )
}
