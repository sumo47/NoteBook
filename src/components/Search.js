import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'
import ThemeContext from '../context/ThemeContext'
import Noteitem from './Noteitem'
import Loading from './Loading'

function Search(props) {
  const { showAlert } = props
  const { searchNotes, searchResults, isSearching, loading, clearSearch } = useContext(NoteContext)
  const { theme } = useContext(ThemeContext)
  const [searchQuery, setSearchQuery] = useState("")

  // Theme-specific styles
  const emptyStateTextClass = theme === 'dark' ? 'text-light opacity-75' : 'text-muted'

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim().length > 0) {
      searchNotes(searchQuery)
    }
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">Search Notes</h2>
      
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search notes by title, description or tag..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            className="btn btn-primary" 
            type="submit"
          >
            <i className="fas fa-search me-1"></i> Search
          </button>
          {isSearching && (
            <button 
              className="btn btn-secondary" 
              type="button"
              onClick={() => {
                clearSearch()
                setSearchQuery("")
              }}
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <Loading />
      ) : (
        <>
          {isSearching && (
            <div className="mb-3">
              <h5>Search results for: "{searchQuery}"</h5>
              <p>{searchResults.length} {searchResults.length === 1 ? 'note' : 'notes'} found</p>
            </div>
          )}

          <div className="row">
            {isSearching && searchResults.length === 0 ? (
              <div className="col-12 text-center my-5">
                <i className={`fas fa-search fa-3x mb-3 ${emptyStateTextClass}`}></i>
                <h4 className={emptyStateTextClass}>No notes found</h4>
                <p className={emptyStateTextClass}>Try a different search term</p>
              </div>
            ) : (
              searchResults.map((note) => (
                <Noteitem 
                  key={note._id} 
                  note={note} 
                  showAlert={showAlert} 
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Search 