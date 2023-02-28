import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";

const firstFiveContacts = contacts.slice(0, 5);

function App() {
  const [actualContacts, setContacts] = useState(firstFiveContacts);

  const addRandomContacts = () => {
    if (actualContacts.length === contacts.length) {
      return;
    }
    const randomNumber = Math.floor(Math.random() * contacts.length);
    const randomContact = contacts[randomNumber];
    const contactsCopy = [...actualContacts];

    let newContactId = randomContact.id;
    let isContactRepeated = false;
    actualContacts.forEach((eachContact) => {
      if (newContactId === eachContact.id) {
        isContactRepeated = true;
      }
    });
    if (isContactRepeated === true) {
      addRandomContacts();
      return;
    }

    contactsCopy.unshift(randomContact);
    setContacts(contactsCopy);
  };

  const sortByName = () => {
    const contactsCopy = [...actualContacts];
    contactsCopy.sort((elem2, elem1) => {
      if (elem2.name[0] > elem1.name[0]) {
        return 1;
      } else if (elem2.name[0] < elem1.name[0]) {
        return -1;
      } else {
        return 0;
      }
    });
    setContacts(contactsCopy);
  };

  const sortByPopularity = () => {
    const contactsCopy = [...actualContacts];
    contactsCopy.sort((elem2, elem1) => {
      if (elem2.popularity < elem1.popularity) {
        return 1;
      } else if (elem2.popularity > elem1.popularity) {
        return -1;
      } else {
        return 0;
      }
    });
    setContacts(contactsCopy);
  };

  const deleteContact = (deleteId) => {
    const filterito = actualContacts.filter((eachConact) => {
      if (eachConact.id === deleteId) {
        return false;
      } else {
        return true;
      }
    });
    setContacts(filterito);
  };
  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button className="beautiful-button" onClick={addRandomContacts}>
        Add New Random Contacts
      </button>
      <button className="beautiful-button" onClick={sortByName}>
        Sort by Name
      </button>
      <button className="beautiful-button" onClick={sortByPopularity}>
        Sort by Popularity
      </button>

      <table id="tableContainer">
        <thead>
          <tr className="trContainer">
            <th>Picture</th>
            <th className="nameContainer">Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {actualContacts.map((eachContact) => {
            return (
              <tr className="trContainer" key={eachContact.id}>
                <td>
                  <img
                    src={eachContact.pictureUrl}
                    alt="famous"
                    width="100px"
                  />
                </td>
                <td>{eachContact.name}</td>
                <td>{eachContact.popularity}</td>
                <td>{eachContact.wonOscar === true ? "🏆" : null}</td>
                <td>{eachContact.wonEmmy === true ? "🏆" : null}</td>
                <td>
                  <button
                    className="beautiful-button"
                    onClick={() => deleteContact(eachContact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
