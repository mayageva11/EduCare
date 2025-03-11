class ApiClient {
    /**
     * Base fetch method with authentication
     */
    async fetch(url: string, options: RequestInit = {}) {
      // Get token from localStorage
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      // Set default headers
      const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      } as Record<string, string>;
      
      // Add authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // Make the request
      const response = await fetch(url, {
        ...options,
        headers
      });
      
      // Handle unauthorized responses globally
      if (response.status === 401) {
        // Clear token and redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/';
        }
        return null;
      }
      
      return response;
    }
    
    /**
     * GET request
     */
    async get(url: string, options: RequestInit = {}) {
      return this.fetch(url, { ...options, method: 'GET' });
    }
    
    /**
     * POST request
     */
    async post(url: string, data: any, options: RequestInit = {}) {
      return this.fetch(url, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data)
      });
    }
    
    /**
     * PUT request
     */
    async put(url: string, data: any, options: RequestInit = {}) {
      return this.fetch(url, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data)
      });
    }
    
    /**
     * DELETE request
     */
    async delete(url: string, options: RequestInit = {}) {
      return this.fetch(url, { ...options, method: 'DELETE' });
    }
    
    /**
     * Helper to parse JSON response
     */
    async parseResponse(response: Response | null) {
      if (!response) return null;
      
      try {
        return await response.json();
      } catch (error) {
        console.error('Error parsing response:', error);
        return null;
      }
    }
  }
  
  export const apiClient = new ApiClient();