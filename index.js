import React from "react";
import { render } from 'react-dom';
import './style.css';

function CheckboxList({ items, handleChange }) { 
    return (   
    <div>
      {items.map((item) => {
        return (
          <label key={item.id} htmlFor={item.id}>
            <input onChange={handleChange}
            id={item.id}
            type="checkbox"
            checked={item.checked ? true : false }
            />
            {item.name}          
          </label>
        )
      })
      }    
    </div>    
  );
} 

class TransferList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, name: "Item 1", currentState: "source" },
        { id: 2, name: "Item 2", currentState: "source" },
        { id: 3, name: "Item 3", currentState: "source" },
        { id: 4, name: "Item 4", currentState: "target" },
        { id: 5, name: "Item 5", currentState: "source" },
        { id: 6, name: "Item 6", currentState: "source" },
        { id: 7, name: "Item 7", currentState: "target" },
        { id: 8, name: "Item 8", currentState: "target" },
        { id: 9, name: "Item 9", currentState: "target" },
        { id: 10, name: "Item 10", currentState: "target" }
      ]
    };
  }

  handleChange = (e) => {
    const { id, checked } = e.target;
    this.setState(prevState => {
      return {
        items: prevState.items.map( item =>
          item.id == id ? { ...item, checked: checked ? true : false } : item )
      };
    });
  };

  handleMoveToTarget = () => {
      this.setState(prevState => {
          return {
              items: prevState.items.map( item=> item.checked==true && item.currentState=="source"?({...item, currentState: "target", checked: false}):item ),
              checkedSelectAllSourceItems: false
          }
      })
  }

  handleMoveToSource = () => {
      this.setState(prevState=> {
          return {
              items: prevState.items.map( item=> item.checked==true && item.currentState=="target"?({...item, currentState: "source", checked: false}):item ),
              checkedSelectAllTargetItems: false
          }
      })
  }

  selectAllSourceItems = (e) => {
    const {checked} = e.target
    this.setState(prevState=>{
      return {
        items: prevState.items.map(item=>checked &&item.currentState=="source"?({...item,checked: true}):(item.currentState=="source"?{...item, checked: false}:item)),
        checkedSelectAllSourceItems: checked
      }
    })
   
  }

  selectAllTargetItems = (e) => {
    const {checked} = e.target
    this.setState(prevState=>{
      return {
        items: prevState.items.map(item=>checked &&item.currentState=="target"?({...item,checked: true}):(item.currentState=="target"?{...item, checked: false}:item)),
        checkedSelectAllTargetItems: checked
      }
    })
    
  }

  render() {
    const { items, checkedSelectAllSourceItems, checkedSelectAllTargetItems } = this.state;
    
    const anySourceSelected = items.some(
      (item) => item.currentState == "source" && item.checked == true
    );
    const anyTargetSelected = items.some(
      (item) => item.currentState == "target" && item.checked == true
    );

    const selectedSourceItems = items.filter(
      (item) => item.currentState == "source" && item.checked == true
    );

    const selectedTargetItems = items.filter(
      (item) => item.currentState == "target" && item.checked == true
    );

    const sourceItems = items.filter((item) => item.currentState == "source")

    const targetItems = items.filter(item => item.currentState == "target") 

    return (     
      <section className="transfer-demo"> 
        <h2> Transfer List </h2>
        <div className="transfer-container">
          <div className="source-list">
            <div className="transfer-header">
              <p><input type="checkbox" onClick={this.selectAllSourceItems} checked={checkedSelectAllSourceItems?true:false}/></p>
              <p> {selectedSourceItems.length} / {sourceItems.length} Items</p>
              <p>Source</p>            
            </div>                
            <CheckboxList
              items={sourceItems}
              handleChange={this.handleChange}
              >
            </CheckboxList>
          </div>
          
          <div className="transfer-arrows">
            <button onClick={this.handleMoveToTarget} disabled={!anySourceSelected}> &gt; </button>
            <button onClick={this.handleMoveToSource} disabled={!anyTargetSelected}> &lt; </button>
          </div>
          
          <div className="target-list">
            <div className="transfer-header">
              <p><input type="checkbox" onClick={this.selectAllTargetItems} checked={checkedSelectAllTargetItems?true:false}/></p>
              <p>{selectedTargetItems.length} / {targetItems.length} Items</p>
              <p>Target</p>             
            </div>                   
            <CheckboxList
              items={targetItems}      
              handleChange={this.handleChange}
              >
            </CheckboxList>
          </div>          
        </div>
        <div>
        <h3>Features of this App:</h3>
        <p>
          1-User can select one item / more than one item / all items after selecting one by one from left(Source-box)  and transfer the selected item / items to the the right(Target-box) by clicking on left-arrow.
        </p>
        <p>
          2-User can select one item / more than one item / all items after selecting one by one from right(Target-box) and transfer the selected item / items from right(Target-box) to left(Source-box) by clicking on right-arrow.
        </p>
        <p>
          3-User can select all items in one shot by checking top-left checkbox avaialable for both(Source & Target) and transfer all the selected items from left to right and back to left with the help of left-arrow click or right-arrow click respectivly.
        </p>
        <p>
        4-User can see the total no.of items availabe in the box before any selection and no.of items selected from the total no.of items available in the list box after selection.It is visible only after  item is selected.
        </p>
        <p>
        5-Both control arrows are disabled at the beginning when nothing is selected. It becomes active once item is selected and indicates the direction of movement of item.
        </p>
        </div>
      </section>      
    );
  }
}

render(
  <TransferList />,
  document.getElementById('root')
);