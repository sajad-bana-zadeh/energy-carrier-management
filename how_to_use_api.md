## ▶️ How to Use the API

1.  **Run the application:**
    `npm run start:dev`

2.  **Register a User** (e.g., an admin)

      * **POST** `http://localhost:3000/auth/register`
      * Body:
        ```json
        {
          "username": "admin_user",
          "password": "strongPassword123",
          "roles": ["admin"]
        }
        ```
      * You will receive an `access_token`. Copy it.

3.  **Login**

      * **POST** `http://localhost:3000/auth/login`
      * Body:
        ```json
        {
          "username": "admin_user",
          "password": "strongPassword123"
        }
        ```
      * This will also provide an `access_token`.

4.  **Call Protected CSV Endpoints**

      * In your API client (like Postman or Insomnia), set the Authorization header for your requests:

      * **Type**: Bearer Token

      * **Token**: Paste the `access_token` you received.

      * **Get Last Row:**

          * **GET** `http://localhost:3000/csv/last-row/electricity`

      * **Get Specific Columns:**

          * **POST** `http://localhost:3000/csv/columns`
          * Body:
            ```json
            {
              "fileName": "water",
              "columns": ["record_date", "total_usage"]
            }
            ```

      * **Filter Rows (Admin only):**

          * **POST** `http://localhost:3000/csv/filter-rows`
          * Body:
            ```json
            {
              "fileName": "gas",
              "column": "energy_kwh",
              "value": 30
            }
            ```
          * This will return rows from `gas.csv` where the `energy_kwh` is greater than 30.