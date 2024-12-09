// import React, { useState, useEffect } from "react";
// import { auth, db } from "./firebase";
// import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import Auth from "./components/Auth";
// import BillDetails from "./components/BillDetails";
// import ItemList from "./components/ItemList";
// import TotalAmount from "./components/TotalAmount";
// import Invoices from "./components/Invoices";
// import "./App.css";

// function App() {
// 	  const [items, setItems] = useState([]);
// 	  const [user, setUser] = useState(null);
// 	  const [invoices, setInvoices] = useState([]);

// 	  useEffect(() => {
// 		      onAuthStateChanged(auth, (currentUser) => {
// 			            setUser(currentUser);
// 			          });
// 		    }, []);

// 	  const handleAddItem = (item) => {
// 		      setItems((prevItems) => [...prevItems, item]);
// 		    };

// 	  const handleDeleteItem = (index) => setItems(items.filter((_, i) => i !== index));

// 	  const calculateTotal = () => items.reduce((total, item) => total + item.quantity * item.price, 0);

// 	  const handleSaveInvoice = async () => {
// 		      if (user) {
// 			            const invoice = { userId: user.uid, items, total: calculateTotal(), date: new Date().toISOString() };
// 			            try {
// 					            await addDoc(collection(db, "invoices"), invoice);
// 					            setItems([]);
// 					            fetchInvoices();
// 					          } catch (err) {
// 							          console.error("Error saving invoice:", err);
// 							        }
// 			          }
// 		    };

// 			const fetchInvoices = async () => {
// 				if (user) {
// 					try {
// 						const querySnapshot = await getDocs(
// 							query(collection(db, "invoices"), where("userId", "==", user.uid)) // Ensure this filters invoices by the logged-in user's UID
// 						);
// 						const fetchedInvoices = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// 						setInvoices(fetchedInvoices);  // Set the invoices only for the logged-in user
// 					} catch (err) {
// 						console.error("Error fetching invoices:", err);
// 					}
// 				}
// 			};
			

// 	  return (
// 		      <div className="App">
// 		        {!user ? (
// 				        <Auth onAuth={() => setUser(auth.currentUser)} />
// 				      ) : (
// 					              <>
// 					                <button onClick={() => signOut(auth)}>Sign Out</button>
// 					                <BillDetails onAddItem={handleAddItem} />
// 					                <ItemList items={items} onDeleteItem={handleDeleteItem} />
// 					                <TotalAmount total={calculateTotal()} />
// 					                <button onClick={handleSaveInvoice}>Save Invoice</button>
// 					                <Invoices user={user} invoices={invoices} />
// 					              </>
// 					            )}
// 		      </div>
// 		    );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Auth from "./components/Auth";
import BillDetails from "./components/BillDetails";
import ItemList from "./components/ItemList";
import TotalAmount from "./components/TotalAmount";
import Invoices from "./components/Invoices";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);

  // Fetch invoices for the current user
  const fetchInvoices = async () => {
    if (user) {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "invoices"), where("userId", "==", user.uid)) // Ensure this filters invoices by the logged-in user's UID
        );
        const fetchedInvoices = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setInvoices(fetchedInvoices);  // Set the invoices only for the logged-in user
      } catch (err) {
        console.error("Error fetching invoices:", err);
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchInvoices(); // Fetch invoices when the user logs in
      } else {
        setInvoices([]); // Clear invoices when logged out
      }
    });
  }, []);

  const handleAddItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const handleDeleteItem = (index) => setItems(items.filter((_, i) => i !== index));

  const calculateTotal = () => items.reduce((total, item) => total + item.quantity * item.price, 0);

  const handleSaveInvoice = async () => {
    if (user) {
      const invoice = { userId: user.uid, items, total: calculateTotal(), date: new Date().toISOString() };
      try {
        await addDoc(collection(db, "invoices"), invoice);
        setItems([]);
        fetchInvoices(); // Refresh the invoices after saving
      } catch (err) {
        console.error("Error saving invoice:", err);
      }
    }
  };

  // Sign out and clear invoices
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);  // Clear user state
      setInvoices([]);  // Clear invoices on sign out
    }).catch((err) => {
      console.error("Error signing out:", err);
    });
  };

  return (
    <div className="App">
      {!user ? (
        <Auth onAuth={() => setUser(auth.currentUser)} />
      ) : (
        <>
          <button onClick={handleSignOut}>Sign Out</button>
          <BillDetails onAddItem={handleAddItem} />
          <ItemList items={items} onDeleteItem={handleDeleteItem} />
          <TotalAmount total={calculateTotal()} />
          <button onClick={handleSaveInvoice}>Save Invoice</button>
          <Invoices user={user} invoices={invoices} />
        </>
      )}
    </div>
  );
}

export default App;
