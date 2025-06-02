import PageContext from './PageContext';
import { useState } from 'react';
import axios from 'axios';

const PageState = (props) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = "https://notebookbackend.glitch.me";
  // const url = "http://localhost:4000";

  // Clear state when switching accounts
  const clearState = () => {
    setPages([]);
    setCurrentPage(null);
  };

  // Get all pages
  const getPages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/getPages`, { 
        headers: { 'x-api-key': localStorage.getItem('x-api-key') } 
      });
      setPages(response.data.message || []);
      
      // Set current page to first page if no current page is selected
      if (response.data.message && response.data.message.length > 0 && !currentPage) {
        setCurrentPage(response.data.message[0]);
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new page
  const createPage = async (title, showAlert) => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/createPage`, 
        { title }, 
        { headers: { 'x-api-key': localStorage.getItem('x-api-key') } }
      );
      
      if (response.data.status) {
        await getPages();
        showAlert("Page created successfully!", "success");
      }
    } catch (error) {
      if (error.response && !error.response.data.status) {
        showAlert(`${error.response.data.message}`, "danger");
      } else {
        console.error("Error creating page:", error);
        showAlert("Failed to create page", "danger");
      }
    } finally {
      setLoading(false);
    }
  };

  // Update a page
  const updatePage = async (id, title, showAlert) => {
    setLoading(true);
    try {
      const response = await axios.put(`${url}/updatePage/${id}`, 
        { title }, 
        { headers: { 'x-api-key': localStorage.getItem('x-api-key') } }
      );
      
      if (response.data.status) {
        await getPages();
        showAlert("Page updated successfully!", "success");
      }
    } catch (error) {
      if (error.response && !error.response.data.status) {
        showAlert(`${error.response.data.message}`, "danger");
      } else {
        console.error("Error updating page:", error);
        showAlert("Failed to update page", "danger");
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete a page
  const deletePage = async (id, showAlert) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${url}/deletePage/${id}`, 
        { headers: { 'x-api-key': localStorage.getItem('x-api-key') } }
      );
      
      if (response.data.status) {
        // Remove page from state
        const newPages = pages.filter(page => page._id !== id);
        setPages(newPages);
        
        // If current page is deleted, set current page to first page
        if (currentPage && currentPage._id === id) {
          setCurrentPage(newPages.length > 0 ? newPages[0] : null);
        }
        
        showAlert("Page deleted successfully!", "warning");
      }
    } catch (error) {
      if (error.response && !error.response.data.status) {
        showAlert(`${error.response.data.message}`, "danger");
      } else {
        console.error("Error deleting page:", error);
        showAlert("Failed to delete page", "danger");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContext.Provider value={{ 
      pages, 
      currentPage, 
      setCurrentPage, 
      getPages, 
      createPage, 
      updatePage, 
      deletePage,
      clearState,
      loading 
    }}>
      {props.children}
    </PageContext.Provider>
  );
};

export default PageState; 