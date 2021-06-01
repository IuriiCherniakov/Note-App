import {FirebaseContext} from "./firebaseContext";
import {useReducer} from "react";
import {firebaseReducer} from "./firebaseReducer";
import {ADD_NOTE, REMOVE_NOTE, SHOW_LOADER} from "../Types";
import axios from "axios";

const url = process.env.REACT_APP_DB_URL

export const FireBaseState = ({children}) => {
    const initialState = {
        notes: [],
        loading: false
    }
    const [state, dispatch] = useReducer(firebaseReducer, initialState)
    const showLoader = () => dispatch({type: SHOW_LOADER})

    const fetchNotes = async() => {
        showLoader()
        const res = await axios.get(`https://note-app-db-14512-default-rtdb.firebaseio.com/notes.json`)
        console.log('fetchNotes', res.data)

        const payload = Object.keys(res.data).map(key => {
            return {
                ...res.data[key],
                id: key
            }
        })
    }

    const addNote = async title => {
        const note = {
            title, date: new Date().toJSON()
        }
        try {
            const res = await axios.post(`https://note-app-db-14512-default-rtdb.firebaseio.com/notes.json`, note)
            const payload = {
                ...note,
                id: res.data.name
            }
            dispatch({
                type: ADD_NOTE,
                payload
            })


        } catch(e) {
            throw new Error(e.message)
        }
    }
    const removeNote = async id => {
        await axios.delete(`https://note-app-db-14512-default-rtdb.firebaseio.com/notes/${id}.json`)
        dispatch({
            type: REMOVE_NOTE,
            payload: id
        })
    }

    return (
        <FirebaseContext.Provider value={{
            showLoader, addNote, removeNote, fetchNotes,
            loading: state.loading,
            notes: state.notes
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}