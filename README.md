# NEWS APP


NewsApp allows users to view news data based on their assigned roles. The application distinguishes between "admin" and "guest" roles, with different permissions for viewing news.


## Overview

The News App is a web application built using React and Node.js technologies. It allows users to search and view news articles based on their interests. Users can select between different roles (admin or guest) to access the application, with role-based permissions enforced to control data access. The frontend provides an intuitive interface where users can input a search query for news articles. The backend interacts with the NewsAPI to fetch and display relevant news articles based on user queries. Error handling and permission management are integrated to ensure a smooth user experience. Overall, the News App provides a streamlined way for users to stay informed with the latest news tailored to their preferences.

## Explanation

[![Watch the video](https://img.youtube.com/vi/gzvuEY4h-0c/maxresdefault.jpg)](https://youtu.be/gzvuEY4h-0c) 
## Features

- **Role Selection**: Users can choose between "admin" and "guest" roles using a dropdown menu.
- **Permission Enforcement**: The application enforces permissions when fetching news. Admins have full access, while guests have restricted access.
- **Error Handling**: Basic error handling ensures users are notified when permissions are denied or when weather data retrieval fails.
- **Integration with Express Server**: The backend server (`opal-server.js`) evaluates permissions based on role and action (`search-news`).

## Setup
NewsApp
NewsApp is a web application showcasing role-based access control (RBAC) with an Express server for managing permissions.

### Clone the repository
```bash
git clone https://github.com/aditi-sharma-2004/NewsApp_React.git
cd NewsApp/
```
### Install dependencies
```bash
npm install
```
### Running the Application

#### Start the server
```bash
node opal-server.js
```
The server will start at http://localhost:3000.

#### Start the frontend
```bash
npm start
```
The React development server will open the NewsApp in your default web browser.


## Usage

- Select a role ("admin" or "guest") from the dropdown.
- Click the "Search News" button to fetch news.
- Depending on your role, you will either see news or a message indicating access is denied.

## Technologies Used

- React
- Express
- JavaScript
- React
- Opal
- Permit.io

## Future Enhancements

- **Advanced Policy Management**: Consider integrating OPAL for more robust policy definition and management.
- **UI/UX Improvements**: Enhance the user interface with better error handling and visual feedback.
- **Testing**: Implement unit tests to ensure functionality and permission enforcement.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by challenges in learning role-based access control and API integration.
