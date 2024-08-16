# MERN Stack Functionality: SortMaster-Server

This repository contains the server-side code for a MERN stack project that provides API endpoints for managing products, user authentication, and other functionalities. The server is built using Node.js, Express.js, and MongoDB.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/arafat20mupi/SortMaster-Server.git
   ```

2. Navigate to the project directory:

   ```bash
   cd SortMaster-Server
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root of the project and add the following:

```plaintext
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

Ensure you replace the placeholders (`<your_mongodb_connection_string>`, etc.) with your actual MongoDB URI and JWT secret.

## Running the Project

To start the server, run:

```bash
node index.js
```

The server will be available at [http://localhost:5000](http://localhost:5000).

## Project Structure

- **`index.js`**: All Poiens and Routes of the application

## API Endpoints



### Products

- **GET `/users`**
  - Retrieves a list of products with optional filtering, sorting, and pagination.
  - **Query Parameters:**
    - `search` (string): Search term for product name.
    - `category` (string): Filter by category.
    - `price` (string): Filter by price range (e.g., `0-100`).
    - `sort` (string): Sort by `price_asc`, `price_desc`, `date_asc`, or `date_desc`.
    - `page` (number): Page number for pagination.
    - `limit` (number): Number of products per page.
  - **Response:**
    ```json
    {
      "products": [...],
      "totalPages": 5,
      "currentPage": 1
    }
    ```

- **POST `/products`**
  - Creates a new product.
  - **Request Body:**
    ```json
    {
      "name": "Product Name",
      "description": "Product Description",
      "price": 100,
      "category": "Category Name",
      "image": "image_url",
      "rating": 4.5
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Product created successfully",
      "product": {...}
    }
    ```

- **PUT `/api/products/:id`**
  - Updates a product by ID.
  - **Request Body:** (Only include fields you want to update)
    ```json
    {
      "name": "Updated Product Name",
      "price": 120
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Product updated successfully",
      "product": {...}
    }
    ```

- **DELETE `/api/products/:id`**
  - Deletes a product by ID.
  - **Response:**
    ```json
    {
      "message": "Product deleted successfully"
    }
    ```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

This README provides a comprehensive overview of the backend application, including setup instructions, project structure, and API documentation. Adjust and expand it as necessary to suit your specific project details.
