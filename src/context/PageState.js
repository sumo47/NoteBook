import PageContext from './PageContext';
import { useState } from 'react';
import axios from 'axios';

const PageState = (props) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = "https://notebookbackend.glitch.me";
  // const url = "http://localhost:4000";

  // Custom setCurrentPage function that also updates localStorage
  const updateCurrentPage = (page) => {
    if (page) {
      localStorage.setItem('currentPageId', page._id);
      localStorage.setItem('currentPageTitle', page.title);
    }
    setCurrentPage(page);
  };

  // Clear state when switching accounts
  const clearState = () => {
    setPages([]);
    setCurrentPage(null);
    localStorage.removeItem('currentPageId');
    localStorage.removeItem('currentPageTitle');
  };

  // Get all pages
  const getPages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/getPages`, { 
        headers: { 'x-api-key': localStorage.getItem('x-api-key') } 
      });
      
      const fetchedPages = response.data.message || [];
      setPages(fetchedPages);
      
      if (fetchedPages.length > 0) {
        // Try to restore the previously selected page from localStorage
        const savedPageId = localStorage.getItem('currentPageId');
        
        if (savedPageId) {
          // Find the saved page in the fetched pages
          const savedPage = fetchedPages.find(page => page._id === savedPageId);
          
          if (savedPage) {
            // If the saved page exists in the fetched pages, set it as current
            setCurrentPage(savedPage);
            console.log("Restored saved page:", savedPage.title);
          } else {
            // If the saved page doesn't exist anymore, use the first page
            setCurrentPage(fetchedPages[0]);
            localStorage.setItem('currentPageId', fetchedPages[0]._id);
            localStorage.setItem('currentPageTitle', fetchedPages[0].title);
            console.log("Saved page not found, using first page");
          }
        } else if (!currentPage) {
          // If no saved page and no current page, use the first page
          setCurrentPage(fetchedPages[0]);
          localStorage.setItem('currentPageId', fetchedPages[0]._id);
          localStorage.setItem('currentPageTitle', fetchedPages[0].title);
          console.log("No saved page, using first page");
        }
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
        // If we're updating the current page, update localStorage too
        if (currentPage && currentPage._id === id) {
          localStorage.setItem('currentPageTitle', title);
        }
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
          if (newPages.length > 0) {
            setCurrentPage(newPages[0]);
            localStorage.setItem('currentPageId', newPages[0]._id);
            localStorage.setItem('currentPageTitle', newPages[0].title);
          } else {
            setCurrentPage(null);
            localStorage.removeItem('currentPageId');
            localStorage.removeItem('currentPageTitle');
          }
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
      setCurrentPage: updateCurrentPage, 
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