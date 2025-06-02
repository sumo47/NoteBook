import NoteContext from './NoteContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

const NoteState = (props) => {
  const [loading, setLoading] = useState(false)
  const [notes, setNotes] = useState([])
  const [archivedNotes, setArchivedNotes] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  
  const url = "https://notebookbackend.glitch.me";
  // const url = "http://localhost:4000";

  let navigate = useNavigate()

  // Clear all state when switching accounts
  const clearState = () => {
    // Also clear the saved page ID when logging out or switching accounts
    localStorage.removeItem("currentPageId")
    localStorage.removeItem("currentPageTitle")
    setNotes([])
    setArchivedNotes([])
    setSearchResults([])
    setIsSearching(false)
  }

  //*Login
  const login = async (credential, showAlert) => {
    const { email, password } = credential

    setLoading(true)
    // Clear state when logging in with a different account
    clearState()
    
    await axios.post(`${url}/login`, { email, password })
      .then((res) => {
        const token = res.data.token
        localStorage.setItem('x-api-key', token)
        showAlert("Logged in succcessfully!", "success")
        navigate('/')
      })
      .catch((err) => {
        if (err.response && err.response.data.status === false) {
          showAlert(`${err.response.data.message}`, "danger")
        } else {
          console.log(err)
        }
      })
    setLoading(false)
  }

  //*SignUp
  const SignUp = async (credentials, showAlert) => {
    const { name, email, password } = credentials

    setLoading(true)
    // Clear state when signing up a new account
    clearState()
    
    axios.post(`${url}/createUser`, { name, email, password })
      .then((res) => {
        localStorage.setItem("x-api-key", res.data.token)
        showAlert("Signed in successfully!", "success")
        navigate('/')
      })
      .catch((err) => {
        if (err.response && !err.response.data.status) {
          showAlert(`${err.response.data.message}`, "danger")
        } else {
          console.log(err)
        }
      })
    setLoading(false)
  }

  //*GetNotes
  const getNotes = async (pageId = null, startDate = "", endDate = "") => {
    setLoading(true)
    try {
      // Clear existing notes while loading to prevent stale data
      setNotes([])
      
      let endpoint = `${url}/getNotes`;
      
      // Add query parameters if provided
      const params = new URLSearchParams();
      if (pageId) params.append('pageId', pageId);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      if (params.toString()) {
        endpoint += `?${params.toString()}`;
      }
      
      console.log("Fetching notes with endpoint:", endpoint);
      
      const response = await axios.get(endpoint, { 
        headers: { 'x-api-key': localStorage.getItem('x-api-key') } 
      });
      
      setNotes(response.data.message || []);
      console.log(`Fetched ${response.data.message?.length || 0} notes for page ID: ${pageId}`);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    } finally {
      setLoading(false)
    }
  }

  // Get archived notes
  const getArchivedNotes = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${url}/getArchivedNotes`, { 
        headers: { 'x-api-key': localStorage.getItem('x-api-key') } 
      });
      setArchivedNotes(response.data.message || []);
    } catch (error) {
      console.error("Error fetching archived notes:", error);
    } finally {
      setLoading(false)
    }
  }

  // Search notes
  const searchNotes = async (query) => {
    setLoading(true)
    setIsSearching(true)
    try {
      const response = await axios.get(`${url}/searchNotes?query=${query}`, { 
        headers: { 'x-api-key': localStorage.getItem('x-api-key') } 
      });
      setSearchResults(response.data.message || []);
    } catch (error) {
      console.error("Error searching notes:", error);
      setSearchResults([]);
    } finally {
      setLoading(false)
    }
  }

  // Clear search
  const clearSearch = () => {
    setIsSearching(false);
    setSearchResults([]);
  }

  //*Add Note
  const addNote = async (note, showAlert) => {
    setLoading(true)
    const { title, description, tag, pageId } = note;

    try {
      await axios.post(
        `${url}/createNote`, 
        { title, description, tag, pageId }, 
        { headers: { 'x-api-key': localStorage.getItem('x-api-key') } }
      );
      
      getNotes(pageId);
      showAlert("Added successfully!", "success");
    } catch (error) {
      if (error.response && !error.response.data.status) {
        showAlert(`${error.response.data.message}`, "danger");
      } else {
        console.error("Error adding note:", error);
        showAlert("Failed to add note", "danger");
      }
    } finally {
      setLoading(false)
    }
  }

  //*Edit Note
  const editNote = async (note, showAlert) => {
    setLoading(true)
    const { id, title, description, tag, pageId } = note;

    try {
      await axios.put(
        `${url}/updateNote/${id}`, 
        { title, description, tag, pageId }, 
        { headers: { 'x-api-key': localStorage.getItem('x-api-key') } }
      );
      
      getNotes(pageId);
      showAlert("Edited successfully", "success");
    } catch (error) {
      if (error.response && !error.response.data.status) {
        showAlert(`${error.response.data.message}`, "danger");
      } else {
        console.error("Error editing note:", error);
        showAlert("Failed to edit note", "danger");
      }
    } finally {
      setLoading(false)
    }
  }

  //* Delete Note 
  const deleteNote = async (id, pageId, showAlert) => {
    setLoading(true)
    try {
      await axios.delete(
        `${url}/deleteNote/${id}`, 
        { headers: { 'x-api-key': localStorage.getItem('x-api-key') } }
      );
      
      getNotes(pageId);
      showAlert("Deleted successfully!", "warning");
    } catch (error) {
      if (error.response && !error.response.data.status) {
        showAlert(`${error.response.data.message}`, "danger");
      } else {
        console.error("Error deleting note:", error);
        showAlert("Failed to delete note", "danger");
      }
    } finally {
      setLoading(false)
    }
  }

  // Archive note
  const archiveNote = async (id, pageId, showAlert) => {
    setLoading(true)
    try {
      await axios.put(
        `${url}/archiveNote/${id}`, 
        {}, 
        { headers: { 'x-api-key': localStorage.getItem('x-api-key') } }
      );
      
      getNotes(pageId);
      showAlert("Note archived successfully!", "info");
    } catch (error) {
      if (error.response && !error.response.data.status) {
        showAlert(`${error.response.data.message}`, "danger");
      } else {
        console.error("Error archiving note:", error);
        showAlert("Failed to archive note", "danger");
      }
    } finally {
      setLoading(false)
    }
  }

  // Restore note from archive
  const restoreNote = async (id, showAlert) => {
    setLoading(true)
    try {
      await axios.put(
        `${url}/restoreNote/${id}`, 
        {}, 
        { headers: { 'x-api-key': localStorage.getItem('x-api-key') } }
      );
      
      getArchivedNotes();
      showAlert("Note restored successfully!", "success");
    } catch (error) {
      if (error.response && !error.response.data.status) {
        showAlert(`${error.response.data.message}`, "danger");
      } else {
        console.error("Error restoring note:", error);
        showAlert("Failed to restore note", "danger");
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <NoteContext.Provider value={{ 
      notes, 
      archivedNotes,
      searchResults,
      isSearching,
      loading,
      addNote, 
      editNote, 
      deleteNote, 
      getNotes,
      getArchivedNotes,
      archiveNote,
      restoreNote,
      searchNotes,
      clearSearch,
      clearState,
      login, 
      SignUp
    }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
