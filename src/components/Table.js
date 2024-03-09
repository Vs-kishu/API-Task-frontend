import React, { useState, useEffect } from 'react';

const TableComponent = () => {
    const [addCount,setAddCount]=useState(null)
    const [updateCount,setUpdateCount]=useState(null)
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({ name: '', age: '' });
  const[email,setEmail] = useState(null)


  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchData();
  }, []);

  const userId = localStorage.getItem('user');
  console.log(userId);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/data/${userId}`);
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData.allData.table);
      setAddCount(jsonData.allData.addCount);
      setUpdateCount(jsonData.allData.updateCount);
      setEmail(jsonData.allData.email);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const handleAdd = async () => {
    try {
      await fetch(`http://localhost:3001/api/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, data: editedData }),
      });

      fetchData();
      setEditedData({name:'',age:""}) // Refresh the data after adding
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);

    // Find the data to be edited
    const dataToEdit = data.find((item) => item._id === id);

    // Set the edited data
    setEditedData({
      name: dataToEdit.name,
      age: dataToEdit.age,
    });
  };

  const handleSave = async (id) => {
    console.log(id);
    try {
      await fetch(`http://localhost:3001/api/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, data: editedData }),
      });

      setEditingId(null);
      fetchData(); // Refresh the data after editing
      setEditedData({name:'',age:""})
    } catch (error) {
      console.error('Error editing data:', error);
    }
  };

  return (
    <div>
    <div>emai: - {email}</div>
    <div>add Count: -{addCount}</div>
    <div>update Count: -{updateCount}</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item._id}>
              <td>
                {editingId === item._id ? (
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editingId === item._id ? (
                  <input
                    type="text"
                    value={editedData.age}
                    onChange={(e) => setEditedData({ ...editedData, age: e.target.value })}
                  />
                ) : (
                  item.age
                )}
              </td>
              <td>
                {editingId === item._id ? (
                  <button onClick={() => handleSave(item._id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(item._id)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={editedData.name}
          onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Age"
          value={editedData.age}
          onChange={(e) => setEditedData({ ...editedData, age: e.target.value })}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};

export default TableComponent;
