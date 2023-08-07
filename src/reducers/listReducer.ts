import { Item } from "@/types/item";
import { type } from "os";

type AddAction = {
    type: 'add';
    payload: {
        text: string
        done?: boolean
    };
}
type EditTextAction = {
    type: 'editText';
    payload: {
        id: number
        newText: string;
    };
}
type ToggleDoneAction = {
    type: 'toggleDone';
    payload: {
        id: number
    };
}
type RemoveAction = {
    type: 'remove';
    payload: {
        id: number
    };
}

type ListActions = AddAction | EditTextAction | ToggleDoneAction | RemoveAction;

export const listReducer = (list: Item[], action: ListActions) =>{
    //Executar alguma ação
   switch(action.type){
    case 'add':
        return [...list, {
            id: list.length, 
            text: action.payload.text, 
            done: action.payload.done == true ? true : false }
          ]
          
    case 'editText':
        return list.map((t, index)=>{
            if(t.id === action.payload.id){
                t.text = action.payload.newText
            }
            return t;
          })

    case 'toggleDone':
        return list.map((t)=>{
              if(t.id === action.payload.id)t.done = !t.done
              return t;
            })

    case 'remove':
        return list.filter(t => t.id !== action.payload.id)

    default:
        return list
   }
}