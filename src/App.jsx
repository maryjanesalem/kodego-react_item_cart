import { useState } from 'react'
import './css/styles.scss'
import { FaTrashAlt } from 'react-icons/fa'
import { FaCaretLeft } from 'react-icons/fa'
import { FaCaretRight } from 'react-icons/fa'


function App() {
    const [items, setItems] = useState([]);

    const [input, setInput] = useState('');
    const [totalCount, setTotalCount] = useState(0)

    const AddBtn = () => {
        if (input == "") {
            return
        } else {
            const newList = {
                itemName: input,
                quantity: 1,
                isSelected: false
            }
            const newLists = [...items, newList];
    
            setItems(newLists)
            setInput('');
        }
    }

    const crossoutText = (index) => {
        const newLists = [...items];
        newLists[index].isSelected = !newLists[index].isSelected
        setItems(newLists)
    }

    const increment = (index) => {
        const newLists = [...items];
        newLists[index].quantity += 1;
        setItems(newLists)
        compute()
    }

    const decrement = (index) => {
        const newLists = [...items];
        newLists[index].quantity -= 1;
        setItems(newLists)
        compute()
    }

    const compute = () => {
        const totalCount = items.reduce((total, item) => {
            return total + item.quantity
        }, 0);

        setTotalCount(totalCount);
    }


    // const deleteItem = (item, index) => {
    //     const newLists = [...items];
        
    //     newLists[index] = items.filter(index => item.index !== index) 
    //     // const newTodoList = todos.filter(todo => todo.id !== id)
    //     setItems(newLists)
    // }


    return (
        <div className="App">

            <main>
                <div className="card text-white bg-secondary mb-3" >
                    <div className="card-body">
                        <h1 className="card-title my-2">Cart List</h1>
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
                                        {/* <div className='trash'>
                                            <button onClick={()=> deleteItem(item, index)} type="button" className="btn btn-secondary"><FaTrashAlt /></button>
                                        </div> */}
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
