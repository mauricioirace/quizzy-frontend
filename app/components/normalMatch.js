import React from 'react';

class NormalMatch extends React.PureComponent {
  render() {
    return (
      <div>
        Enter your nickname <br/>
        <input type='text' name='nickname' placeholder='eg: Pepe'/> <button>PLAY</button><br/>
        <table style="width:100%">
          <tr>
            <th>Position</th>
            <th>Nickname</th>
            <th>Score</th>
          </tr>
        </table>
      </div>
    )
  }
}

export default NormalMatch;
