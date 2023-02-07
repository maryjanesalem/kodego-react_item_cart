import { useState } from 'react'
import './css/styles.scss'
import { FaTrashAlt } from 'react-icons/fa'
import { FaCaretLeft } from 'react-icons/fa'
import { FaCaretRight } from 'react-icons/fa'



function App() {
    const [items, setItems] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [input, setInput] = useState('');
    const [totalCount, setTotalCount] = useState(0)

    const AddBtn = () => {
        if (input == "") {
            setShowAlert(true);
        } else {
            const newList = {
                id: Math.floor(Math.random() * 1000),
                itemName: input,
                quantity: 1,
                isSelected: false,
            }
            const newLists = [...items, newList];

            setItems(newLists)
            setInput('');
            setTotalCount(totalCount + 1);
        }
    }

    const closeAlert = () => {
        setShowAlert(false);
    }

    const crossoutText = (index) => {
        const newLists = [...items];
        newLists[index].isSelected = !newLists[index].isSelected
        setItems(newLists)
    }

    const increment = (index) => {
        const newLists = [...items];
        newLists[index].quantity++;
        setItems(newLists)
        compute()
    }

    const decrement = (index) => {
        const newLists = [...items];

        newLists[index].quantity--;

        setItems(newLists)
        compute()
    }


    const deleteItem = (index) => {
        const newLists = [...items];
        const deletedItem = newLists.splice(index,1)[0];
        setItems(newLists);
        setTotalCount((prevCount) => prevCount - deletedItem.quantity);
      };

    const compute = () => {
        let total

        total = items.reduce((total, item) => {
            return total + item.quantity
        }, 0);

        setTotalCount(total);
    }


    return (
        <div className="App">

            {showAlert && (
                <div className="alert alert-dismissible alert-primary">
                    <button onClick={() => closeAlert()} type="button" className="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Oh snap!</strong> Write something and try adding again.
                </div>
            )}

            <main>
                <div className="card text-white bg-secondary mb-3" >
                    <div className="card-body">
                        <div className='d-flex'>
                            <img src='../public/cart.png' className='image'></img>
                            <h2 className="card-title my-2">Cart List</h2>
                        </div>

                        <div className="card-text pt-2">

                            <div className="form-group d-flex mb-3">
                                <input value={input} onChange={(e) => setInput(e.target.value)} className="form-control" type="text" placeholder="Write your list here" />
                                <button onClick={() => AddBtn()} type="button" className="btn btn-primary d-inline">Add</button>

                            </div>

                            {items.map((item, index) => (
                                <div className='d-flex lists'>
                                    <div className='d-flex'>
                                        <input onClick={() => crossoutText(index)} className="form-check-input checkbox" type="checkbox" />
                                        {item.isSelected ? (
                                            <>
                                                <p className='check-true'>{item.itemName}</p>
                                            </>
                                        ) : (
                                            <>
                                                <p>{item.itemName}</p>
                                            </>
                                        )}
                                    </div>

                                    <div className='d-flex'>
                                        <div className='quantity'>


                                            <button onClick={() => decrement(index)} type="button" className="btn btn-primary"> <FaCaretLeft /> </button>

                                            <span className='mx-1'>{item.quantity}</span>

                                            <button onClick={() => increment(index)} type="button" className="btn btn-primary"> <FaCaretRight /> </button>

                                        </div>
                                        <div className='trash'>
                                            <button onClick={() => deleteItem(index)} type="button" className="btn btn-secondary"><FaTrashAlt /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <hr className='my-2' />

                            <div className='d-flex justify-content-end'>
                                <h6>Total</h6>
                                <h6 className='total-display'>{totalCount}</h6>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default App
