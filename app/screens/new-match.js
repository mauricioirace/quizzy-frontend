import React from 'react';

class NewMatch extends React.PureComponent {
  render() {
    return (
      <div>
        <h2> MAKE UP YOUR OWN GAME </h2>
        Name <input type='text' name='name' placeholder='eg: Tennis Champions'/>
        Image <button>Load</button><br/>
        Category <select>
                   <option value="sport">Sport</option>
                   <option value="tv">Television</option>
                   <option value="videogames">Videogames</option>
                 </select>
                 <br/>
        Questions <br/>
        <input type='text' name='name' placeholder='Question 1'/><button>Answers</button> <br/>
        <input type='text' name='name' placeholder='Question 2'/><button>Answers</button> <br/>
        <input type='text' name='name' placeholder='Question 3'/><button>Answers</button> <br/>
        <a>Add...</a> <br/>
        <button>Done</button>  <button>Cancel</button> <br/>
      </div>
    )
  }
}

export default NewMatch;
