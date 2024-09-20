# Shopping List App

A simple shopping list application built with React, applying fundamental concepts such as component-oriented design, parameterization, and state management.

## Features

- **Add Items**: Users can input an item and add it to the shopping list with a simple form and button. The input is cleared after each addition to streamline further item entries.
  
- **Validation**: Items cannot be added if the input field is empty, ensuring valid entries.

- **View Shopping List**: Display a list of all the items added by the user.

- **Remove Items**: Users can delete items from the shopping list with a simple click.

- **Edit Items**: Items in the list can be edited, allowing users to modify the name or quantity of the item.

- **Quantity Input**: For each item, users can specify a quantity. It validates that the quantity is positive and greater than zero.

- **Mark as Purchased**: Items can be marked as "purchased," at which point they will appear crossed out and move to the end of the list.

- **Unmark Purchased Items**: Users can also unmark purchased items, moving them back to the list of unpurchased items in the last available spot.

- **Multiple Lists**: The app supports multiple shopping lists, with tabs to switch between them. Each list can be assigned a different color.

## Technologies Used

- **React**: For building the user interface and managing component states.
- **Material-UI**: For styling the components and ensuring a responsive design.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/shopping-list-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd shopping-list-app
   ```

3. Install the dependencies:

   ```bash
    npm install
    ```

4. Run the application:

   ```bash
   npm start
   ```

## Usage

- Open the app in your browser and start adding items to your shopping list.
- Manage your lists by adding, editing, deleting, and marking items as purchased or unpurchased.
- Switch between different shopping lists using the tabbed interface, and customize each list with a unique color.

## Live Demo

Try the application live at [Live Demo Link](https://fabriquinteros.github.io/todo-app)